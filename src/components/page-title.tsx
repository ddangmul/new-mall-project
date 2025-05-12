import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTitle({
  children,
  className = "",
}: PageTitleProps) {
  return (
    <h1
      className={`font-serif text-xl md:text-2xl lg:text-3xl font-seri py-6 md:py-8 border-b-1 border-b-[#9e9e9e] mb-6 lg:mb-8 ${className}`}
    >
      {children}
    </h1>
  );
}
