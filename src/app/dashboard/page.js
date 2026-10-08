"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatProDashboard from "../../components/StatProDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const savedSession = localStorage.getItem("statpro_user");
    
    // SECURITY CHECK: If no session exists, instantly boot them to login
    if (!savedSession) {
      router.replace("/login");
      return;
    } 

    const parsedUser = JSON.parse(savedSession);
    
    // SECONDARY SECURITY CHECK: Verify the email matches the strict whitelist
    if (parsedUser.email !== "evs@nsu.com") {
        localStorage.removeItem("statpro_user");
        router.replace("/login");
        return;
    } 
    
    // Passed all checks, grant access
    setUser(parsedUser);
    setIsAuthorized(true);
    
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("statpro_user");
    router.replace("/"); // Send back to landing page securely
  };

  if (!isAuthorized || !user) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Verifying Security Clearance...</p>
        </div>
      </div>
    );
  }

  return <StatProDashboard user={user} handleLogout={handleLogout} />;
}
