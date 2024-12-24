"use client";
import { POSCartProvider } from "@/contexts/POSContext";
import { POSDetailProvider } from "@/contexts/POSDetailContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  return (
    <div>
      <POSCartProvider>
        <POSDetailProvider>{children}</POSDetailProvider>
      </POSCartProvider>
    </div>
  );
};

export default AdminLayout;
