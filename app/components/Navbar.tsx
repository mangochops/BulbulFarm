"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { navItems } from "../constants/index";
import { Menu } from 'lucide-react'; // You can also use other icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-20 bg-transparent backdrop-blur-lg">
      <div className="flex px-6 py-4 justify-between items-center">
        {/* Logo */}
        <Image
          src="/No bg.png"
          alt="Brand logo"
          width={60}
          height={60}
          className="max-w-full h-auto"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.route}
              className="text-white hover:text-green-600 transition"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <Menu className="text-white w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-black bg-opacity-80 text-white py-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.route}
              className="py-2 text-white hover:text-green-600 transition"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

