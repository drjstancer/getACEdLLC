export default function EditorialCard({
  category,
  title,
  description,
  href,
}) {
  return (
    <a
      href={href}
      className="group block border border-white/10 bg-white/[0.03] p-10 hover:border-[#C8A96B]/40 transition-all duration-500"
    >
      <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
        {category}
      </p>

      <h3 className="text-3xl md:text-4xl font-serif leading-[1.05] tracking-[-0.02em] mb-8 text-white group-hover:text-[#F5F2EB] transition-all duration-300">
        {title}
      </h3>

      <p className="text-[#D8D3CA] leading-[1.9] text-[1.02rem] max-w-xl">
        {description}
      </p>
    </a>
  )
}
