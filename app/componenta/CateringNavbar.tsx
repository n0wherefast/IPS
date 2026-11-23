"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {FaBars} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

type CateringNavbarProps = {
  currentSection: "kitchen" | "canape";
};

export default function CateringNavbar({
  currentSection,
}: CateringNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const sectionButtonBackground = currentSection === "kitchen"
    ? "bg-amber-800 hover:bg-amber-600"
    : "bg-emerald-700 hover:bg-emerald-600"
  const navbarBackground = currentSection === "kitchen" ? "bg-amber-950" : "bg-emerald-950"

  return (
    <header className={`sticky top-0 z-20 text-stone-50 ${navbarBackground}`}>
      <div className="container mx-auto flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <Image
            alt="italian pizza catering logo"
            className="rounded-2xl w-12 h-10 md:w-16 md:h-12"
            src='/logo2.webp'
            width={100}
            height={100}
          />
          <Link href="#home" className="text-sm md:text-lg font-semibold">Italian Catering</Link>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex">
            <Link href="/" className="inline-flex items-center bg-stone-700 text-white px-4 py-2 rounded-lg font-medium transition-colors hover:bg-stone-600">
              Back to Pizza Section
            </Link>
            <Link
              href={currentSection === "canape" ? "/kitchen-catering" : "/canape-catering"}
              className={`ml-3 inline-flex items-center ${sectionButtonBackground} transition-colors text-white px-4 py-2 rounded-lg font-medium`}
            >
              {currentSection === "canape" ? "Kitchen Section" : "Canapé Section"}
            </Link>
          
          </nav>

          <button aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-amber-50">
            {isOpen ? <IoMdClose size={22} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className={`md:hidden border-t border-white/10 ${navbarBackground}`}>
          <div className="container mx-auto grid gap-2 px-4 py-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block w-full rounded-lg bg-stone-700 px-4 py-3 text-center text-white transition-colors hover:bg-stone-600">
              Back to Pizza Section
            </Link>
            <Link
              href={currentSection === "canape" ? "/kitchen-catering" : "/canape-catering"}
              onClick={() => setIsOpen(false)}
              className={`block w-full rounded-lg px-4 py-3 text-center text-white transition-colors ${sectionButtonBackground}`}
            >
              {currentSection === "canape" ? "Kitchen Section" : "Canapé Section"}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
