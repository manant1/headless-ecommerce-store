import React from "react";
import './src/styles/global.css';
import ToastProvider from "./src/toast.context"

export const wrapRootElement = ({ element }) => (
  <ToastProvider>{element}</ToastProvider>
)