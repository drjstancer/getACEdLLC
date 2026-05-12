const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <a href="/" className="block">
          <p className="text-[#C8A96B] uppercase tracking-[0.35em] text-xs mb-1">
            get ACEd, LLC
          </p>
          <h2 className="text-white text-xl font-serif">
            Dr. Joel Stancer
          </h2>
        </a>

        <div className="hidden lg:flex items-center gap-10 uppercase tracking-[0.18em] text-sm text-[#E8E3D9]">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#C8A96B] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
