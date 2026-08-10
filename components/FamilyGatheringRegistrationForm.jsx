"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

const shirtSizes = [
  'Youth XS',
  'Youth S',
  'Youth M',
  'Youth L',
  'Youth XL',
  'Adult S',
  'Adult M',
  'Adult L',
  'Adult XL',
  'Adult 2XL',
  'Adult 3XL',
  'Adult 4XL',
  'Adult 5XL',
]

const paymentOptions = [
  {
    value: 'Cash',
    label: 'Cash',
    detail: 'Hand-deliver to Anita Prude.',
  },
  {
    value: 'Money Order',
    label: 'Money Order',
    detail:
      'Hand-deliver or mail to Anita Prude at 1106 11th Ave NW, Aliceville, AL 35442.',
  },
  {
    value: 'CashApp',
    label: 'CashApp',
    detail: 'Send to $AnitaPrude.',
  },
  {
    value: 'Square',
    label: 'Pay Online',
    detail:
      'Pay now using Square by card, Apple Pay, Google Pay, or Cash App Pay when available.',
  },
]

const emptyAdditionalRegistrant = () => ({
  fullName: '',
  age: '',
  tShirtSize: '',
  contactDifferent: false,
  contactName: '',
  contactEmail: '',
  contactPhone: '',
})

let squareScriptPromise = null

function loadSquareScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if (window.Square) {
    return Promise.resolve()
  }

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

function attendeePrice(age) {
  const parsedAge = Number(age)

  if (Number.isNaN(parsedAge) || parsedAge < 0) {
    return 0
  }

  return parsedAge >= 12 ? 50 : 25
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function FormField({ label, children, required = false }) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
        {label}
        {required ? <span className="text-red-300"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-none border border-white/10 bg-white/[0.04] px-4 py-4 text-[#F5F2EB] outline-none transition-all duration-300 placeholder:text-[#8A8377] focus:border-[#C8A96B]/70"
    />
  )
}

function SelectInput({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-none border border-white/10 bg-white/[0.04] px-4 py-4 text-[#F5F2EB] outline-none transition-all duration-300 focus:border-[#C8A96B]/70"
    >
      {children}
    </select>
  )
}

export default function FamilyGatheringRegistrationForm() {
  const squareMethodsRef = useRef({})
  const submitRegistrationRef = useRef(null)
  const squarePaymentHandlerRef = useRef(null)

  const [step, setStep] = useState('registrants')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [squareError, setSquareError] = useState('')
  const [squareLoading, setSquareLoading] = useState(false)
  const [squareAvailable, setSquareAvailable] = useState({
    card: false,
    applePay: false,
    googlePay: false,
    cashAppPay: false,
  })
  const [confirmation, setConfirmation] = useState(null)

  const [primary, setPrimary] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    tShirtSize: '',
  })

  const [additionalRegistrants, setAdditionalRegistrants] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('')

  const attendees = useMemo(() => {
    const primaryAttendee = {
      type: 'Primary',
      fullName: primary.fullName,
      age: primary.age,
      tShirtSize: primary.tShirtSize,
      contactDifferent: false,
      contactName: primary.fullName,
      contactEmail: primary.email,
      contactPhone: primary.phone,
    }

    return [primaryAttendee, ...additionalRegistrants]
  }, [primary, additionalRegistrants])

  const totals = useMemo(() => {
    const adultCount = attendees.filter((attendee) => Number(attendee.age) >= 12)
      .length
    const childCount = attendees.filter(
      (attendee) => attendee.age !== '' && Number(attendee.age) < 12
    ).length
    const totalCost = attendees.reduce(
      (sum, attendee) => sum + attendeePrice(attendee.age),
      0
    )

    return {
      adultCount,
      childCount,
      attendeeCount: attendees.length,
      totalCost,
    }
  }, [attendees])

  const selectedPayment = paymentOptions.find(
    (option) => option.value === paymentMethod
  )

  function updatePrimary(field, value) {
    setPrimary((current) => ({ ...current, [field]: value }))
  }

  function updateAdditional(index, field, value) {
    setAdditionalRegistrants((current) =>
      current.map((registrant, registrantIndex) =>
        registrantIndex === index
          ? { ...registrant, [field]: value }
          : registrant
      )
    )
  }

  function addRegistrant() {
    setAdditionalRegistrants((current) => [
      ...current,
      emptyAdditionalRegistrant(),
    ])
  }

  function removeRegistrant(index) {
    setAdditionalRegistrants((current) =>
      current.filter((_, registrantIndex) => registrantIndex !== index)
    )
  }

  function validateRegistrantInfo() {
    if (
      !primary.fullName ||
      !primary.age ||
      !primary.email ||
      !primary.phone ||
      !primary.tShirtSize
    ) {
      return 'Please complete all required primary registrant fields.'
    }

    const allAdditionalComplete = additionalRegistrants.every((registrant) => {
      const requiredBase =
        registrant.fullName && registrant.age && registrant.tShirtSize

      if (!requiredBase) {
        return false
      }

      if (registrant.contactDifferent) {
        return (
          registrant.contactName &&
          registrant.contactEmail &&
          registrant.contactPhone
        )
      }

      return true
    })

    if (!allAdditionalComplete) {
      return 'Please complete the required information for each additional registrant.'
    }

    const invalidAge = attendees.some((attendee) => {
      const parsedAge = Number(attendee.age)
      return Number.isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120
    })

    if (invalidAge) {
      return 'Please enter a valid age for each registrant.'
    }

    return ''
  }

  function handleRegistrantSubmit(event) {
    event.preventDefault()
    setError('')

    const validationError = validateRegistrantInfo()

    if (validationError) {
      setError(validationError)
      return
    }

    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submitRegistration({ squareSourceId = '', squarePaymentType = '' } = {}) {
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/family-gathering-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primary,
          additionalRegistrants,
          paymentMethod,
          squareSourceId,
          squarePaymentType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration could not be submitted.')
      }

      setConfirmation(data)
      setStep('confirmation')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  submitRegistrationRef.current = submitRegistration

  function readTokenErrors(tokenResult) {
    return tokenResult.errors
      ?.map((tokenError) => tokenError.message)
      .filter(Boolean)
      .join(' ')
  }

  async function payWithSquareMethod(methodKey) {
    setError('')
    const squareMethod = squareMethodsRef.current[methodKey]

    if (!squareMethod) {
      setError('That Square payment method is not available on this device or browser.')
      return
    }

    setIsSubmitting(true)

    try {
      const tokenResult = await squareMethod.tokenize()

      if (tokenResult.status !== 'OK') {
        throw new Error(
          readTokenErrors(tokenResult) ||
            'Square could not verify the selected payment method.'
        )
      }

      const paymentLabels = {
        card: 'Card',
        applePay: 'Apple Pay',
        googlePay: 'Google Pay',
      }

      await submitRegistration({
        squareSourceId: tokenResult.token,
        squarePaymentType: paymentLabels[methodKey] || 'Square',
      })
    } catch (paymentError) {
      setError(paymentError.message)
      setIsSubmitting(false)
    }
  }

  squarePaymentHandlerRef.current = payWithSquareMethod

  async function handleFinalSubmit(event) {
    event.preventDefault()
    setError('')

    if (!paymentMethod) {
      setError('Please select a payment method.')
      return
    }

    if (paymentMethod === 'Square') {
      await payWithSquareMethod('card')
      return
    }

    await submitRegistration()
  }

  useEffect(() => {
    let destroyed = false

    async function destroySquareMethods() {
      const currentMethods = squareMethodsRef.current

      for (const method of Object.values(currentMethods)) {
        try {
          await method?.destroy?.()
        } catch (error) {
          // Ignore Square cleanup errors.
        }
      }

      squareMethodsRef.current = {}
      setSquareAvailable({
        card: false,
        applePay: false,
        googlePay: false,
        cashAppPay: false,
      })
    }

    async function initializeSquare() {
      if (step !== 'payment' || paymentMethod !== 'Square') {
        await destroySquareMethods()
        return
      }

      const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

      if (!appId || !locationId) {
        setSquareError(
          'Square payments are not fully configured yet. Please choose another payment method or try again later.'
        )
        return
      }

      setSquareLoading(true)
      setSquareError('')
      await destroySquareMethods()

      try {
        await loadSquareScript()

        if (!window.Square) {
          throw new Error('Square payment form could not be initialized.')
        }

        const payments = window.Square.payments(appId, locationId)
        const paymentRequest = payments.paymentRequest({
          countryCode: 'US',
          currencyCode: 'USD',
          total: {
            amount: totals.totalCost.toFixed(2),
            label: 'The Family Gathering Registration',
          },
        })

        const available = {
          card: false,
          applePay: false,
          googlePay: false,
          cashAppPay: false,
        }
        const methods = {}

        try {
          const card = await payments.card()
          if (!destroyed) {
            await card.attach('#square-card-container')
            methods.card = card
            available.card = true
          }
        } catch (cardError) {
          console.warn('Square card unavailable:', cardError)
        }

        try {
          const applePay = await payments.applePay(paymentRequest)
          if (!destroyed) {
            methods.applePay = applePay
            available.applePay = true
          }
        } catch (applePayError) {
          console.warn('Apple Pay unavailable:', applePayError)
        }

        try {
          const googlePay = await payments.googlePay(paymentRequest)
          if (!destroyed) {
            await googlePay.attach('#square-google-pay-container', {
              buttonColor: 'black',
              buttonType: 'pay',
            })
            const googlePayTarget = document.getElementById(
              'square-google-pay-container'
            )
            if (googlePayTarget) {
              googlePayTarget.onclick = (event) => {
                event.preventDefault()
                squarePaymentHandlerRef.current?.('googlePay')
              }
            }
            methods.googlePay = googlePay
            available.googlePay = true
          }
        } catch (googlePayError) {
          console.warn('Google Pay unavailable:', googlePayError)
        }

        try {
          const cashAppPay = await payments.cashAppPay(paymentRequest, {
            redirectURL: window.location.href,
            referenceId: 'family-gathering-registration',
          })

          if (!destroyed) {
            cashAppPay.addEventListener('ontokenization', (event) => {
              const { tokenResult, error: cashAppError } = event.detail

              if (cashAppError) {
                setError(
                  cashAppError.message || 'Cash App Pay could not be completed.'
                )
                return
              }

              if (tokenResult?.status === 'OK') {
                submitRegistrationRef.current?.({
                  squareSourceId: tokenResult.token,
                  squarePaymentType: 'Cash App Pay',
                })
                return
              }

              if (tokenResult?.status === 'Cancel') {
                setError('Cash App Pay was canceled before payment was completed.')
                return
              }

              setError(
                readTokenErrors(tokenResult) ||
                  'Cash App Pay could not verify the payment.'
              )
            })

            await cashAppPay.attach('#square-cash-app-pay-container')
            methods.cashAppPay = cashAppPay
            available.cashAppPay = true
          }
        } catch (cashAppPayError) {
          console.warn('Cash App Pay unavailable:', cashAppPayError)
        }

        if (!destroyed) {
          squareMethodsRef.current = methods
          setSquareAvailable(available)

          if (!Object.values(available).some(Boolean)) {
            setSquareError(
              'Square payment methods are not available on this device or browser. Please choose Cash, Money Order, or CashApp.'
            )
          }
        }
      } catch (squareInitializationError) {
        if (!destroyed) {
          setSquareError(
            squareInitializationError.message ||
              'Square payment form could not be loaded.'
          )
        }
      } finally {
        if (!destroyed) {
          setSquareLoading(false)
        }
      }
    }

    initializeSquare()

    return () => {
      destroyed = true
    }
  }, [step, paymentMethod, totals.totalCost])

  if (step === 'confirmation' && confirmation) {
    return (
      <div className="border border-[#C8A96B]/40 bg-[#111111] p-8 md:p-12">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#C8A96B]">
          Registration Submitted
        </p>

        <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">
          {confirmation.primaryName}, your family registration has been received.
        </h2>

        <div className="mb-10 grid gap-4 text-[#D8D3CA] md:grid-cols-2">
          <p>
            <strong className="text-white">Registration ID:</strong>{' '}
            {confirmation.registrationId}
          </p>
          <p>
            <strong className="text-white">Total:</strong>{' '}
            {formatCurrency(confirmation.totalCost)}
          </p>
          <p>
            <strong className="text-white">Registrants:</strong>{' '}
            {confirmation.attendeeCount}
          </p>
          <p>
            <strong className="text-white">Payment Method:</strong>{' '}
            {confirmation.paymentMethod === 'Square'
              ? 'Pay Online'
              : confirmation.paymentMethod}
          </p>
          {confirmation.squarePaymentId ? (
            <p>
              <strong className="text-white">Square Payment ID:</strong>{' '}
              {confirmation.squarePaymentId}
            </p>
          ) : null}
        </div>

        <div className="border border-white/10 bg-white/[0.04] p-6 text-[#F5F2EB]">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
            Payment Instructions
          </p>
          <p className="leading-8">{confirmation.paymentInstructions}</p>

          {confirmation.squareReceiptUrl ? (
            <a
              href={confirmation.squareReceiptUrl}
              className="mt-6 inline-block border border-[#C8A96B] px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#C8A96B] transition-all duration-300 hover:bg-[#C8A96B] hover:text-black"
            >
              View Square Receipt
            </a>
          ) : null}

          {confirmation.warning ? (
            <p className="mt-6 border-l-4 border-yellow-500/70 bg-yellow-500/10 p-4 text-sm leading-7 text-yellow-100">
              {confirmation.warning}
            </p>
          ) : null}
        </div>

        <p className="mt-8 text-sm leading-7 text-[#AFA79B]">
          A confirmation email has been sent to the primary registrant when email
          service is available.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-white/10 bg-white/[0.03] p-6 md:p-10">
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <div
          className={`border p-5 ${
            step === 'registrants'
              ? 'border-[#C8A96B] bg-[#C8A96B]/10'
              : 'border-white/10 bg-white/[0.03]'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
            Step 1
          </p>
          <p className="mt-2 text-lg text-white">Registrant Details</p>
        </div>

        <div
          className={`border p-5 ${
            step === 'payment'
              ? 'border-[#C8A96B] bg-[#C8A96B]/10'
              : 'border-white/10 bg-white/[0.03]'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
            Step 2
          </p>
          <p className="mt-2 text-lg text-white">Review Total & Pay</p>
        </div>

        <div className="border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
            Pricing
          </p>
          <p className="mt-2 text-lg text-white">$50 ages 12+ / $25 under 12</p>
        </div>
      </div>

      {error ? (
        <div className="mb-8 border border-red-300/40 bg-red-500/10 p-5 text-red-100">
          {error}
        </div>
      ) : null}

      {step === 'registrants' ? (
        <form onSubmit={handleRegistrantSubmit} className="space-y-12">
          <section>
            <h2 className="mb-8 font-serif text-3xl text-white">
              Primary Registrant
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Full Name" required>
                <TextInput
                  value={primary.fullName}
                  onChange={(event) =>
                    updatePrimary('fullName', event.target.value)
                  }
                  placeholder="Full name"
                />
              </FormField>

              <FormField label="Age" required>
                <TextInput
                  type="number"
                  min="0"
                  value={primary.age}
                  onChange={(event) => updatePrimary('age', event.target.value)}
                  placeholder="Age"
                />
              </FormField>

              <FormField label="Email Address" required>
                <TextInput
                  type="email"
                  value={primary.email}
                  onChange={(event) =>
                    updatePrimary('email', event.target.value)
                  }
                  placeholder="email@example.com"
                />
              </FormField>

              <FormField label="Phone Number" required>
                <TextInput
                  type="tel"
                  value={primary.phone}
                  onChange={(event) =>
                    updatePrimary('phone', event.target.value)
                  }
                  placeholder="Phone number"
                />
              </FormField>

              <FormField label="Mailing Address">
                <TextInput
                  value={primary.address}
                  onChange={(event) =>
                    updatePrimary('address', event.target.value)
                  }
                  placeholder="Street, city, state, ZIP"
                />
              </FormField>

              <FormField label="T-Shirt Size" required>
                <SelectInput
                  value={primary.tShirtSize}
                  onChange={(event) =>
                    updatePrimary('tShirtSize', event.target.value)
                  }
                >
                  <option value="">Select a size</option>
                  {shirtSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
            </div>
          </section>

          <section>
            <div className="mb-8 flex flex-col gap-4 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-serif text-3xl text-white">
                  Additional Registrants
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-[#AFA79B]">
                  Add each family member you are registering. Contact
                  information is only needed when it differs from the primary
                  registrant.
                </p>
              </div>

              <button
                type="button"
                onClick={addRegistrant}
                className="border border-[#C8A96B] px-6 py-4 text-xs uppercase tracking-[0.22em] text-[#C8A96B] transition-all duration-300 hover:bg-[#C8A96B] hover:text-black"
              >
                Add Person
              </button>
            </div>

            <div className="space-y-8">
              {additionalRegistrants.length === 0 ? (
                <div className="border border-dashed border-white/15 p-8 text-[#AFA79B]">
                  No additional registrants added yet.
                </div>
              ) : null}

              {additionalRegistrants.map((registrant, index) => (
                <div key={index} className="border border-white/10 p-6 md:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h3 className="font-serif text-2xl text-white">
                      Registrant {index + 2}
                    </h3>

                    <button
                      type="button"
                      onClick={() => removeRegistrant(index)}
                      className="text-xs uppercase tracking-[0.2em] text-red-200 transition-all duration-300 hover:text-red-100"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField label="Full Name" required>
                      <TextInput
                        value={registrant.fullName}
                        onChange={(event) =>
                          updateAdditional(index, 'fullName', event.target.value)
                        }
                        placeholder="Full name"
                      />
                    </FormField>

                    <FormField label="Age" required>
                      <TextInput
                        type="number"
                        min="0"
                        value={registrant.age}
                        onChange={(event) =>
                          updateAdditional(index, 'age', event.target.value)
                        }
                        placeholder="Age"
                      />
                    </FormField>

                    <FormField label="T-Shirt Size" required>
                      <SelectInput
                        value={registrant.tShirtSize}
                        onChange={(event) =>
                          updateAdditional(
                            index,
                            'tShirtSize',
                            event.target.value
                          )
                        }
                      >
                        <option value="">Select a size</option>
                        {shirtSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </SelectInput>
                    </FormField>
                  </div>

                  <label className="mt-6 flex items-start gap-3 text-sm leading-7 text-[#D8D3CA]">
                    <input
                      type="checkbox"
                      checked={registrant.contactDifferent}
                      onChange={(event) =>
                        updateAdditional(
                          index,
                          'contactDifferent',
                          event.target.checked
                        )
                      }
                      className="mt-1"
                    />
                    This person has different contact information from the
                    primary registrant.
                  </label>

                  {registrant.contactDifferent ? (
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                      <FormField label="Contact Name" required>
                        <TextInput
                          value={registrant.contactName}
                          onChange={(event) =>
                            updateAdditional(
                              index,
                              'contactName',
                              event.target.value
                            )
                          }
                          placeholder="Contact name"
                        />
                      </FormField>

                      <FormField label="Contact Email" required>
                        <TextInput
                          type="email"
                          value={registrant.contactEmail}
                          onChange={(event) =>
                            updateAdditional(
                              index,
                              'contactEmail',
                              event.target.value
                            )
                          }
                          placeholder="email@example.com"
                        />
                      </FormField>

                      <FormField label="Contact Phone" required>
                        <TextInput
                          type="tel"
                          value={registrant.contactPhone}
                          onChange={(event) =>
                            updateAdditional(
                              index,
                              'contactPhone',
                              event.target.value
                            )
                          }
                          placeholder="Phone number"
                        />
                      </FormField>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end border-t border-white/10 pt-10">
            <button
              type="submit"
              className="bg-[#C8A96B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-[#D7B980]"
            >
              Review Total
            </button>
          </div>
        </form>
      ) : null}

      {step === 'payment' ? (
        <form onSubmit={handleFinalSubmit} className="space-y-10">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="border border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                Total
              </p>
              <p className="mt-3 font-serif text-4xl text-white">
                {formatCurrency(totals.totalCost)}
              </p>
            </div>

            <div className="border border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                Registrants
              </p>
              <p className="mt-3 font-serif text-4xl text-white">
                {totals.attendeeCount}
              </p>
            </div>

            <div className="border border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                12 & Up
              </p>
              <p className="mt-3 font-serif text-4xl text-white">
                {totals.adultCount}
              </p>
            </div>

            <div className="border border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                Under 12
              </p>
              <p className="mt-3 font-serif text-4xl text-white">
                {totals.childCount}
              </p>
            </div>
          </div>

          <section className="border border-white/10 p-6 md:p-8">
            <h2 className="mb-6 font-serif text-3xl text-white">
              Select Payment Method
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer border p-6 transition-all duration-300 ${
                    paymentMethod === option.value
                      ? 'border-[#C8A96B] bg-[#C8A96B]/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-[#C8A96B]/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                      className="mt-1"
                    />
                    <div>
                      <p className="mb-2 text-lg text-white">{option.label}</p>
                      <p className="text-sm leading-7 text-[#AFA79B]">
                        {option.detail}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {paymentMethod === 'Square' ? (
              <div className="mt-8 space-y-6 border border-[#C8A96B]/40 bg-black/20 p-5">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                    Secure Card Payment
                  </p>
                  <div
                    id="square-card-container"
                    className="min-h-[96px] bg-white p-4 text-black"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !squareAvailable.card}
                    className="mt-5 bg-[#C8A96B] px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-[#D7B980] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Pay with Card and Submit'}
                  </button>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                    Wallet Options
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    {squareAvailable.applePay ? (
                      <button
                        type="button"
                        onClick={() => payWithSquareMethod('applePay')}
                        disabled={isSubmitting}
                        className="bg-black px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Apple Pay
                      </button>
                    ) : null}

                    <div
                      id="square-google-pay-container"
                      className={squareAvailable.googlePay ? '' : 'hidden'}
                    />

                    <div
                      id="square-cash-app-pay-container"
                      className={squareAvailable.cashAppPay ? '' : 'hidden'}
                    />
                  </div>

                  {squareLoading ? (
                    <p className="mt-4 text-sm leading-7 text-[#AFA79B]">
                      Loading available Square payment options...
                    </p>
                  ) : null}

                  {!squareLoading &&
                  !squareAvailable.applePay &&
                  !squareAvailable.googlePay &&
                  !squareAvailable.cashAppPay ? (
                    <p className="mt-4 text-sm leading-7 text-[#AFA79B]">
                      Apple Pay, Google Pay, and Cash App Pay only appear when
                      the device, browser, and Square account support them.
                    </p>
                  ) : null}

                  {squareError ? (
                    <p className="mt-4 border border-red-300/40 bg-red-500/10 p-4 text-sm leading-7 text-red-100">
                      {squareError}
                    </p>
                  ) : null}

                  <p className="mt-4 text-sm leading-7 text-[#AFA79B]">
                    Card details and wallet credentials are collected securely by
                    Square. This site receives a one-time payment token, not the
                    buyer's card or wallet credentials.
                  </p>
                </div>
              </div>
            ) : null}

            {selectedPayment && paymentMethod !== 'Square' ? (
              <div className="mt-6 border border-[#C8A96B]/30 bg-[#C8A96B]/10 p-5 text-[#F5F2EB]">
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                  Confirmation Will Show
                </p>
                <p className="leading-7">{selectedPayment.detail}</p>
              </div>
            ) : null}
          </section>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-10 md:flex-row md:justify-between">
            <button
              type="button"
              onClick={() => {
                setStep('registrants')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="border border-white/15 px-8 py-4 text-xs uppercase tracking-[0.22em] text-[#F5F2EB] transition-all duration-300 hover:border-[#C8A96B] hover:text-[#C8A96B]"
            >
              Back to Registrants
            </button>

            {paymentMethod !== 'Square' ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C8A96B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-[#D7B980] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
    </div>
  )
}
