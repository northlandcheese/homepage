import { useEffect, useState } from 'react'

function HeyoliPage({ contactNote }) {
  const [texts, setTexts] = useState([])

  useEffect(() => {
    const loadHeyoliText = async () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase credentials are missing in environment variables.')
        return
      }

      const query = new URLSearchParams({
        select: 'content',
        order: 'created_at.desc',
      })
      const response = await fetch(`${supabaseUrl}/rest/v1/comments_duplicate?${query}`, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      })

      if (!response.ok) {
        console.error('Failed to load Heyoli text', response.status)
        return
      }

      const data = await response.json()
      setTexts(data.map((row) => row.content).filter(Boolean))
    }

    loadHeyoliText()
  }, [])

  return (
    <main className="heyoli-page">
      <p className="heyoli-page__text">{texts.join(' ')}</p>
      {contactNote}
      <div className="link-block link-block--logo" aria-hidden="true">
        <span className="dashed-line"></span>
        <span className="dashed-line dashed-line--second"></span>
      </div>
    </main>
  )
}

export default HeyoliPage
