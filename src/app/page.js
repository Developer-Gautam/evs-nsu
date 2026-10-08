"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "../components/LandingPage";

export default function Home() {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedSession = localStorage.getItem("statpro_user");
    if (savedSession) {
      setIsLoggedIn(true);
    }
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return <div className="min-h-screen bg-[#000000]"></div>;
  }

  return (
    <LandingPage 
      isLoggedIn={isLoggedIn}
      onActionClick={() => {
        if (isLoggedIn) {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      }} 
    />
  );
}
