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

const philosophy = [
  {
    title: 'Care-Centered',
    text: 'We lead with empathy and humanity to support the whole person.',
  },
  {
    title: 'Equity-Driven',
    text: 'We design strategies that remove barriers and expand opportunity.',
  },
  {
    title: 'Excellence-Focused',
    text: 'We pursue exceptional outcomes through intentional leadership.',
  },
  {
    title: 'Community-Rooted',
    text: 'We build sustainable partnerships that strengthen communities.',
  },
]

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

export default function HomePage() {
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

      <section className="bg-[#0D1B38] border-y border-[#C8A96B]/20 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-10 text-center">
          {philosophy.map((item) => (
            <div key={item.title}>
              <h3 className="uppercase tracking-[0.18em] text-[#E9D2A0] text-sm mb-4">
                {item.title}
              </h3>
              <p className="text-[#D6D6D6] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#F5F2EB] text-[#111111] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-8">
              Our Mission
            </p>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-10">
              To transform educational environments through culture, leadership, and community.
            </h2>
            <p className="text-xl leading-relaxed text-[#333333] mb-8">
              Through get ACEd, LLC, Dr. Joel Stancer partners with universities, educational organizations, pathway programs, and community leaders to cultivate environments where people can thrive academically, emotionally, and professionally.
            </p>
          </div>

          <div className="bg-white p-10 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <p className="text-4xl text-[#C8A96B] mb-6">“</p>
            <p className="text-3xl leading-relaxed font-serif mb-10 text-[#111111]">
              When we invest in people, remove barriers, and cultivate belonging, we don’t just change outcomes—we change lives.
            </p>
            <p className="uppercase tracking-[0.18em] text-xs text-[#9C7A3C] mb-2">
              Dr. Joel Stancer
            </p>
            <p className="text-[#555555]">Founder & Principal Consultant, get ACEd, LLC</p>
          </div>
        </div>
      </section>

      <section id="expertise" className="py-32 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mb-20">
            <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
              Institutional Expertise
            </p>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8">
              Strategic partnership for transformational educational impact.
            </h2>
            <p className="text-xl text-[#D8D3CA] leading-relaxed">
              We help institutions strengthen culture, develop leaders, and create systems that cultivate excellence and long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((item) => (
              <div
                key={item.title}
                className="border border-white/10 bg-white/[0.03] p-10 hover:border-[#C8A96B]/40 transition-all duration-500"
              >
                <h3 className="text-3xl font-serif mb-6 text-white">{item.title}</h3>
                <p className="text-[#CFCFCF] text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="bg-[#0B1730] py-24 border-y border-[#C8A96B]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mb-20">
            <p className="uppercase tracking-[0.35em] text-[#E9D2A0] text-xs mb-8">
              Selected Impact
            </p>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-white">
              Building transformational educational pathways, leadership ecosystems, and thriving communities.
            </h2>
            <p className="text-xl leading-relaxed text-[#DADADA] max-w-4xl">
              Our work centers transformational educational environments that cultivate belonging, leadership, access, and long-term institutional impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {impactMetrics.map((item) => (
              <div key={item.label} className="border-t border-[#C8A96B]/30 pt-8">
                <p className="text-5xl md:text-6xl font-serif text-[#E9D2A0] mb-5">
                  {item.number}
                </p>
                <p className="text-[#E0E0E0] leading-relaxed text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="speaking" className="py-32 bg-[#F5F2EB] text-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-8">
              Speaking & Thought Leadership
            </p>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-10">
              Conversations that move people, leaders, and institutions forward.
            </h2>
            <p className="text-xl leading-relaxed text-[#333333] mb-10">
              Dr. Joel Stancer speaks nationally on transformational educational environments, leadership cultivation, mentorship, student success, pathway development, mental health, and community-centered excellence.
            </p>
            <div className="space-y-5 text-lg text-[#444444] leading-relaxed mb-12">
              <p>• Educational Transformation & Student Success</p>
              <p>• Leadership, Culture, & Community</p>
              <p>• Mental Health & Care-Centered Excellence</p>
              <p>• Mentorship, Pathways, & Access</p>
            </div>
            <a
              href="#connect"
              className="bg-[#111111] text-white px-8 py-5 uppercase tracking-[0.18em] text-sm inline-block hover:bg-[#222222] transition-all duration-300"
            >
              Invite Dr. Joel Stancer to Speak
            </a>
          </div>

          <div className="relative">
            <img
              src="/hero-drj.png"
              alt="Dr. Joel Stancer"
              className="w-full h-[700px] object-cover object-top shadow-[0_30px_120px_rgba(0,0,0,0.18)]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-48" />
          </div>
        </div>
      </section>

      <section id="connect" className="py-32 bg-[#070707] text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
            Let’s Build Together
          </p>
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.05] mb-10">
            Educational excellence rooted in leadership, culture, and community.
          </h2>
          <p className="text-xl text-[#D8D3CA] leading-relaxed mb-12">
            Partner with get ACEd, LLC for institutional strategy, professional development, educational pathway design, Adult Mental Health First Aid training, and transformational speaking engagements.
          </p>
          <a
            href="mailto:hello@getacedllc.com"
            className="bg-[#C8A96B] text-black px-10 py-5 uppercase tracking-[0.18em] text-sm hover:bg-[#d7b980] transition-all duration-300 inline-block"
          >
            Partner With get ACEd, LLC
          </a>
        </div>
      </section>
    </main>
  )
}
