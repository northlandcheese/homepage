import { useState } from 'react'

function ContactNote() {
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)
  const emailAddress = 'oootheclibooo@gmail.com'

  const copyEmail = async () => {
    await navigator.clipboard.writeText(emailAddress)
    setHasCopiedEmail(true)
    window.setTimeout(() => setHasCopiedEmail(false), 1600)
  }

  return (
    <div className="contact-note" aria-label="Contact note">
      <button className="contact-note__email" type="button" onClick={copyEmail}>
        {hasCopiedEmail ? 'Copied' : emailAddress}
      </button>
      <div className="contact-note__social">
        <a href="https://www.instagram.com/oootheclibooo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
          </svg>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61578563523698" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.4v2.5H8V13h2.8v8z" />
          </svg>
        </a>
        <a href="https://www.youtube.com/@%E8%9F%B2%E7%A4%BE" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2-.4 7.8-.4c.9-.4 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8M10 15.1V8.9l5.3 3.1z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default ContactNote
