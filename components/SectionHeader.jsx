export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-5xl mb-20">
      <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
        {eyebrow}
      </p>

      <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-white">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-[#D8D3CA] leading-relaxed max-w-4xl">
          {description}
        </p>
      )}
    </div>
  )
}
