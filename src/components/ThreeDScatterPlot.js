import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const DataPoints = ({ data, columns }) => {
  const mesh = useRef();
  
  if (data.length === 0 || columns.length < 3) return null;
  
  const getMinMax = (col) => {
    const vals = data.map(d => Number(d[col]) || 0);
    return { min: Math.min(...vals), max: Math.max(...vals) };
  };
  
  const xCol = columns[0], yCol = columns[1], zCol = columns[2];
  const { min: xMin, max: xMax } = getMinMax(xCol);
  const { min: yMin, max: yMax } = getMinMax(yCol);
  const { min: zMin, max: zMax } = getMinMax(zCol);
  
  const normalize = (val, min, max) => ((val - min) / (max - min || 1)) * 10 - 5;

  return (
    <group>
      {data.map((item, i) => {
        const x = normalize(Number(item[xCol]) || 0, xMin, xMax);
        const y = normalize(Number(item[yCol]) || 0, yMin, yMax);
        const z = normalize(Number(item[zCol]) || 0, zMin, zMax);
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color().setHSL(i / data.length, 1, 0.6)} emissive={new THREE.Color().setHSL(i / data.length, 1, 0.4)} emissiveIntensity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};

export const ThreeDDataUniverse = ({ dataset, columns }) => {
  const numCols = columns.filter(c => dataset.some(d => typeof d[c] === 'number'));
  
  if (numCols.length < 3) {
    return (
      <div className="glass-card p-6 rounded-2xl h-full flex flex-col items-center justify-center text-slate-500 bg-slate-800/80 border border-slate-700">
        <p className="font-bold text-center">Need at least 3 numeric columns for 3D Universe.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl h-full overflow-hidden relative border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-lg font-bold text-white mb-1 shadow-black drop-shadow-md">3D Data Universe</h3>
        <p className="text-xs text-slate-300 font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-md inline-block">
          X: {numCols[0]} | Y: {numCols[1]} | Z: {numCols[2]}
        </p>
      </div>
      <Canvas camera={{ position: [8, 8, 8] }} className="bg-[#050505]">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
        <DataPoints data={dataset} columns={numCols} />
        <gridHelper args={[10, 10, 0x444444, 0x222222]} />
      </Canvas>
    </div>
  );
};
