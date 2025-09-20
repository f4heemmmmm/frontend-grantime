"use client";

import React from "react";
import { ChartBarIncreasing, House } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-10 flex flex-col gap-10 border-r border-gray-300">
      <Link href="/">
        <House
          className={pathname == "/" ? "text-blue-600" : "text-gray-300"}
        />
      </Link>
      <Link href="/trackonomics">
        <ChartBarIncreasing
          className={
            pathname == "/trackonomics" ? "text-blue-600" : "text-gray-300"
          }
        />
      </Link>
    </div>
  );
};

export default Navbar;
