"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { navItems } from "../constants/index"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex px-6 py-4 justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/No bg.png" alt="Bulbul Farm Logo" width={50} height={50} className="max-w-full h-auto" />
          <span
            className={`text-xl font-bold transition-colors duration-300 ${scrolled ? "text-gray-900" : "text-white"}`}
          >
            Bulbul Farm
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.route}
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrolled ? "text-gray-700 hover:text-green-600" : "text-white hover:text-green-400"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
              scrolled
                ? "bg-green-600 text-white hover:bg-green-500 shadow-lg"
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
            }`}
          >
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-lg transition-all duration-300 ${
              scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/20 px-6 py-4 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.route}
              className="block py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition-colors duration-300">
            Get Quote
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


