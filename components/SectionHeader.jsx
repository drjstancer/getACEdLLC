export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-5xl mb-24">
      <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-10">
        {eyebrow}
      </p>

      <h2 className="text-5xl md:text-6xl font-serif leading-[1.02] tracking-[-0.02em] mb-10 text-white max-w-5xl">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-[#D8D3CA] leading-[1.9] max-w-4xl">
          {description}
        </p>
      )}
    </div>
  )
}
