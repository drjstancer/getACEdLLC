export default function EditorialArticleLayout({
  category,
  title,
  description,
  author,
  date,
  children,
}) {
  return (
    <main className="bg-[#F5F2EB] text-[#111111] min-h-screen px-6 py-32 lg:px-12">
      <article className="max-w-4xl mx-auto">
        <div className="mb-24 border-b border-black/10 pb-20">
          <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-10">
            {category}
          </p>

          <h1 className="text-5xl md:text-7xl leading-[0.92] font-serif mb-12 max-w-5xl tracking-[-0.02em]">
            {title}
          </h1>

          <p className="text-2xl leading-[1.8] text-[#444444] max-w-3xl mb-14">
            {description}
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm uppercase tracking-[0.18em] text-[#777777]">
            <span>{author}</span>
            <span className="hidden md:block">•</span>
            <span>{date}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#111111] prose-headings:tracking-[-0.02em] prose-headings:mb-8 prose-p:text-[#333333] prose-p:leading-[2] prose-p:text-[1.18rem] prose-p:mb-10 prose-blockquote:border-l-[#C8A96B] prose-blockquote:text-[#555555] prose-blockquote:italic prose-blockquote:pl-6 prose-strong:text-[#111111]">
          {children}
        </div>
      </article>
    </main>
  )
}
