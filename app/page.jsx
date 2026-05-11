const impactMetrics = [
  {
    number: '100+',
    label: 'Students & Emerging Leaders Mentored',
  },
  {
    number: 'Multiple',
    label: 'Educational & Pathway Initiatives Developed',
  },
  {
    number: 'National',
    label: 'Conference & Leadership Engagement Reach',
  },
  {
    number: '10+',
    label: 'Years of Educational Leadership Experience',
  },
]

export default function HomePage() {
  const expertise = [
    {
      title: 'Institutional Strategy',
      description:
        'Student success ecosystems, mentoring infrastructures, pathway development, and transformational educational strategy.',
    },
    {
      title: 'Leadership Development',
      description:
        'Professional development, keynote speaking, educator engagement, and leadership cultivation for evolving institutions.',
    },
    {
      title: 'Program & Pathway Design',
      description:
        'Scalable educational experiences rooted in access, excellence, belonging, and long-term student success.',
    },
    {
      title: 'Mental Health & Community Care',
      description:
        'Adult Mental Health First Aid training and care-centered leadership development for healthier educational communities.',
    },
  ]

  return (
    <main className="bg-[#070707] text-[#F5F2EB] overflow-x-hidden font-[Georgia]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4 {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      <section className="relative min-h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/hero-drj.png"
            alt="Dr. Joel Stancer"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/40" />
        </div>

        <nav className="relative z-20 px-6 py-8 lg:px-12 flex items-center justify-between">
          <div>
            <p className="text-[#C8A96B] uppercase tracking-[0.35em] text-xs mb-2">
              get ACEd, LLC
            </p>
            <h2 className="text-2xl font-serif">Dr. Joel Stancer</h2>
          </div>

          <div className="hidden lg:flex items-center gap-10 uppercase tracking-[0.18em] text-sm text-[#E8E3D9]">
            <a href="#about" className="hover:text-[#C8A96B] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#C8A96B] transition-colors">Expertise</a>
            <a href="#impact" className="hover:text-[#C8A96B] transition-colors">Impact</a>
            <a href="#speaking" className="hover:text-[#C8A96B] transition-colors">Speaking</a>
            <a
              href="#connect"
              className="border border-white/20 px-5 py-3 hover:bg-white hover:text-black transition-all"
            >
              Connect
            </a>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs md:text-sm mb-8">
                Education. Culture. Excellence.
              </p>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.92] font-serif tracking-tight mb-10 text-white">
                Building Educational Environments Where People Thrive.
              </h1>

              <p className="text-lg md:text-2xl text-[#DDD6CA] leading-relaxed max-w-2xl mb-12">
                We partner with institutions to strengthen leadership, cultivate transformational educational environments, and design pathways that create lasting impact for students and communities.
              </p>

              <div className="flex flex-wrap gap-5">
                <a
                  href="#connect"
                  className="bg-[#C8A96B] text-black px-8 py-5 uppercase tracking-[0.18em] text-sm hover:bg-[#d7b980] transition-all duration-300"
                >
                  Let’s Build Together
                </a>

                <a
                  href="#expertise"
                  className="border border-white/20 px-8 py-5 uppercase tracking-[0.18em] text-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  Explore Expertise
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
