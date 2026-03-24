import { useState } from 'react'
import './App.css'
import centeredLogo from './assets/centered_logo.png'
import roulyEp1 from './assets/rouly_ep1.png'
import roulyEp2 from './assets/rouly_ep2.png'
import roulyEp3 from './assets/rouly_ep3.png'
import clibTv1 from './assets/clib_tv1.png'
import clibTv2 from './assets/clib_tv2.png'
import clibTv3 from './assets/clib_tv3.png'
import TheClibLanding from './TheClibLanding'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [shouldBlurPage, setShouldBlurPage] = useState(true)

  return (
    <>
      {showLanding && (
        <TheClibLanding
          onExitStart={() => setShouldBlurPage(false)}
          onFinish={() => setShowLanding(false)}
        />
      )}
      <main className={`only-text ${shouldBlurPage ? 'only-text--masked' : ''}`} aria-label="Chūsha theclib at">
        <div className="title-block">
          <div className="title-text-wrapper">
            <span className="title-text">蟲社The Clib!</span>
            <img src={centeredLogo} alt="蟲社標誌" className="title-logo" />
          </div>
          <section className="description-box" aria-label="Intro description">
            <p>蟲社是一個由四隻蟲組成的立案之演藝團體。</p>
          </section>
        </div>
        <hr className="title-divider" />
        <nav className="link-blocks" aria-label="Primary links">
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
            <span className="link-block__text">🚧zoooooooooo🚧</span>
          </a>
          <hr className="title-divider" />
          <a className="link-block" href="https://heyoli.theclib.com/" target="_blank" rel="noopener noreferrer">
            <span className="link-block__text">OLI你好</span>
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
            <span className="link-block__text">還不存在的第五個成員</span>
          </a>
          <hr className="title-divider" />
          <a className="link-block link-block--algorithm" href="https://algorithm.theclib.com/" target="_blank" rel="noopener noreferrer">
            <span className="link-block__text">蟲社演算法</span>
            <span className="office-tag">Office Space (電影)</span>
            <span className="link-block__text">蟲社互推的好東西</span>
            <span className="linda-tag">琳達！琳達！ (電影)</span>
          </a>
          <hr className="title-divider" />
        </nav>
        <div className="contact-note" aria-label="Contact note">
          <p>oootheclibooo@gmail.com</p>
          <div className="contact-note__social">
            <a href="https://www.instagram.com/oootheclibooo/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <span aria-hidden="true">/</span>
            <a href="https://www.youtube.com/@%E8%9F%B2%E7%A4%BE" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <span aria-hidden="true">/</span>
            <a href="https://theclib.com" target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
