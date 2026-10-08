import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Line, Plane } from '@react-three/drei';
import * as THREE from 'three';

const RotatingKnot = () => {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.8, 0.5, 256, 32]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>
    </Float>
  );
};

export const InteractiveShape = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom={false} autoRotate={false} />
        <RotatingKnot />
      </Canvas>
    </div>
  );
};

const playLaserSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);
  } catch(e) {}
};

const playExplosionSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = audioCtx.sampleRate * 0.3; 
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.1));
    }
    
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.value = 1000;
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    
    noiseSource.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noiseSource.start();
  } catch(e) {}
};

const Explosion = ({ position }) => {
  const group = useRef();
  const particles = useRef(
    Array.from({ length: 15 }, () => ({
      velocity: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
      rotation: new THREE.Vector3(Math.random(), Math.random(), Math.random())
    }))
  );

  useFrame((state, delta) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        child.position.addScaledVector(particles.current[i].velocity, delta);
        child.rotation.x += particles.current[i].rotation.x * delta * 10;
        child.rotation.y += particles.current[i].rotation.y * delta * 10;
        child.scale.multiplyScalar(0.9);
      });
    }
  });

  return (
    <group ref={group} position={position}>
      {particles.current.map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color="#ff0066" />
        </mesh>
      ))}
    </group>
  );
};

const Asteroid = ({ id, startPos, speed, onHit, onMiss, isPlaying }) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  
  useFrame((state, delta) => {
    if (!mesh.current || isDestroyed) return;
    
    mesh.current.rotation.x += delta * 0.5;
    mesh.current.rotation.y += delta * 0.8;
    
    if (isPlaying) {
      mesh.current.position.z += speed * delta;
      
      // If the asteroid passes the camera (z > 10)
      if (mesh.current.position.z > 10) {
        setIsDestroyed(true);
        onMiss(id);
      }
    }
  });

  if (isDestroyed) return null;

  return (
    <mesh 
      ref={mesh} 
      position={startPos} 
      onPointerDown={(e) => {
        if (!isPlaying) return;
        e.stopPropagation();
        setIsDestroyed(true);
        onHit(id, e.point);
      }}
      onPointerOver={(e) => {
        if (!isPlaying) return;
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        if (!isPlaying) return;
        e.stopPropagation();
        setHover(false);
      }}
    >
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial 
        color={hovered ? "#ff0066" : "#0066ff"} 
        wireframe={!hovered} 
        emissive={hovered ? "#ff0066" : "#002266"}
        emissiveIntensity={hovered ? 2 : 0.5}
      />
    </mesh>
  );
};

export const SpaceGame = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [lasers, setLasers] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const MAX_MISSES = 5;

  const handleStart = () => {
    setScore(0);
    setMisses(0);
    setLasers([]);
    setExplosions([]);
    setAsteroids([]);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const spawnAsteroid = () => {
      setAsteroids(prev => [...prev, {
        id: Date.now() + Math.random(),
        // Tighter frustum bounds so they don't fly off-screen
        startPos: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, -40],
        speed: 6 + Math.random() * 6 // Slower, more realistic approach speed
      }]);
    };

    const interval = setInterval(spawnAsteroid, 1500); // Slower spawn rate
    return () => clearInterval(interval);
  }, [gameState]);

  const handleMiss = (id) => {
    setAsteroids(prev => prev.filter(a => a.id !== id));
    setMisses(m => {
      const newMisses = m + 1;
      if (newMisses >= MAX_MISSES) {
        setGameState('gameover');
      }
      return newMisses;
    });
  };

  const fireLaser = (targetPoint) => {
    playLaserSound();
    const laserId = Date.now();
    setLasers(prev => [...prev, { id: laserId, target: targetPoint }]);
    
    setTimeout(() => {
      setLasers(prev => prev.filter(l => l.id !== laserId));
    }, 100);
  };

  const handleHit = (id, point) => {
    if (gameState !== 'playing') return;
    
    fireLaser([point.x, point.y, point.z]);
    
    // Spawn explosion
    const explosionId = Date.now();
    setExplosions(prev => [...prev, { id: explosionId, position: [point.x, point.y, point.z] }]);
    setTimeout(() => setExplosions(prev => prev.filter(e => e.id !== explosionId)), 500);

    setTimeout(() => {
      playExplosionSound();
      setScore(s => s + 1);
    }, 100);
  };

  const handleBackgroundClick = (e) => {
    if (gameState !== 'playing') return;
    // User shot but missed an asteroid
    fireLaser([e.point.x, e.point.y, e.point.z]);
  };

  return (
    <div className={`w-full h-[600px] relative bg-[#050505] rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,102,255,0.2)] ${gameState === 'playing' ? 'cursor-crosshair' : ''}`}>
      
      {/* Game UI Overlay */}
      {gameState === 'playing' && (
        <>
          <div className="absolute top-8 left-8 z-10 flex flex-col pointer-events-none">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Score</span>
            <span className="font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#0066ff]">
              {score}
            </span>
          </div>

          <div className="absolute top-8 right-8 z-10 flex flex-col items-end pointer-events-none">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-2">Shield Status</span>
            <div className="flex gap-2">
              {[...Array(MAX_MISSES)].map((_, i) => (
                <div key={i} className={`w-8 h-3 rounded-full ${i < (MAX_MISSES - misses) ? 'bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]' : 'bg-slate-800'}`}></div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 z-10 flex gap-4 pointer-events-none">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-slate-400 text-xs font-bold tracking-wider uppercase">Live Fire Active</span>
            </div>
          </div>
        </>
      )}

      {/* Main Menu Overlay */}
      {gameState === 'idle' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center">
            <h3 className="text-6xl font-black text-white mb-2 tracking-tighter">ASTEROID<span className="text-[#00ffcc]">DEFENSE</span></h3>
            <p className="text-slate-400 mb-8 font-bold tracking-widest uppercase text-center max-w-md">Rotate the camera to look around. Once deployed, rotation locks. Do not let 5 targets breach the perimeter.</p>
            <button 
              onClick={handleStart}
              className="px-12 py-4 bg-[#00ffcc] text-black font-black text-xl rounded-full hover:scale-110 active:scale-95 transition-transform shadow-[0_0_30px_rgba(0,255,204,0.4)] cursor-pointer"
            >
              DEPLOY WEAPONS
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameState === 'gameover' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-900/80 backdrop-blur-md pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center">
            <h3 className="text-7xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">SHIELDS DEPLETED</h3>
            <p className="text-white text-2xl mb-8 font-bold tracking-widest uppercase">Final Score: <span className="text-[#00ffcc] text-4xl">{score}</span></p>
            <button 
              onClick={handleStart}
              className="px-12 py-4 bg-white text-red-900 font-black text-xl rounded-full hover:scale-110 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer"
            >
              RESTART MISSION
            </button>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffcc" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#cc00ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Only enable camera controls before the game starts. During gameplay, it's a fixed shooter. */}
        <OrbitControls enableZoom={false} enabled={gameState === 'idle'} autoRotate={gameState === 'idle'} autoRotateSpeed={0.5} />
        
        {/* Invisible background plane to catch missed shots and draw the laser to the mouse */}
        {gameState === 'playing' && (
          <Plane args={[100, 100]} position={[0, 0, -20]} onPointerDown={handleBackgroundClick} visible={false} />
        )}

        {lasers.map(l => (
          <Line 
            key={l.id} 
            points={[[0, -4, 8], l.target]} 
            color="#ff0066" 
            lineWidth={6} 
            transparent
            opacity={0.8}
          />
        ))}

        {explosions.map(e => (
          <Explosion key={e.id} position={e.position} />
        ))}

        {asteroids.map(ast => (
          <Asteroid 
            key={ast.id} 
            id={ast.id}
            startPos={ast.startPos} 
            speed={ast.speed}
            onHit={handleHit} 
            onMiss={handleMiss}
            isPlaying={gameState === 'playing'}
          />
        ))}
        
        {/* Giant asteroid in the menu */}
        {gameState === 'idle' && (
          <mesh position={[0, 0, -5]}>
            <icosahedronGeometry args={[2.5, 1]} />
            <meshStandardMaterial color="#0066ff" wireframe />
          </mesh>
        )}
      </Canvas>
    </div>
  );
};
