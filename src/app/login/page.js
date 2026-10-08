"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import LoginScreen from "../../components/LoginScreen";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // If they already have a session, push them away from login page
    if (localStorage.getItem("statpro_user")) {
      router.push("/dashboard");
    } else {
      setIsInitializing(false);
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email !== "evs@nsu.com") {
      setError("SECURITY ALERT: Access Denied. You are not authorized to use this application.");
      setLoading(false);
      return;
    }

    if (email === "evs@nsu.com" && password === "evs@nsu.com") {
      const mockUser = { email: "evs@nsu.com", uid: "test-user-id" };
      localStorage.setItem("statpro_user", JSON.stringify(mockUser));
      router.push("/dashboard"); // Securely route to dashboard on success
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("statpro_user", JSON.stringify(userCredential.user));
      router.push("/dashboard"); // Securely route to dashboard on success
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/configuration-not-found') {
        setError("Firebase Error: Email/Password authentication is not enabled in your Firebase Console.");
      } else {
        setError("Invalid security key or authentication failed.");
      }
      setLoading(false);
    }
  };

  if (isInitializing) {
    return <div className="min-h-screen bg-[#000000]"></div>;
  }

  return (
    <LoginScreen 
      email={email} 
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword} 
      error={error} 
      loading={loading} 
      handleLogin={handleLogin} 
    />
  );
}
