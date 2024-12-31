"use client";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { BASE_API_URL } from "@/config/env";
import { POSCartProvider } from "@/contexts/POSContext";
import { POSDetailProvider } from "@/contexts/POSDetailContext";
import { InvoiceProvider } from "@/contexts/POSInvoiceContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = !!token;
      if (isAuthenticated) {
        const url = `${BASE_API_URL}/user`;
        try {
          const response = await fetch(url, {
            method: "GET", // Correct HTTP method
            headers: {
              Authorization: `Bearer ${token}`, // Proper Authorization header
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.statusText}`);
          }
          const result = await response.json();
          if (result.isSuccess) {
            setLoading(false);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
          }
        } catch (error) {
          // Handle error (e.g., network issues or server errors)
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    };

    checkAuthentication();
  }, [token, router]);

  if (loading) {
    return <MyLoadingAnimation />; // Show loading state while checking authentication
  }

  return (
    <POSCartProvider>
      <POSDetailProvider>
        <InvoiceProvider>{children}</InvoiceProvider>
      </POSDetailProvider>
    </POSCartProvider>
  );
};

export default AdminLayout;
