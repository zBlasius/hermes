import React, { createContext, useState, useEffect, useContext } from "react";
import { Toast } from "toastify-react-native";

interface ToastContextType {
    showRegularToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  function showRegularToast(message: string) {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: message,
      position: "bottom",
      visibilityTime: 3000,
      autoHide: true,
      backgroundColor: "#333",
      textColor: "#fff",
      iconColor: "#4CAF50",
      iconSize: 24,
      progressBarColor: "#4CAF50",
      theme: "dark",
      closeIcon: "times-circle",
      closeIconFamily: "FontAwesome",
      closeIconSize: 20,
      closeIconColor: "#fff",
    });
  }
  return (
    <ToastContext.Provider value={{ showRegularToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro do ToastProvider");
  }

  return context;
}
