"use client"

import { useMemo, useState } from 'react'

const crownPhoto = 'https://images.pexels.com/photos/10873899/pexels-photo-10873899.jpeg?auto=compress&cs=tinysrgb&w=1800'

const affirmationLines = [
  'I belong here.',
  'My presence matters.',
  'I don’t shrink.',
  'I take up space—appropriately and intentionally.',
  'I don’t apologize for excellence.',
  'I advocate for myself.',
  'And for my success.',
  'I wear my crown.',
  'Even on hard days.',
  'When I’m tired.',
  'When I’m the only one.',
  'I walk in different.',
  'I walk in wearing my crown.',
]

function SectionHeader({ number, eyebrow, title }) {
  return (
    <div className="mb-10">
      <p className="uppercase tracking-[0.32em] text-[#C8A96B] text-xs mb-5">{eyebrow}</p>
      <div className="flex items-start gap-5">
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C8A96B]/40 text-sm text-[#C8A96B]">
          {number}
        </span>
        <h2 className="font-serif text-4xl leading-[1.02] text-white md:text-6xl">{title}</h2>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, rows = 1 }) {
  const shared = 'w-full border border-white/10 bg-white/[0.035] px-5 py-4 text-[#F5F2EB] outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#C8A96B]/65 focus:bg-white/[0.05]'

  return (
    <div>
      <label className="mb-3 block text-xs uppercase tracking-[0.18em] text-[#C8A96B]">{label}</label>
      {rows > 1 ? (
        <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} className={`${shared} resize-y`} />
      ) : (
        <input value={value} onChange={onChange} placeholder={placeholder} className={shared} />
      )}
    </div>
  )
}

export default function ClaimYourCrownExperience() {
  const [responses, setResponses] = useState({
    theySay: '',
    iKnow: '',
    power1: '',
    power2: '',
    power3: '',
    academic: '',
    emotional: '',
    connector: '',
    truthTeller: '',
    weakestCircle: '',
    strengthenStep: '',
    systemChallenge: '',
    avoidedResource: '',
    advocacyAction: '',
    nameMeaning: '',
    semesterAction: '',
    weeklyCommitment: '',
    hardDaySentence: '',
  })
  const [showDeclaration, setShowDeclaration] = useState(false)

  const update = (key) => (event) => {
    setResponses((current) => ({ ...current, [key]: event.target.value }))
    if (key === 'hardDaySentence') setShowDeclaration(false)
  }

  const powerStatements = useMemo(
    () => [responses.power1, responses.power2, responses.power3].filter(Boolean),
    [responses.power1, responses.power2, responses.power3]
  )

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F2EB]">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @media print {
          nav, footer, .cyc-no-print { display: none !important; }
          .cyc-screen { display: none !important; }
          .cyc-print { display: block !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      <div className="cyc-screen">
        <section className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-[center_28%]"
            style={{ backgroundImage: `url(${crownPhoto})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.96)_0%,rgba(0,0,0,.82)_43%,rgba(0,0,0,.28)_75%,rgba(0,0,0,.58)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,transparent_40%)]" />

          <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-12 lg:pb-28">
            <p className="mb-7 text-xs uppercase tracking-[0.4em] text-[#C8A96B]">Signature Educational Experience</p>
            <h1 className="max-w-5xl font-serif text-6xl leading-[0.88] tracking-[-0.035em] text-white md:text-8xl lg:text-[7.6rem]">
              Claiming Your Crown
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#D9D3C7] md:text-2xl">
              Thriving as a Black Man in Higher Education
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-[1.9] text-[#C8C1B5] md:text-xl">
              The crown isn’t something someone else gives you. It is the clarity to know who you are, the community that keeps you grounded, the strategy to navigate systems, the legacy you choose to build, and the consistency to live it.
            </p>
            <div className="cyc-no-print mt-11 flex flex-wrap gap-4">
              <a href="#clarity" className="bg-[#C8A96B] px-8 py-4 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-[#D9BD83]">Begin the Experience</a>
              <a href="/contact?topic=claiming-your-crown" className="border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:border-[#C8A96B] hover:text-[#C8A96B]">Bring It to Your Campus</a>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-12">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[#C8A96B]">A Digital Reflection Experience</p>
              <p className="font-serif text-3xl leading-[1.35] text-white md:text-4xl">
                The room may not change tomorrow. But you can change how you walk into it.
              </p>
            </div>
            <div className="text-base leading-[1.9] text-[#C8C1B5]">
              <p>This experience is adapted from Dr. J’s facilitated <em>Claiming Your Crown</em> session. Your reflections remain on your device. They are not transmitted, stored, or submitted to get ACEd, LLC.</p>
            </div>
          </div>
        </section>

        <section id="clarity" className="border-b border-white/10 bg-[#090909] py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <SectionHeader number="01" eyebrow="Clarity" title="Own Your Identity" />
            <p className="mb-12 max-w-3xl text-lg leading-[1.9] text-[#C8C1B5]">
              Before you can build your village or master a system, you have to separate what “they” said from what you know. Your identity is not an obstacle to minimize or manage. It is an asset to understand and leverage intentionally.
            </p>
            <div className="grid gap-7 lg:grid-cols-2">
              <Field label="They say Black men are..." value={responses.theySay} onChange={update('theySay')} placeholder="Name the labels, assumptions, or narratives you have encountered." rows={5} />
              <Field label="I know I am..." value={responses.iKnow} onChange={update('iKnow')} placeholder="Name what you know to be true about yourself." rows={5} />
            </div>
            <div className="mt-10">
              <p className="mb-5 text-xs uppercase tracking-[0.18em] text-[#C8A96B]">What Makes Me Powerful - Three Things</p>
              <div className="grid gap-5 md:grid-cols-3">
                <Field label="One" value={responses.power1} onChange={update('power1')} placeholder="A strength, truth, or asset..." />
                <Field label="Two" value={responses.power2} onChange={update('power2')} placeholder="A strength, truth, or asset..." />
                <Field label="Three" value={responses.power3} onChange={update('power3')} placeholder="A strength, truth, or asset..." />
              </div>
            </div>
            <blockquote className="mt-16 border-l border-[#C8A96B] pl-7 font-serif text-2xl leading-relaxed text-white md:text-3xl">Identity gives you clarity.</blockquote>
          </div>
        </section>

        <section className="border-b border-white/10 py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <SectionHeader number="02" eyebrow="Community" title="Build Your Village" />
            <p className="mb-4 max-w-3xl font-serif text-3xl text-white">Interdependence is power.</p>
            <p className="mb-12 max-w-3xl text-lg leading-[1.9] text-[#C8C1B5]">Self-reliance is valuable. Isolation is dangerous. Claiming your crown does not mean standing alone. It means standing supported.</p>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Academic Accountability" value={responses.academic} onChange={update('academic')} placeholder="Who checks your grades, goals, and deadlines?" />
              <Field label="Mental & Emotional Support" value={responses.emotional} onChange={update('emotional')} placeholder="Who checks on you as a human?" />
              <Field label="Opportunity Connector" value={responses.connector} onChange={update('connector')} placeholder="Who opens doors, gives advice, or makes introductions?" />
              <Field label="Truth-Teller" value={responses.truthTeller} onChange={update('truthTeller')} placeholder="Who keeps you grounded and honest?" />
            </div>
            <div className="mt-10 grid gap-7 lg:grid-cols-2">
              <Field label="Which circle is weakest right now?" value={responses.weakestCircle} onChange={update('weakestCircle')} placeholder="An empty space is not failure. It is information." rows={4} />
              <Field label="One step I can take this month to strengthen it" value={responses.strengthenStep} onChange={update('strengthenStep')} placeholder="Name one concrete action." rows={4} />
            </div>
            <div className="mt-16 border border-[#C8A96B]/20 bg-[#C8A96B]/[0.06] p-8 md:p-10">
              <p className="font-serif text-3xl leading-relaxed text-white">No king builds alone.</p>
              <p className="mt-3 text-[#C8C1B5]">A crown is not just position. It is structure, support, alignment, and responsibility.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#090909] py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <SectionHeader number="03" eyebrow="Strategy" title="Master the System" />
            <p className="mb-12 max-w-4xl text-lg leading-[1.9] text-[#C8C1B5]">College is more than a classroom. It is policies, language, unspoken rules, offices, deadlines, networks, and expectations. Some gaps are knowledge gaps. Some are institutional gaps. You can learn the system without letting it define you.</p>
            <div className="space-y-7">
              <Field label="What is one system or structure in college that confuses or frustrates you?" value={responses.systemChallenge} onChange={update('systemChallenge')} placeholder="Financial aid, internships, office hours, networking, advising, policies..." rows={4} />
              <Field label="What is one office, professor, or resource you avoid using?" value={responses.avoidedResource} onChange={update('avoidedResource')} placeholder="Name the resource you know exists but have not fully used." rows={4} />
              <Field label="What would it look like to advocate for yourself instead of shrinking?" value={responses.advocacyAction} onChange={update('advocacyAction')} placeholder="Ask. Clarify. Follow up. Prepare. Speak." rows={4} />
            </div>
            <div className="mt-16 grid gap-4 border-y border-white/10 py-10 text-center md:grid-cols-3">
              {['Clarity', 'Preparation', 'Follow-through'].map((item) => <p key={item} className="font-serif text-2xl text-white md:text-3xl">{item}</p>)}
            </div>
            <p className="mt-8 text-center text-xs uppercase tracking-[0.32em] text-[#C8A96B]">Advocacy is strategy.</p>
          </div>
        </section>

        <section className="border-b border-white/10 py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <SectionHeader number="04" eyebrow="Legacy" title="Define Your Legacy" />
            <p className="mb-12 max-w-4xl text-lg leading-[1.9] text-[#C8C1B5]">Different is more than a GPA or a degree. Different is reputation. Different is impact. Different is legacy.</p>
            <div className="space-y-7">
              <Field label="When people say my name, I want it to mean..." value={responses.nameMeaning} onChange={update('nameMeaning')} placeholder="Not what sounds impressive. What do you want your name to represent?" rows={4} />
              <div className="grid gap-7 lg:grid-cols-2">
                <Field label="If I was fully wearing my crown this semester, I would..." value={responses.semesterAction} onChange={update('semesterAction')} placeholder="How would you move differently?" rows={5} />
                <Field label="One action I commit to this week" value={responses.weeklyCommitment} onChange={update('weeklyCommitment')} placeholder="What does your behavior need to look like this week?" rows={5} />
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="font-serif text-3xl leading-relaxed text-white md:text-5xl">Your name is your brand.<br />Your behavior is your blueprint.</p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/10 py-32">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${crownPhoto})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,.14),rgba(5,5,5,.93)_60%)]" />
          <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C8A96B]">Consistency</p>
            <h2 className="font-serif text-5xl leading-tight text-white md:text-7xl">Your consistency is the crown.</h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-[1.9] text-[#C8C1B5]">Legacy is not built in speeches. It is built in repeated, consistent behavior. The crown is not decoration. It is responsibility.</p>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#090909] py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <SectionHeader number="05" eyebrow="Declaration" title="Claim Your Crown" />
            <p className="mb-10 max-w-3xl text-lg leading-[1.9] text-[#C8C1B5]">Before you repeat anyone else’s words, write the sentence you need to remember on the hard days.</p>
            <Field label="My Crown Declaration" value={responses.hardDaySentence} onChange={update('hardDaySentence')} placeholder="On hard days, I need to remember..." rows={5} />
            <div className="cyc-no-print mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => setShowDeclaration(Boolean(responses.hardDaySentence.trim()))} className="bg-[#C8A96B] px-8 py-4 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-[#D9BD83]">Claim My Crown</button>
              <button type="button" onClick={() => window.print()} className="border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:border-[#C8A96B] hover:text-[#C8A96B]">Print My Reflection</button>
              <a href="/claim-your-crown/claiming-your-crown-reflection-guide.pdf" className="border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:border-[#C8A96B] hover:text-[#C8A96B]">Download Reflection Guide</a>
            </div>
            {showDeclaration && responses.hardDaySentence && (
              <div className="mt-14 border border-[#C8A96B]/35 bg-[linear-gradient(180deg,rgba(200,169,107,.12),rgba(255,255,255,.025))] px-8 py-12 text-center md:px-14 md:py-16">
                <p className="mb-6 text-xs uppercase tracking-[0.28em] text-[#C8A96B]">My Crown Declaration</p>
                <p className="font-serif text-3xl leading-relaxed text-white md:text-5xl">{responses.hardDaySentence}</p>
              </div>
            )}
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/10 py-28">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${crownPhoto})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,rgba(5,5,5,.86)_45%,#050505_100%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
            <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#C8A96B]">I Wear My Crown</p>
            <h2 className="mb-16 font-serif text-4xl text-white md:text-6xl">Now say this with me.</h2>
            <div className="space-y-6">
              {affirmationLines.map((line, index) => (
                <p key={line} className={`${index === 7 || index >= 11 ? 'text-white' : 'text-[#D1CABC]'} font-serif text-2xl leading-relaxed md:text-4xl ${index === 7 ? 'py-5 text-[#C8A96B] md:text-5xl' : ''}`}>{line}</p>
              ))}
            </div>
            <div className="mt-20 border-t border-[#C8A96B]/25 pt-10">
              <p className="font-serif text-2xl italic text-[#C8A96B] md:text-3xl">Stay Black and protect your joy.</p>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[#BEB6A8]">— Dr. J</p>
            </div>
          </div>
        </section>

        <section className="bg-[#0A0A0A] py-28">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C8A96B]">Bring It to Your Campus</p>
            <h2 className="font-serif text-5xl leading-tight text-white md:text-7xl">Claiming Your Crown</h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-[1.9] text-[#C8C1B5]">A facilitated educational experience supporting Black men in higher education through identity reflection, intentional community, institutional navigation, self-advocacy, legacy, and consistent action.</p>
            <div className="cyc-no-print mt-12 flex flex-wrap justify-center gap-4">
              <a href="/contact?topic=claiming-your-crown" className="bg-[#C8A96B] px-10 py-5 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-[#D9BD83]">Book This Experience</a>
              <a href="mailto:booking@getacedllc.com?subject=Claiming%20Your%20Crown%20Inquiry" className="border border-white/20 px-10 py-5 text-xs uppercase tracking-[0.2em] text-white transition hover:border-[#C8A96B] hover:text-[#C8A96B]">booking@getacedllc.com</a>
            </div>
          </div>
        </section>
      </div>

      <section className="cyc-print hidden bg-white p-10 text-black">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-xs uppercase tracking-[0.2em]">get ACEd, LLC</p>
          <h1 className="mb-2 font-serif text-4xl">Claiming Your Crown Reflection</h1>
          <p className="mb-10">Thriving as a Black Man in Higher Education</p>

          <h2 className="mt-8 font-serif text-2xl">Own Your Identity</h2>
          <p><strong>They say Black men are:</strong> {responses.theySay}</p>
          <p><strong>I know I am:</strong> {responses.iKnow}</p>
          <p><strong>What makes me powerful:</strong> {powerStatements.join(' • ')}</p>

          <h2 className="mt-8 font-serif text-2xl">Build Your Village</h2>
          <p><strong>Academic Accountability:</strong> {responses.academic}</p>
          <p><strong>Mental & Emotional Support:</strong> {responses.emotional}</p>
          <p><strong>Opportunity Connector:</strong> {responses.connector}</p>
          <p><strong>Truth-Teller:</strong> {responses.truthTeller}</p>
          <p><strong>Weakest circle:</strong> {responses.weakestCircle}</p>
          <p><strong>Step to strengthen it:</strong> {responses.strengthenStep}</p>

          <h2 className="mt-8 font-serif text-2xl">Master the System</h2>
          <p><strong>System or structure:</strong> {responses.systemChallenge}</p>
          <p><strong>Resource I avoid:</strong> {responses.avoidedResource}</p>
          <p><strong>Self-advocacy:</strong> {responses.advocacyAction}</p>

          <h2 className="mt-8 font-serif text-2xl">Define Your Legacy</h2>
          <p><strong>When people say my name:</strong> {responses.nameMeaning}</p>
          <p><strong>If I was fully wearing my crown:</strong> {responses.semesterAction}</p>
          <p><strong>This week I commit to:</strong> {responses.weeklyCommitment}</p>

          <h2 className="mt-8 font-serif text-2xl">My Crown Declaration</h2>
          <p className="text-xl">{responses.hardDaySentence}</p>
          <p className="mt-12 text-sm">Stay Black and protect your joy. — Dr. J</p>
        </div>
      </section>
    </main>
  )
}
