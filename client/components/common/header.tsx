import React from "react";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Header() {
  const isLoggedIn = false;
  return (
    <nav className="container flex justify-between items-center py-4 lg:px-8 mx-auto">
      {/* Left section - Logo */}
      <div className="flex flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="lg:text-lg font-extrabold text-gray-900">
            Summarize
          </span>
        </NavLink>
      </div>

      {/* Middle section - Navigation */}
      <div className="flex justify-center flex-1 gap-4 lg:gap-12 items-center">
        <NavLink href="#pricing">Pricing</NavLink>
        <NavLink href="/dashboard">Your Summaries</NavLink>
      </div>

      {/* Right section - Auth */}
      <div className="flex justify-end flex-1">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a pdf</NavLink>
            <div>Pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}