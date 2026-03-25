import { useEffect, useRef, useState } from 'react'
import theClibLogo from './assets/theclib.png'
import './theclibLanding.css'

const MAX_BLOCKS = 350

const createBlock = (id, overrides = {}) => ({
  id,
  x: 40,
  y: 0,
  vx: 2.5,
  vy: 2,
  ...overrides,
})

const randomVelocity = () => {
  const magnitude = 1 + Math.random()
  return (Math.random() > 0.5 ? 1 : -1) * magnitude
}

function TheClibLanding({ onFinish, onExitStart }) {
  const containerRef = useRef(null)
  const primaryBlockRef = useRef(null)
  const frameRef = useRef(null)
  const idRef = useRef(1)
  const [blocks, setBlocks] = useState([createBlock(0)])
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const animate = () => {
      setBlocks((previousBlocks) => {
        const container = containerRef.current
        const baseBlock = primaryBlockRef.current
        if (!container || !baseBlock) return previousBlocks

        const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
        const { width: blockWidth, height: blockHeight } = baseBlock.getBoundingClientRect()

        const clones = []
        const updatedBlocks = previousBlocks.map((block) => {
          let { x, y, vx, vy } = block

          x += vx
          y += vy

          let bounced = false

          if (x <= 0 || x + blockWidth >= containerWidth) {
            vx = -vx
            x = Math.min(Math.max(0, x), containerWidth - blockWidth)
            bounced = true
          }

          if (y <= 0 || y + blockHeight >= containerHeight) {
            vy = -vy
            y = Math.min(Math.max(0, y), containerHeight - blockHeight)
            bounced = true
          }

          if (bounced && block.id === 0 && previousBlocks.length + clones.length < MAX_BLOCKS) {
            clones.push(
              createBlock(idRef.current++, {
                vx: randomVelocity(),
                vy: randomVelocity(),
              }),
            )
          }

          return { ...block, x, y, vx, vy }
        })

        if (!clones.length) return updatedBlocks
        const remainingSlots = Math.max(0, MAX_BLOCKS - updatedBlocks.length)
        if (remainingSlots === 0) return updatedBlocks

        return [...updatedBlocks, ...clones.slice(0, remainingSlots)]
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isExiting || !containerRef.current) return

    const node = containerRef.current
    const handleTransitionEnd = (event) => {
      if (event.target !== node || event.propertyName !== 'opacity') return
      onFinish?.()
    }

    node.addEventListener('transitionend', handleTransitionEnd)
    return () => {
      node.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [isExiting, onFinish])

  const handleClick = () => {
    if (isExiting) return
    setIsExiting(true)
    onExitStart?.()
  }

  return (
    <div
      ref={containerRef}
      className={`theclib-overlay ${isExiting ? 'theclib-overlay--exit' : ''}`}
      onClick={handleClick}
    >
      <div className="theclib-overlay__hint">
        <span>進入</span>
        <span>enter</span>
      </div>
      {blocks.map((block, index) => (
        <div
          key={block.id}
          ref={index === 0 ? primaryBlockRef : null}
          className="theclib-block"
          style={{
            transform: `translate(${block.x}px, ${block.y}px)`,
            zIndex: block.id === 0 ? 2000 : 10,
          }}
        >
          <div className="theclib-badge">
            <img src={theClibLogo} alt="The Clib icon" className="theclib-badge__logo" />
            <div className="theclib-badge__title">蟲社</div>
            <div className="theclib-badge__subtitle">The Clib!</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TheClibLanding
