export default function InstitutionalCTA({ href = '/contact', children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center bg-[#C8A96B] text-black px-10 py-5 uppercase tracking-[0.18em] text-sm transition-all duration-300 hover:bg-[#d7b980] hover:translate-y-[-1px]"
    >
      {children}
    </a>
  )
}
