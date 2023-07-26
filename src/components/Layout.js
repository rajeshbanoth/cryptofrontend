import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const { loading } = useSelector((state) => state.wallet);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <Header />
      {children}
    </>
  );
}
