"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-8">
        <a href="/" className="flex items-center">
          <Image
            src="/brand/logos/getaced-primary-white.png"
            alt="get ACEd, LLC"
            width={280}
            height={90}
            priority
            className="h-auto w-[180px] md:w-[240px] lg:w-[280px]"
          />
        </a>

        <div className="hidden lg:flex items-center gap-12 uppercase tracking-[0.18em] text-sm">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition-all duration-300 hover:text-[#C8A96B] ${
                  isActive ? 'text-[#C8A96B]' : 'text-[#E8E3D9]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
