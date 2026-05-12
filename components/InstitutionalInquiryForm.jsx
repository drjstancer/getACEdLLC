"use client"

import { useState } from 'react'
import InstitutionalCTA from './InstitutionalCTA'

export default function InstitutionalInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'Institutional Consulting',
    goals: '',
  })

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setStatus({
        type: 'success',
        message: data.message,
      })

      setFormData({
        name: '',
        organization: '',
        email: '',
        inquiryType: 'Institutional Consulting',
        goals: '',
      })
    } catch (error) {
      console.error(error)

      setStatus({
        type: 'error',
        message:
          'We were unable to process your inquiry. Please try again shortly.',
      })
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/10 bg-white/[0.03] p-12 space-y-8"
    >
      <div>
        <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
        />
      </div>

      <div>
        <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
          Organization
        </label>

        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
        />
      </div>

      <div>
        <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
        />
      </div>

      <div>
        <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
          Inquiry Type
        </label>

        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
        >
          <option>Institutional Consulting</option>
          <option>Speaking Engagement</option>
          <option>Adult MHFA Training</option>
          <option>Partnership Collaboration</option>
          <option>Media Inquiry</option>
        </select>
      </div>

      <div>
        <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
          Partnership Goals
        </label>

        <textarea
          rows="6"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          required
          className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
        />
      </div>

      {status && (
        <div
          className={`border px-6 py-5 text-sm leading-relaxed ${
            status.type === 'success'
              ? 'border-[#C8A96B]/30 bg-[#C8A96B]/10 text-[#F5F2EB]'
              : 'border-red-500/30 bg-red-500/10 text-white'
          }`}
        >
          {status.message}
        </div>
      )}

      <InstitutionalCTA asButton type="submit">
        {loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}
      </InstitutionalCTA>
    </form>
  )
}
