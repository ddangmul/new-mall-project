import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTitle({
  children,
  className = "",
}: PageTitleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(pathname);
  };

  return (
    <h1
      className={`font-serif text-xl md:text-2xl lg:text-3xl font-seri py-6 md:py-8 mb-6 lg:mb-8 ${className}`}
      onClick={handleClick}
    >
      {children}
    </h1>
  );
}
