"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {FaBars} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

export default function CateringNavbar(){
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-amber-800 text-amber-50 sticky top-0 z-20">
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
            <Link href="/" className="inline-flex items-center bg-amber-600 hover:bg-amber-500 transition-colors text-white px-4 py-2 rounded-lg font-medium">
              Back to Pizza Section
            </Link>
          </nav>

          <button aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-amber-50">
            {isOpen ? <IoMdClose size={22} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-amber-700 border-t border-amber-600">
          <div className="container mx-auto px-4 py-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block w-full text-center bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-lg">
              Back to Pizza Section
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
