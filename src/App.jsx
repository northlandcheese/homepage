import { useEffect, useState } from 'react'
import './App.css'
import centeredLogo from './assets/centered_logo.png'
import roulyEp1 from './assets/rouly_ep1.png'
import roulyEp2 from './assets/rouly_ep2.png'
import roulyEp3 from './assets/rouly_ep3.png'
import clibTv1 from './assets/clib_tv1.png'
import clibTv2 from './assets/clib_tv2.png'
import clibTv3 from './assets/clib_tv3.png'
import heyoliLogo from './assets/heyoli.png'
import ctPhoto from './assets/ct_photo.png'
import lPhoto from './assets/l_photo.png'
import jPhoto from './assets/j_photo.png'
import dPhoto from './assets/d_photo.png'
import TheClibLanding from './TheClibLanding'

const getPageFromPath = () => {
  if (window.location.pathname === '/members') {
    return 'members'
  }

  if (window.location.pathname === '/services') {
    return 'services'
  }

  return 'home'
}

const members = [
  {
    name: 'CT',
    role: '攝影、剪輯',
    description: '獅子座。最近被四個人說像淡粉色。',
    photo: ctPhoto
  },
  {
    name: 'L',
    role: '表演藝術、編劇、DJ',
    description: '摩羯座。偏愛出風頭。',
    photo: lPhoto
  },
  {
    name: 'J',
    role: '表演藝術、插畫、魔術',
    description: '牡羊座。今年開始下西洋棋。',
    photo: jPhoto
  },
  {
    name: 'D',
    role: '其他',
    description: '水瓶座。西洋棋高手。',
    photo: dPhoto
  }
]

const services = [
  {
    title: '創作閒聊',
    description: '請我們喝一杯酒'
  },
  {
    title: '蟲社工作坊',
    description: '跟我們一起學習'
  },
  {
    title: '蟲社MEMO',
    description: '請我們看一場演出'
  },
]

const pageSubtitles = {
  home: ['蟲社是一個由四隻蟲組成的立案之演藝團體。'],
  members: ['蟲社的四隻蟲。'],
  services: [
    '蟲社來服務你了',
    '服務請私訊IG洽談或寄信至oootheclibooo@gmail.com'
  ]
}

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [shouldBlurPage, setShouldBlurPage] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)
  const [currentPage, setCurrentPage] = useState(getPageFromPath)
  const emailAddress = 'oootheclibooo@gmail.com'
  const showHomeLinks = currentPage === 'home'
  const showServices = currentPage === 'services'
  const showMembers = currentPage === 'members'
  const pageTitle = currentPage === 'members' ? '成員' : currentPage === 'services' ? '服務項目' : '蟲社The Clib!'
  const pageSubtitle = pageSubtitles[currentPage]

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(emailAddress)
    setHasCopiedEmail(true)
    window.setTimeout(() => setHasCopiedEmail(false), 1600)
  }

  const routeToPage = (event, page) => {
    event.preventDefault()
    const nextPath = page === 'home' ? '/' : `/${page}`
    window.history.pushState({}, '', nextPath)
    setCurrentPage(page)
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showLanding && (
        <TheClibLanding
          onExitStart={() => setShouldBlurPage(false)}
          onFinish={() => setShowLanding(false)}
        />
      )}
      <header className={`top-menu ${shouldBlurPage ? 'top-menu--masked' : ''} ${hasScrolled ? 'top-menu--scrolled' : ''}`}>
        <button
          className={`hamburger-button ${isMenuOpen ? 'hamburger-button--open' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="top-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="top-navigation"
          className={`top-menu__panel ${isMenuOpen ? 'top-menu__panel--open' : ''}`}
          aria-label="Top navigation"
        >
          <a href="/" aria-current={currentPage === 'home' ? 'page' : undefined} onClick={(event) => routeToPage(event, 'home')}>
            首頁
          </a>
          <a href="/members" aria-current={currentPage === 'members' ? 'page' : undefined} onClick={(event) => routeToPage(event, 'members')}>
            成員
          </a>
          <a href="/services" aria-current={currentPage === 'services' ? 'page' : undefined} onClick={(event) => routeToPage(event, 'services')}>
            服務項目
          </a>
        </nav>
      </header>
      <main
        className={`only-text ${showServices ? 'only-text--services' : ''} ${shouldBlurPage ? 'only-text--masked' : ''}`}
        aria-label="Chūsha theclib at"
      >
        <div className="title-block">
          <div className="title-text-wrapper">
            <span className="title-text">{pageTitle}</span>
            <img src={centeredLogo} alt="蟲社標誌" className="title-logo" />
          </div>
          <section className="description-box" aria-label="Intro description">
            {pageSubtitle.map((subtitle) => (
              <p key={subtitle}>{subtitle}</p>
            ))}
          </section>
        </div>
        <hr className="title-divider" />
        {showHomeLinks && (
        <nav className="link-blocks" id="services" aria-label="Primary links">
          <a
            className="link-block"
            href="https://www.youtube.com/watch?v=vO8Tcc6CrlI&list=PL1JrmxNJicuxI11om9ikD7g9M5Z8sU-S2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-block__text">肉呆與歐莉</span>
            <img src={roulyEp1} alt="rouly ep1 cover art" className="link-block__thumb" />
            <div className="rouly_text-stack">
              <span className="rouly_text">遊戲規則🕹️</span>
              <span className="rouly_text">1. 一人15秒</span>
              <span className="rouly_text">2. 一人製作時長最多一週</span>
            </div>
            <div className="rouly_text-stack">
              <span className="rouly_text">3. 遵照順序接龍，嚴禁偷看影片</span>
              <span className="rouly_text">4. 不可推翻過去所有設定</span>
              <span className="rouly_text">5. 遲交一天罰500塊</span>
            </div>
            <img src={roulyEp2} alt="rouly ep2 cover art" className="link-block__thumb" />
            <span className="link-block__text">每月更新</span>
            <img src={roulyEp3} alt="rouly ep3 cover art" className="link-block__thumb" />

          </a>
          <hr className="title-divider" />
          <a
            className="link-block"
            href="https://www.youtube.com/watch?v=aEBg04lisUg&list=PL1JrmxNJicuyfJVP17unr1o4J-V-_faeO"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-block__text">Clib!TV!</span>
            <img src={clibTv1} alt="Clib!TV cover art" className="link-block__thumb" />
            <span className="link-block__text">日常蟲聚的記錄</span>
            <img src={clibTv3} alt="Clib!TV cover art 3" className="link-block__thumb" />
            <span className="link-block__text">不定期更新(許嘉恬快點)</span>
            <img src={clibTv2} alt="Clib!TV cover art 2" className="link-block__thumb" />
          </a>
          <hr className="title-divider" />
          <a className="link-block" href="#" target="_blank" rel="noopener noreferrer">
            <span className="link-block__text">🚧zooooooooooooooooooooooooooooooooo🚧</span>
          </a>
          <hr className="title-divider" />
          <a className="link-block" href="#" target="_blank" rel="noopener noreferrer">
            <span className="link-block__text">🎹德國電子大樂團🎹</span>
          </a>
          <hr className="title-divider" />
          <a className="link-block" href="https://heyoli.theclib.com/" target="_blank" rel="noopener noreferrer">
            <span className="link-block__text">
              OLI你好
            </span>
            <img
                src={heyoliLogo}
                alt="Heyoli logo"
                style={{
                  height: '1.5em',
                  marginLeft: '0.35rem',
                  verticalAlign: 'middle',
                  borderRadius: '10px'
                }}
              />
            <span className="link-block__text">分享最近的想法</span>
            <div className="robot-container robot-container--inline" aria-hidden="true">
              <div className="robot-shape robot-shape--inline">
                <div className="robot-head"></div>
                <div className="robot-upper">
                  <div className="robot-arm"></div>
                  <div className="robot-body">
                    <div className="robot-core"></div>
                  </div>
                  <div className="robot-arm"></div>
                </div>
                <div className="robot-lower">
                  <div className="robot-leg"></div>
                  <div className="robot-leg"></div>
                </div>
              </div>
            </div>
            <span className="link-block__text">目前還不存在的第五個成員</span>
          </a>
          <hr className="title-divider" />
          <a className="link-block link-block--algorithm" href="https://algorithm.theclib.com/" target="_blank" rel="noopener noreferrer">
            <span className="link-block__text">蟲社演算法</span>
            <span className="office-tag">Office Space (電影)</span>
            <span className="link-block__text">幫忙劃個重點</span>
            <span className="linda-tag">琳達！琳達！ (電影)</span>
            <span className="link-block__text">蟲社互推的好東西</span>
          </a>
          <hr className="title-divider" />
        </nav>
        )}
        {showServices && (
          <section className="services-section" aria-label="Services">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </section>
        )}
        {showMembers && (
          <section className="members-section" id="members" aria-label="Members">
            {members.map((member) => (
              <article className="member-card" key={member.name}>
                <img src={member.photo} alt={`${member.name} member portrait`} className="member-card__image-placeholder" />
                <div className="member-card__content">
                  <h2>{member.name}</h2>
                  <p className="member-card__role">{member.role}</p>
                  <p className="member-card__description">{member.description}</p>
                </div>
              </article>
            ))}
          </section>
        )}
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
                <path
                  fill="currentColor"
                  d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.4v2.5H8V13h2.8v8z"
                />
              </svg>
            </a>
            <a href="https://www.youtube.com/@%E8%9F%B2%E7%A4%BE" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8M10 15.1V8.9l5.3 3.1z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="link-block link-block--logo" aria-hidden="true">
          <span className="dashed-line"></span>
        </div>
      </main>
    </>
  )
}

export default App
