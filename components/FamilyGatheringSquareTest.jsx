"use client"

import { useEffect, useRef, useState } from 'react'

let squareScriptPromise = null

function loadSquareScript() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.Square) return Promise.resolve()

  if (!squareScriptPromise) {
    squareScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[data-square-web-payments]'
      )

      if (existingScript) {
        existingScript.addEventListener('load', resolve, { once: true })
        existingScript.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://web.squarecdn.com/v1/square.js'
      script.async = true
      script.dataset.squareWebPayments = 'true'
      script.onload = resolve
      script.onerror = () =>
        reject(new Error('Square payment form could not be loaded.'))
      document.head.appendChild(script)
    })
  }

  return squareScriptPromise
}

function readTokenErrors(tokenResult) {
  return tokenResult?.errors
    ?.map((tokenError) => tokenError.message)
    .filter(Boolean)
    .join(' ')
}

export default function FamilyGatheringSquareTest() {
  const cardRef = useRef(null)
  const [name, setName] = useState('Square Test Payment')
  const [email, setEmail] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    let destroyed = false

    async function initializeSquare() {
      const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

      if (!appId || !locationId) {
        setError('Square is not configured on this deployment yet.')
        return
      }

      try {
        await loadSquareScript()

        if (!window.Square) {
          throw new Error('Square payment form could not be initialized.')
        }

        const payments = window.Square.payments(appId, locationId)
        const card = await payments.card()

        if (destroyed) {
          await card.destroy?.()
          return
        }

        await card.attach('#square-test-card-container')
        cardRef.current = card
        setIsReady(true)
      } catch (squareError) {
        setError(squareError.message || 'Square payment form could not be loaded.')
      }
    }

    initializeSquare()

    return () => {
      destroyed = true
      cardRef.current?.destroy?.().catch(() => {})
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setConfirmation(null)

    if (!email) {
      setError('Enter an email address for the test confirmation.')
      return
    }

    if (!cardRef.current || !isReady) {
      setError('Square is still loading. Wait a moment and try again.')
      return
    }

    setIsSubmitting(true)

    try {
      const tokenResult = await cardRef.current.tokenize()

      if (tokenResult.status !== 'OK') {
        throw new Error(
          readTokenErrors(tokenResult) || 'Square could not verify the card.'
        )
      }

      const response = await fetch('/api/family-gathering-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentTest: true,
          paymentMethod: 'Square',
          squareSourceId: tokenResult.token,
          squarePaymentType: 'Card Test',
          primary: {
            fullName: name || 'Square Test Payment',
            age: '1',
            email,
            phone: '555-555-5555',
            address: 'Square test payment',
            tShirtSize: 'Youth XS',
          },
          additionalRegistrants: [],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Square test payment could not be submitted.')
      }

      setConfirmation(data)
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl border border-[#D7B988] bg-[#FFF8EC] p-6 text-[#4B2818] shadow-lg sm:p-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#B56425]">
        Hidden Square Test
      </p>
      <h1 className="font-serif text-4xl font-black leading-tight sm:text-5xl">
        $1 Square Payment Test
      </h1>
      <p className="mt-4 leading-8 text-[#6A4129]">
        This page tests whether the live Square card payment flow is working. It
        charges exactly $1.00 and marks the tracker row as a Square test payment.
        It is not a real Family Gathering registration.
      </p>

      {error ? (
        <div className="mt-6 border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      ) : null}

      {confirmation ? (
        <div className="mt-6 border border-green-300 bg-green-50 p-4 text-green-900">
          <p className="font-semibold">Square test payment submitted.</p>
          <p className="mt-2">Registration ID: {confirmation.registrationId}</p>
          <p>Charged: $1.00</p>
          {confirmation.squarePaymentId ? (
            <p>Square Payment ID: {confirmation.squarePaymentId}</p>
          ) : null}
          {confirmation.squareReceiptUrl ? (
            <a
              href={confirmation.squareReceiptUrl}
              className="mt-3 inline-block underline"
            >
              View Square receipt
            </a>
          ) : null}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-[#B56425]">
            Test Name
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full border border-[#D7B988] bg-white px-4 py-3 outline-none focus:border-[#B56425]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-[#B56425]">
            Email for Confirmation
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border border-[#D7B988] bg-white px-4 py-3 outline-none focus:border-[#B56425]"
            placeholder="you@example.com"
          />
        </label>

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-[#B56425]">
            Card
          </span>
          <div
            id="square-test-card-container"
            className="min-h-[96px] border border-[#D7B988] bg-white p-4"
          />
        </div>

        <button
          type="submit"
          disabled={!isReady || isSubmitting}
          className="w-full bg-[#C0601F] px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#A84F18] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Processing $1 Test...' : 'Charge $1 Test Payment'}
        </button>
      </form>
    </div>
  )
}
