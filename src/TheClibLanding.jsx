import { useCallback, useEffect, useRef, useState } from 'react'
import theClibLogo from './assets/theclib.png'
import './theclibLanding.css'

const MAX_BLOCKS = 350

const createBlock = (id, overrides = {}) => ({
  id,
  x: 40,
  y: 0,
  vx: 5,
  vy: 5,
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
  const blocksRef = useRef([createBlock(0)])
  const [blockIds, setBlockIds] = useState(() => blocksRef.current.map((block) => block.id))
  const blockElementsRef = useRef(new Map())
  const dimensionsRef = useRef({
    container: { width: 0, height: 0 },
    block: { width: 0, height: 0 },
  })
  const needsMeasurementRef = useRef(true)
  const [isExiting, setIsExiting] = useState(false)

  const measureDimensions = useCallback(() => {
    const container = containerRef.current
    const baseBlock = primaryBlockRef.current
    if (!container || !baseBlock) return false

    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
    const { width: blockWidth, height: blockHeight } = baseBlock.getBoundingClientRect()

    dimensionsRef.current = {
      container: { width: containerWidth, height: containerHeight },
      block: { width: blockWidth, height: blockHeight },
    }
    needsMeasurementRef.current = false
    return true
  }, [])

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current
      const baseBlock = primaryBlockRef.current
      if (!container || !baseBlock) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      if (needsMeasurementRef.current) {
        const didMeasure = measureDimensions()
        if (!didMeasure) {
          frameRef.current = requestAnimationFrame(animate)
          return
        }
      }

      const {
        container: { width: containerWidth, height: containerHeight },
        block: { width: blockWidth, height: blockHeight },
      } = dimensionsRef.current

      if (containerWidth === 0 || containerHeight === 0 || blockWidth === 0 || blockHeight === 0) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const currentBlocks = blocksRef.current
      const totalBlocks = currentBlocks.length
      const clones = []

      const updatedBlocks = currentBlocks.map((block) => {
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

        if (bounced && block.id === 0 && totalBlocks + clones.length < MAX_BLOCKS) {
          clones.push(
            createBlock(idRef.current++, {
              vx: randomVelocity(),
              vy: randomVelocity(),
            }),
          )
        }

        const node = blockElementsRef.current.get(block.id)
        if (node) {
          node.style.transform = `translate(${x}px, ${y}px)`
        }

        return { ...block, x, y, vx, vy }
      })

      let nextBlocks = updatedBlocks

      if (clones.length) {
        const remainingSlots = Math.max(0, MAX_BLOCKS - updatedBlocks.length)
        if (remainingSlots > 0) {
          const limitedClones = clones.slice(0, remainingSlots)
          nextBlocks = [...updatedBlocks, ...limitedClones]
          setBlockIds((previousIds) => [...previousIds, ...limitedClones.map((clone) => clone.id)])
        }
      }

      blocksRef.current = nextBlocks

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
    const handleResize = () => {
      needsMeasurementRef.current = true
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
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
      {blockIds.map((blockId, index) => {
        const blockData = blocksRef.current.find((block) => block.id === blockId)
        const position = blockData ? { x: blockData.x, y: blockData.y } : { x: 0, y: 0 }
        return (
        <div
          key={blockId}
          ref={(node) => {
            if (node) {
              blockElementsRef.current.set(blockId, node)
              if (blockId === 0) {
                primaryBlockRef.current = node
              }
            } else {
              blockElementsRef.current.delete(blockId)
              if (blockId === 0) {
                primaryBlockRef.current = null
              }
            }
          }}
          className="theclib-block"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: blockId === 0 ? 2000 : 10,
          }}
        >
          <div className="theclib-badge">
            <img src={theClibLogo} alt="The Clib icon" className="theclib-badge__logo" />
            <div className="theclib-badge__title">蟲社</div>
            <div className="theclib-badge__subtitle">The Clib!</div>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default TheClibLanding
