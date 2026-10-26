import { useEffect, useState } from 'react'

function ClibalgoEntry({ entry }) {
  const content = `${entry.title ?? ''}${entry.category ? ` (${entry.category})` : ''}`

  return (
    <span key={entry.id} className="clibalgo-item">
      <span className="clibalgo-entry">
        {entry.link ? (
          <a href={entry.link} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          content
        )}
      </span>
      {'．'}
    </span>
  )
}

function ClibalgoPage() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const loadEntries = async () => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase credentials are missing in environment variables.')
        return
      }

      const query = new URLSearchParams({
        select: 'id,title,category,link,created_at',
        order: 'created_at.desc',
      })
      const response = await fetch(`${supabaseUrl}/rest/v1/clibalgo?${query}`, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      })

      if (!response.ok) {
        console.error('Failed to load clibalgo rows', response.status)
        return
      }

      setEntries(await response.json())
    }

    loadEntries()
  }, [])

  return (
    <main className="clibalgo-page">
      <h1>蟲社演算法</h1>
      {entries.map((entry) => <ClibalgoEntry key={entry.id} entry={entry} />)}
    </main>
  )
}

export default ClibalgoPage
