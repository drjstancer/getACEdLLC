export default function EditorialArticleLayout({
  category,
  title,
  description,
  author,
  date,
  children,
}) {
  return (
    <main className="bg-[#F5F2EB] text-[#111111] min-h-screen px-6 py-28 lg:px-12">
      <article className="max-w-4xl mx-auto">
        <div className="mb-20 border-b border-black/10 pb-16">
          <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-8">
            {category}
          </p>

          <h1 className="text-5xl md:text-7xl leading-[0.95] font-serif mb-10 max-w-5xl">
            {title}
          </h1>

          <p className="text-2xl leading-relaxed text-[#444444] max-w-3xl mb-12">
            {description}
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm uppercase tracking-[0.18em] text-[#777777]">
            <span>{author}</span>
            <span className="hidden md:block">•</span>
            <span>{date}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#111111] prose-p:text-[#333333] prose-p:leading-loose prose-p:text-[1.15rem] prose-blockquote:border-l-[#C8A96B] prose-blockquote:text-[#555555] prose-strong:text-[#111111]">
          {children}
        </div>
      </article>
    </main>
  )
}
