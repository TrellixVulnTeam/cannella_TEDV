import React, { ReactChild, ReactChildren } from "react";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";

interface LayoutProps {
  children: ReactChild | ReactChildren;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`flex flex-col justify-between min-h-screen bg-stone-300`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
