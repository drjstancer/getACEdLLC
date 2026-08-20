"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Claiming Your Crown', href: '/claim-your-crown' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-xl bg-black/30 transition-all duration-300 hover:border-[#C8A96B]/50"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl uppercase tracking-[0.18em] text-center transition-all duration-300 ${
                  isActive ? 'text-[#C8A96B]' : 'text-[#F5F2EB]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
