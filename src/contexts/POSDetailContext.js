"use client";

import { createContext, useContext, useState } from "react";

// Create the DetailContext
const DetailContext = createContext();

// Provider component for DetailContext
export function POSDetailProvider({ children }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Stores the selected customer
  const [orderNote, setOrderNote] = useState(null); // Stores the selected customer
  const [isOpenDialog, setIsOpenDialog] = useState(false); // Stores the dialog open/close state

  return (
    <DetailContext.Provider
      value={{
        selectedCustomer,
        setSelectedCustomer,
        isOpenDialog,
        setIsOpenDialog,
        orderNote,
        setOrderNote,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}

// Custom hook to use DetailContext
export function usePOSDetailContext() {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("usePOSDetailContext must be used within a POSDetailProvider");
  }
  return context;
}
