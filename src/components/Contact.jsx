import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../data.js'
import { Icon } from './Icons.jsx'
import useReveal from './useReveal.js'
import ContactCard from './ui/contact-card.jsx'

// EmailJS keys live in .env (VITE_* → exposed to the client, which is fine —
// EmailJS public keys are meant to be public and are domain-restricted).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  useReveal()
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // If keys aren't configured yet, fall back to the visitor's email client
    // so the form still "works" during setup.
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || SERVICE_ID === 'your_service_id') {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section container">
      <header className="section__head reveal">
        <h2 className="section__title">Get In Touch</h2>
      </header>

      <div className="contact reveal">
        <ContactCard />

        <form ref={formRef} className="contact__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="from_name" type="text" required value={form.name} onChange={update('name')} placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="reply_to" type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows="4" required value={form.message} onChange={update('message')} placeholder="Tell me about it..." />
          </div>

          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'} <Icon name="arrow" size={18} />
          </button>

          {status === 'sent' && (
            <p className="form__status form__status--ok" role="status">
              Thanks! Your message has been sent — I’ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="form__status form__status--err" role="alert">
              Something went wrong. Please email me directly at {profile.email}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
