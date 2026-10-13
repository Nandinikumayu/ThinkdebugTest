import React from "react";
import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type}`} role="status">
      <span className="toast-icon">
        {toast.type === "success" ? "✓" : "ℹ"}
      </span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
