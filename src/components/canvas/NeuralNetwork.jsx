/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useState, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, OrbitControls, Preload, Html } from '@react-three/drei'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { khangPhoto } from '../../assets'

// ── palette ───────────────────────────────────────────────────────────────────
const C_INPUT = new THREE.Color('#00d4ff')
const C_CONV  = new THREE.Color('#915eff')
const C_POOL  = new THREE.Color('#ff6b9d')
const C_FC    = new THREE.Color('#ffb347')
const C_OUT   = new THREE.Color('#ffffff')
const C_OUT_2 = new THREE.Color('#e8e8e8')

// ── layer definitions ─────────────────────────────────────────────────────────
const LAYERS = [
  { type: 'feature', label: 'Input',  sz: 3.0,   w: 0.06, slices: 1,  color: C_INPUT },
  { type: 'feature', label: 'Conv1',  sz: 3.0,   w: 0.12, slices: 2,  color: C_CONV  },
  { type: 'feature', label: 'Conv2',  sz: 3.0,   w: 0.12, slices: 2,  color: C_CONV  },
  { type: 'feature', label: 'Pool1',  sz: 1.5,   w: 0.24, slices: 4,  color: C_POOL  },
  { type: 'feature', label: 'Conv3',  sz: 1.5,   w: 0.24, slices: 4,  color: C_CONV  },
  { type: 'feature', label: 'Conv4',  sz: 1.5,   w: 0.24, slices: 4,  color: C_CONV  },
  { type: 'feature', label: 'Pool2',  sz: 0.75,  w: 0.48, slices: 8,  color: C_POOL  },
  { type: 'feature', label: 'Conv5',  sz: 0.75,  w: 0.48, slices: 8,  color: C_CONV  },
  { type: 'feature', label: 'Conv6',  sz: 0.75,  w: 0.48, slices: 8,  color: C_CONV  },
  { type: 'feature', label: 'Pool3',  sz: 0.375, w: 0.96, slices: 16, color: C_POOL  },
  { type: 'fc',      label: 'FC-1',   nodes: 8,  color: C_FC  },
  { type: 'fc',      label: 'FC-2',   nodes: 6,  color: C_FC  },
  { type: 'out',     label: 'Out',    nodes: 2,  color: C_OUT },
]

const LAYER_GAP   = 0.32
const SLICE_INSET = 0.92
const NODE_R      = 0.11
const NODE_GAP    = 0.38

// ── perf heuristic ────────────────────────────────────────────────────────────
function detectLowEndDevice() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true
    const cores = navigator.hardwareConcurrency
    if (typeof cores === 'number' && cores > 0 && cores < 4) return true
    const mem = navigator.deviceMemory
    if (typeof mem === 'number' && mem > 0 && mem < 4) return true
    if (window.matchMedia?.('(pointer: coarse)').matches &&
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '')) return true
  } catch { /* feature detection failed — assume not low-end */ }
  return false
}

// ── easing ────────────────────────────────────────────────────────────────────
function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
function clamp01(v) { return Math.max(0, Math.min(1, v)) }

// ── layout ────────────────────────────────────────────────────────────────────
function buildLayout() {
  const rawXs = []
  let x = 0
  LAYERS.forEach(l => {
    rawXs.push(x + (l.type === 'feature' ? l.w / 2 : NODE_R))
    if (l.type === 'feature') x += l.w + LAYER_GAP
    else                      x += NODE_R * 2 + LAYER_GAP
  })
  const totalW      = x - LAYER_GAP
  const xs          = rawXs.map(v => v - totalW / 2)
  const feats       = LAYERS.filter(l => l.type === 'feature')
  const fcs         = LAYERS.filter(l => l.type !== 'feature')
  const maxSz       = Math.max(...feats.map(l => l.sz))
  const maxFCHeight = Math.max(0, ...fcs.map(l => (l.nodes - 1) * NODE_GAP + NODE_R * 2))
  const tilt        = 0.22
  const rawH        = Math.max(maxSz, maxFCHeight) * Math.cos(tilt) + maxSz * Math.sin(tilt) + 0.4
  const rawW        = totalW + 1.0
  return { xs, totalW, rawW, rawH }
}

// ── InputLayer: photo on a double-sided plane ────────────────────────────────
function InputLayer({ x, sz, flyInDelay = 0, flyInDuration = 1.4 }) {
  const [tex, setTex] = useState(null)
  const groupRef     = useRef()
  const prog         = useRef(0)
  const startedRef   = useRef(false)

  useEffect(() => {
    new THREE.TextureLoader().load(khangPhoto, t => {
      t.colorSpace = THREE.SRGBColorSpace
      setTex(t)
    })
  }, [])

  useEffect(() => {
    const id = setTimeout(() => { startedRef.current = true }, flyInDelay * 1000)
    return () => clearTimeout(id)
  }, [flyInDelay])

  // Fly-in: starts at world origin at scale 1.6 and eases to its final x at scale 1.
  useFrame((_, delta) => {
    if (!groupRef.current || !startedRef.current) return
    prog.current = Math.min(prog.current + delta / flyInDuration, 1)
    const e = easeOutBack(prog.current)
    groupRef.current.position.x = x * e
    const s = 1.6 + (1 - 1.6) * e
    groupRef.current.scale.setScalar(s)
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.6}>
      <mesh>
        <boxGeometry args={[0.01, sz, sz]} />
        <meshBasicMaterial color={C_INPUT} wireframe transparent opacity={0.5} />
      </mesh>
      {tex && (
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[sz, sz]} />
          <meshBasicMaterial map={tex} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}

// ── AnimatedSlab ──────────────────────────────────────────────────────────────
function AnimatedSlab({ fromX, toX, sliceThickness, sz, color, delay }) {
  const meshRef = useRef()
  const wireRef = useRef()
  const prog    = useRef(0)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  useFrame((_, delta) => {
    if (!go || !meshRef.current) return
    prog.current = Math.min(prog.current + delta / 0.5, 1)
    const cx = fromX + (toX - fromX) * easeOutBack(prog.current)
    meshRef.current.position.x = cx
    if (wireRef.current) wireRef.current.position.x = cx
    meshRef.current.material.opacity = clamp01(prog.current * 4)
    if (prog.current >= 1)
      meshRef.current.material.emissiveIntensity =
        0.18 + 0.18 * Math.abs(Math.sin(Date.now() * 0.0013))
  })

  if (!go) return null
  return (
    <>
      <mesh ref={meshRef} position={[fromX, 0, 0]}>
        <boxGeometry args={[sliceThickness, sz, sz]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25}
          transparent opacity={0} roughness={0.3} metalness={0.45} />
      </mesh>
      <mesh ref={wireRef} position={[fromX, 0, 0]}>
        <boxGeometry args={[sliceThickness, sz, sz]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </>
  )
}

// ── FeatureLayer ──────────────────────────────────────────────────────────────
function FeatureLayer({ layerDef, x, prevX, globalDelay }) {
  const { sz, w, slices, color } = layerDef
  const sliceThickness = (w / slices) * SLICE_INSET
  const step  = w / slices
  const start = x - w / 2 + step / 2
  return (
    <>
      {Array.from({ length: slices }, (_, i) => {
        const sliceX = start + i * step
        return (
          <AnimatedSlab key={i}
            fromX={prevX != null ? prevX : sliceX - 2.0}
            toX={sliceX}
            sliceThickness={sliceThickness}
            sz={sz} color={color}
            delay={globalDelay + i * 0.07}
          />
        )
      })}
    </>
  )
}

// ── AnimatedNode ──────────────────────────────────────────────────────────────
function AnimatedNode({ position, color, delay, nodeIdx,
                        emissiveOverride = null, opacityScale = 1 }) {
  const ref  = useRef()
  const prog = useRef(0)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  useFrame((_, delta) => {
    if (!go || !ref.current) return
    prog.current = Math.min(prog.current + delta / 0.38, 1)
    ref.current.scale.setScalar(easeOutBack(prog.current))
    ref.current.material.opacity = clamp01(prog.current * 3) * opacityScale
    const base = emissiveOverride != null ? emissiveOverride
      : 0.35 + 0.35 * Math.abs(Math.sin(Date.now() * 0.0014 + nodeIdx * 0.7))
    if (prog.current >= 1) ref.current.material.emissiveIntensity = base
  })

  if (!go) return null
  return (
    <mesh ref={ref} position={position} scale={0}>
      <sphereGeometry args={[NODE_R, 14, 14]} />
      <meshStandardMaterial color={color} emissive={color}
        emissiveIntensity={0.4} transparent opacity={0}
        roughness={0.3} metalness={0.5} />
    </mesh>
  )
}

// ── FCLayer ───────────────────────────────────────────────────────────────────
function FCLayer({ layerDef, x, layerIdx, globalDelay }) {
  const { nodes, color } = layerDef
  return (
    <>
      {Array.from({ length: nodes }, (_, i) => {
        // Node i=0 sits at the BOTTOM of the column (y = -...). To make nodes
        // appear top-to-bottom, give the topmost node (i = nodes-1) the
        // smallest delay and the bottommost (i = 0) the largest.
        const orderFromTop = (nodes - 1) - i
        return (
          <AnimatedNode key={i}
            position={[x, (i - (nodes - 1) / 2) * NODE_GAP, 0]}
            color={color}
            delay={globalDelay + orderFromTop * 0.07}
            nodeIdx={i + layerIdx * 10}
          />
        )
      })}
    </>
  )
}

// ── OutputLayer: Khang on top (positive y), Not Khang below ──────────────────
// Labels appear together with their node using DelayedLabel
function DelayedLabel({ position, label, isKhang, delay }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    // label appears slightly after the node finishes popping in (~0.38s)
    const t = setTimeout(() => setShow(true), (delay + 0.45) * 1000)
    return () => clearTimeout(t)
  }, [delay])

  if (!show) return null
  return (
    <Html position={position} center={false} style={{ pointerEvents: 'none' }}>
      <span style={{
        color:      isKhang ? C_OUT : C_OUT_2,
        fontSize:   isKhang ? 'clamp(12px, 1.8vw, 36px)' : 'clamp(9px, 1.4vw, 28px)',
        fontWeight: isKhang ? 700 : 500,
        whiteSpace: 'nowrap',
        textShadow: isKhang ? '0 0 10px #915eff' : 'none',
        opacity:    isKhang ? 1.0 : 0.3,
        fontFamily: 'monospace',
      }}>{label}</span>
    </Html>
  )
}

function OutputLayer({ x, delay }) {
  // index 0 = Khang (top, positive y), index 1 = Not Khang (bottom)
  const items = [
    { label: 'Khang',     color: C_OUT, emissive: 1.2,  opacityScale: 1.0,  y: +NODE_GAP / 2 },
    { label: 'Not Khang', color: C_OUT_2,  emissive: 0.08, opacityScale: 0.5, y: -NODE_GAP / 2 },
  ]
  return (
    <>
      {items.map((item, i) => (
        <group key={i}>
          <AnimatedNode
            position={[x, item.y, 0]}
            color={item.color}
            delay={delay + i * 0.15}
            nodeIdx={i + 100}
            emissiveOverride={item.emissive}
            opacityScale={item.opacityScale}
          />
          <DelayedLabel
            position={[x + NODE_R + 0.15, item.y + 0.12, 0]}
            label={item.label}
            isKhang={i === 0}
            delay={delay + i * 0.15}
          />
        </group>
      ))}
    </>
  )
}

// ── ConvBeam (from old version) ───────────────────────────────────────────────
function ConvBeam({ fromX, toX, fromSz, toSz, color, delay, count = 2 }) {
  const refs     = useRef([])
  const startRef = useRef(0)
  const [go, setGo] = useState(false)

  const packets = useMemo(() => {
    const fromHalf = fromSz / 2
    const toHalf   = toSz   / 2
    const rand = (half) => (Math.random() * 2 - 1) * half * 0.8
    return Array.from({ length: count }, (_, i) => ({
      offset: -i / count, speed: 0.22 + (i % 3) * 0.04,
      fy: rand(fromHalf), fz: rand(fromHalf),
      ty: rand(toHalf),   tz: rand(toHalf),
      lastT: 1, fromHalf, toHalf,
    }))
  }, [count, fromSz, toSz])

  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  useFrame(({ clock }) => {
    if (!go) return
    if (!startRef.current) startRef.current = clock.getElapsedTime()
    const time = clock.getElapsedTime() - startRef.current
    packets.forEach((p, i) => {
      const m = refs.current[i]
      if (!m) return
      const raw = time * p.speed + p.offset
      const t   = ((raw % 1) + 1) % 1
      if (t < p.lastT) {
        const rand = (half) => (Math.random() * 2 - 1) * half * 0.8
        p.fy = rand(p.fromHalf); p.fz = rand(p.fromHalf)
        p.ty = rand(p.toHalf);   p.tz = rand(p.toHalf)
      }
      p.lastT = t
      m.visible = raw >= 0
      if (!m.visible) return
      m.position.set(
        fromX + (toX - fromX) * t,
        p.fy  + (p.ty - p.fy) * t,
        p.fz  + (p.tz - p.fz) * t,
      )
      const fade = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1
      m.material.opacity = fade
    })
  })

  if (!go) return null
  return (
    <>
      {packets.map((_, i) => (
        <mesh key={i} ref={el => (refs.current[i] = el)}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0} />
        </mesh>
      ))}
    </>
  )
}

// ── FlattenSkeleton (from old version) ───────────────────────────────────────
function FlattenSkeleton({ fromXLeft, fromXRight, fromSz, sliceCount,
                            toX, fcCount, color, delay, animated = true }) {
  const refs     = useRef([])
  const startRef = useRef(0)
  const [visible, setVisible] = useState(false)

  const lines = useMemo(() => {
    const half = fromSz / 2
    const fcSpan = (fcCount - 1) * NODE_GAP
    return [
      { sx: fromXLeft,  sy: -half, sz: +half, tx: toX, ty: -fcSpan / 2, tz: 0 },
      { sx: fromXLeft,  sy: -half, sz: -half, tx: toX, ty: -fcSpan / 2, tz: 0 },
      { sx: fromXRight, sy: +half, sz: +half, tx: toX, ty: +fcSpan / 2, tz: 0 },
      { sx: fromXRight, sy: +half, sz: -half, tx: toX, ty: +fcSpan / 2, tz: 0 },
    ]
  }, [fromXLeft, fromXRight, fromSz, toX, fcCount])

  const sparks = useMemo(() => {
    if (sliceCount < 1) return []
    const n = Math.min(2, sliceCount)
    const sliceX = (i) => sliceCount === 1
      ? (fromXLeft + fromXRight) / 2
      : fromXLeft + (fromXRight - fromXLeft) * (i / (sliceCount - 1))
    const fcYForSlice = (i) => {
      const frac = sliceCount === 1 ? 0.5 : i / (sliceCount - 1)
      return (frac * (fcCount - 1) - (fcCount - 1) / 2) * NODE_GAP
    }
    return Array.from({ length: n }, (_, j) => {
      const i = Math.floor(Math.random() * sliceCount)
      return { sx: sliceX(i), ny: fcYForSlice(i), offset: -j / n, speed: 0.32, lastT: 1 }
    })
  }, [sliceCount, fcCount, fromXLeft, fromXRight])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  useFrame(({ clock }) => {
    if (!visible || !animated) return
    if (!startRef.current) startRef.current = clock.getElapsedTime()
    const time = clock.getElapsedTime() - startRef.current
    const sliceX = (i) => sliceCount === 1
      ? (fromXLeft + fromXRight) / 2
      : fromXLeft + (fromXRight - fromXLeft) * (i / (sliceCount - 1))
    const fcYForSlice = (i) => {
      const frac = sliceCount === 1 ? 0.5 : i / (sliceCount - 1)
      return (frac * (fcCount - 1) - (fcCount - 1) / 2) * NODE_GAP
    }
    sparks.forEach((s, i) => {
      const m = refs.current[i]
      if (!m) return
      const raw = time * s.speed + s.offset
      const t   = ((raw % 1) + 1) % 1
      if (t < s.lastT) {
        const si = Math.floor(Math.random() * sliceCount)
        s.sx = sliceX(si); s.ny = fcYForSlice(si)
      }
      s.lastT = t
      m.visible = raw >= 0
      if (!m.visible) return
      m.position.set(s.sx + (toX - s.sx) * t, 0 + (s.ny - 0) * t, 0)
      const fade = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1
      m.material.opacity = fade
    })
  })

  if (!visible) return null
  return (
    <>
      {lines.map((l, i) => (
        <Line key={i}
          points={[[l.sx, l.sy, l.sz], [l.tx, l.ty, l.tz]]}
          color={color} lineWidth={1} dashed dashSize={0.08} gapSize={0.06}
          transparent opacity={0.45} />
      ))}
      {animated && sparks.map((_, i) => (
        <mesh key={`s-${i}`} ref={el => (refs.current[i] = el)}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0} />
        </mesh>
      ))}
    </>
  )
}

// ── FCLines ───────────────────────────────────────────────────────────────────
function FCLines({ fromCount, toCount, fromX, toX, color, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  const segments = useMemo(() => {
    const pts = []
    for (let fi = 0; fi < fromCount; fi++)
      for (let ti = 0; ti < toCount; ti++)
        pts.push(fromX, (fi - (fromCount-1)/2)*NODE_GAP, 0,
                 toX,   (ti - (toCount -1)/2)*NODE_GAP, 0)
    return new Float32Array(pts)
  }, [fromCount, toCount, fromX, toX])

  if (!visible) return null
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"
          array={segments} count={segments.length/3} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.16} />
    </lineSegments>
  )
}

// ── FCParticles: fully random source/target nodes per cycle ─────────────────
function FCParticles({ fromCount, toCount, fromX, toX, delay,
                       maxCount = 2, toOutputOnly = false, color = C_OUT }) {
  const nodeY = (idx, count) => (idx - (count - 1) / 2) * NODE_GAP

  const particleData = useMemo(() => {
    const n = Math.min(maxCount, fromCount)
    return Array.from({ length: n }, (_, j) => ({
      fy:     nodeY(Math.floor(Math.random() * fromCount), fromCount),
      ty:     toOutputOnly ? +NODE_GAP / 2
                           : nodeY(Math.floor(Math.random() * toCount), toCount),
      offset: -j / n,
      speed:  0.28 + j * 0.04,
      lastT:  1,
    }))
  }, [fromCount, toCount, maxCount, toOutputOnly])

  const startRef = useRef(0)
  const refs     = useRef([])
  const [go, setGo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  useFrame(({ clock }) => {
    if (!go) return
    if (!startRef.current) startRef.current = clock.getElapsedTime()
    const time = clock.getElapsedTime() - startRef.current
    particleData.forEach((p, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      const raw = time * p.speed + p.offset
      const t   = ((raw % 1) + 1) % 1
      // Cycle wrap → re-roll random source/target.
      if (t < p.lastT) {
        p.fy = nodeY(Math.floor(Math.random() * fromCount), fromCount)
        p.ty = toOutputOnly
          ? +NODE_GAP / 2
          : nodeY(Math.floor(Math.random() * toCount), toCount)
      }
      p.lastT = t
      mesh.visible = raw >= 0
      if (!mesh.visible) return
      mesh.position.set(
        fromX + (toX - fromX) * t,
        p.fy  + (p.ty - p.fy) * t,
        0
      )
      mesh.material.emissiveIntensity = 0.6 + 0.4 * Math.sin(clock.getElapsedTime() * 5 + i)
    })
  })

  if (!go) return null
  return (
    <>
      {particleData.map((_, i) => (
        <mesh key={i} ref={el => (refs.current[i] = el)}>
          <sphereGeometry args={[0.033, 7, 7]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
        </mesh>
      ))}
    </>
  )
}

// ── Full CNN scene ────────────────────────────────────────────────────────────
function CNNScene({ started }) {
  const groupRef = useRef()
  const { xs }   = useMemo(() => buildLayout(), [])
  const lowEnd   = useMemo(() => detectLowEndDevice(), [])

  const layerDelays = useMemo(() => {
    // Input has its own fly-in (~1.4s). Other layers should start appearing
    // shortly after the Input begins flying in, with snappy per-layer pacing.
    let t = 0.5
    return LAYERS.map(l => {
      const d = t
      t += (l.type === 'feature' ? l.slices * 0.04 : l.nodes * 0.035) + 0.10
      return d
    })
  }, [])

  const allFCOut = useMemo(() =>
    LAYERS.map((l, i) => ({ ...l, i })).filter(l => l.type === 'fc' || l.type === 'out'), [])
  const fcOnly   = allFCOut.filter(l => l.type === 'fc')
  const outLayer = allFCOut.find(l => l.type === 'out')
  const lastFC   = fcOnly[fcOnly.length - 1]

  const featurePairs = useMemo(() => {
    const feats = LAYERS.map((l, i) => ({ ...l, i })).filter(l => l.type === 'feature')
    return feats.slice(0, -1).map((a, k) => [a, feats[k + 1]])
  }, [])

  const flattenLink = useMemo(() => {
    const feats = LAYERS.map((l, i) => ({ ...l, i })).filter(l => l.type === 'feature')
    const fcs   = LAYERS.map((l, i) => ({ ...l, i })).filter(l => l.type !== 'feature')
    if (!feats.length || !fcs.length) return null
    return { from: feats[feats.length - 1], to: fcs[0] }
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = 0.18 + Math.sin(clock.getElapsedTime() * 0.08) * 0.04
  })

  return (
    <group ref={groupRef}>
      {/* Feature layers (Input + others) — only after click */}
      {started && <InputLayer x={xs[0]} sz={LAYERS[0].sz} flyInDelay={0} flyInDuration={1.4} />}
      {started && LAYERS.map((layer, i) => {
        if (layer.type !== 'feature' || i === 0) return null
        return (
          <FeatureLayer key={i} layerDef={layer} x={xs[i]}
            prevX={xs[i - 1]} globalDelay={layerDelays[i]} />
        )
      })}

      {started && (
        <>
          {/* FC layers */}
          {fcOnly.map(({ i, ...layer }) => (
            <FCLayer key={i} layerDef={layer} x={xs[i]}
              layerIdx={i} globalDelay={layerDelays[i]} />
          ))}

          {/* Output layer — Khang top, Not Khang bottom */}
          {outLayer && (
            <OutputLayer x={xs[outLayer.i]} delay={layerDelays[outLayer.i]} />
          )}

          {/* FC→FC lines + particles — colored by the source FC layer
              (i.e. the previous layer relative to the destination) */}
          {fcOnly.slice(0, -1).map((la, idx) => {
            const lb = fcOnly[idx + 1]
            const d  = layerDelays[lb.i]
            return (
              <group key={idx}>
                <FCLines fromCount={la.nodes} toCount={lb.nodes}
                  fromX={xs[la.i]} toX={xs[lb.i]} color={C_FC} delay={d} />
                {!lowEnd && (
                  <FCParticles fromCount={la.nodes} toCount={lb.nodes}
                    fromX={xs[la.i]} toX={xs[lb.i]}
                    delay={d + 0.2} maxCount={2} color={la.color} />
                )}
              </group>
            )
          })}

          {/* Last FC → output: particles only to Khang (top), colored by the
              source (last FC) layer */}
          {lastFC && outLayer && (
            <group>
              <FCLines fromCount={lastFC.nodes} toCount={outLayer.nodes}
                fromX={xs[lastFC.i]} toX={xs[outLayer.i]} color={C_FC}
                delay={layerDelays[outLayer.i]} />
              {!lowEnd && (
                <FCParticles fromCount={lastFC.nodes} toCount={outLayer.nodes}
                  fromX={xs[lastFC.i]} toX={xs[outLayer.i]}
                  delay={layerDelays[outLayer.i] + 0.2}
                  maxCount={2} toOutputOnly={true} color={lastFC.color} />
              )}
            </group>
          )}

          {/* Flatten skeleton */}
          {flattenLink && (() => {
            const f    = flattenLink.from
            const step = f.w / f.slices
            return (
              <FlattenSkeleton
                fromXLeft={xs[f.i] - f.w / 2 + step / 2}
                fromXRight={xs[f.i] + f.w / 2 - step / 2}
                fromSz={f.sz} sliceCount={f.slices}
                toX={xs[flattenLink.to.i]} fcCount={flattenLink.to.nodes}
                color={C_FC} delay={layerDelays[flattenLink.to.i]}
                animated={!lowEnd} />
            )
          })()}

          {/* ConvBeams between adjacent feature layers — colored by SOURCE layer */}
          {!lowEnd && featurePairs.map(([a, b], idx) => (
            <ConvBeam key={idx}
              fromX={xs[a.i] - a.w / 2}
              toX={xs[b.i]   + b.w / 2}
              fromSz={a.sz} toSz={b.sz}
              color={a.color}
              delay={layerDelays[b.i] + 0.5}
              count={2} />
          ))}
        </>
      )}
    </group>
  )
}

// ── CameraFitter ──────────────────────────────────────────────────────────────
function CameraFitter() {
  const { camera, size } = useThree()
  const { rawW, rawH }   = useMemo(() => buildLayout(), [])

  useLayoutEffect(() => {
    const aspect = size.width / size.height
    const fovRad = (camera.fov * Math.PI) / 180
    const zForH  = (rawH / 2) / Math.tan(fovRad / 2) / 0.80
    const zForW  = (rawW / 2) / (Math.tan(fovRad / 2) * aspect) / 0.80
    camera.position.set(0, 0, Math.max(zForH, zForW))
    camera.lookAt(0, 0, 0)
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, rawW, rawH])

  return null
}

// ── Canvas export ─────────────────────────────────────────────────────────────
const NeuralNetworkCanvas = ({ phase }) => (
  <Canvas frameloop="always"
    camera={{ position: [0, 0, 20], fov: 45 }}
    gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
    style={{ background: 'transparent', width: '100%', height: '100%' }}
  >
    <ambientLight intensity={0.55} />
    <pointLight position={[6, 6, 6]}    intensity={1.2} />
    <pointLight position={[-6, -4, -6]} intensity={0.45} color="#915eff" />
    <directionalLight position={[0, 5, 3]} intensity={0.55} />
    <CameraFitter />
    <CNNScene started={phase === 'cnn'} />
    <OrbitControls enableZoom={false} enablePan={false}
      enableRotate={phase === 'cnn'} rotateSpeed={0.55} />
    <Preload all />
  </Canvas>
)

// ── Intro overlay ─────────────────────────────────────────────────────────────
export function IntroOverlay({ onStart, visible }) {
  const [ripple, setRipple]     = useState(0)
  const [morphing, setMorphing] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setRipple(r => r + 1), 1400)
    return () => clearInterval(id)
  }, [])

  // Reset morph state whenever the overlay becomes visible again (e.g. after restart),
  // otherwise the photo would stay faded/squared from the previous run.
  useEffect(() => {
    if (visible) setMorphing(false)
  }, [visible])

  const handleClick = () => {
    if (morphing) return
    setMorphing(true)
    setTimeout(() => onStart?.(), 380)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
      gap: '1rem',
    }}>
      <style>{`
        @keyframes ripple-out {
          0%   { transform: scale(1);   opacity: 0.65; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .nn-ripple {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 2px solid #915eff;
          animation: ripple-out 1.4s ease-out forwards;
          pointer-events: none;
        }
        .nn-photo-wrap { transition: transform 0.2s, box-shadow 0.2s; }
        .nn-photo-wrap:hover {
          transform: scale(1.05);
          box-shadow: 0 0 32px #915effaa !important;
        }
        @keyframes morph-to-square {
          0%   { border-radius: 50%; transform: scale(1);    opacity: 1; }
          55%  { border-radius: 6%;  transform: scale(0.9);  opacity: 1; }
          100% { border-radius: 2%;  transform: scale(0.55); opacity: 0; }
        }
        .nn-photo-wrap.morphing {
          animation: morph-to-square 0.55s cubic-bezier(.6,.05,.4,1) forwards;
        }
        .nn-text-fade.morphing { animation: fade-out 0.35s forwards; }
        @keyframes fade-out { to { opacity: 0; } }
      `}</style>

      {/* question — above, outside the image */}
      <p className={`nn-text-fade ${morphing ? 'morphing' : ''}`} style={{
        color: '#c4b5fd',
        fontSize: 'clamp(14px, 2vw, 20px)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textAlign: 'center',
        textShadow: '0 0 14px #915eff',
        margin: 0,
        pointerEvents: 'none',
        maxWidth: '80vw',
      }}>
        That&apos;s me — but how does FaceID know that?
      </p>

      {/* ripple container + photo */}
      <div style={{ position: 'relative', pointerEvents: 'auto' }}
        onClick={handleClick}>
        {/* ripple rings — hidden during morph */}
        {!morphing && <div className="nn-ripple" key={ripple} />}

        {/* circular photo — morphs into a square then fades as the 3D Input flies in */}
        <div className={`nn-photo-wrap ${morphing ? 'morphing' : ''}`} style={{
          width:        'clamp(120px, min(80vw, 80vh), 260px)',
          height:       'clamp(120px, min(80vw, 80vh), 260px)',
          borderRadius: '50%',
          overflow:     'hidden',
          border:       '3px solid #915eff',
          boxShadow:    '0 0 20px #915eff88',
          cursor:       'pointer',
          position:     'relative',
          zIndex:       1,
        }}>
          <img src={khangPhoto} alt="Khang"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* hint — below, outside the image */}
      <p className={`nn-text-fade ${morphing ? 'morphing' : ''}`} style={{
        color:         '#a78bfa',
        fontSize:      'clamp(11px, 1.2vw, 14px)',
        letterSpacing: '0.08em',
        margin:        0,
        pointerEvents: 'none',
      }}>
        Click to see how a machine sees me ✨
      </p>
    </div>
  )
}

// ── RestartButton ─────────────────────────────────────────────────────────────
export function RestartButton({ visible, onRestart }) {
  if (!visible) return null
  return (
    <button
      onClick={onRestart}
      style={{
        position:       'absolute',
        bottom:         '16px',
        left:           '50%',
        transform:      'translateX(-50%)',
        zIndex:         11,
        pointerEvents:  'auto',
        padding:        '6px 14px',
        fontSize:       '12px',
        fontFamily:     'monospace',
        letterSpacing:  '0.08em',
        color:          '#c4b5fd',
        background:     'rgba(20, 12, 40, 0.55)',
        border:         '1px solid #915eff',
        borderRadius:   '999px',
        cursor:         'pointer',
        boxShadow:      '0 0 12px #915eff66',
        backdropFilter: 'blur(4px)',
        transition:     'transform 0.15s, box-shadow 0.15s, background 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform  = 'translateX(-50%) scale(1.05)'
        e.currentTarget.style.boxShadow  = '0 0 18px #915effaa'
        e.currentTarget.style.background = 'rgba(40, 20, 70, 0.7)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform  = 'translateX(-50%) scale(1)'
        e.currentTarget.style.boxShadow  = '0 0 12px #915eff66'
        e.currentTarget.style.background = 'rgba(20, 12, 40, 0.55)'
      }}
    >
      ↻ run it again
    </button>
  )
}

// ── PropTypes ───────────────────────────────────────────────────────────────────────────────
const layerDefShape = PropTypes.shape({
  type:   PropTypes.string,
  label:  PropTypes.string,
  sz:     PropTypes.number,
  w:      PropTypes.number,
  slices: PropTypes.number,
  nodes:  PropTypes.number,
  color:  PropTypes.object,
})

InputLayer.propTypes = {
  x:             PropTypes.number.isRequired,
  sz:            PropTypes.number.isRequired,
  flyInDelay:    PropTypes.number,
  flyInDuration: PropTypes.number,
}

AnimatedSlab.propTypes = {
  fromX:          PropTypes.number.isRequired,
  toX:            PropTypes.number.isRequired,
  sliceThickness: PropTypes.number.isRequired,
  sz:             PropTypes.number.isRequired,
  color:          PropTypes.object.isRequired,
  delay:          PropTypes.number.isRequired,
}

FeatureLayer.propTypes = {
  layerDef:    layerDefShape.isRequired,
  x:           PropTypes.number.isRequired,
  prevX:       PropTypes.number,
  globalDelay: PropTypes.number.isRequired,
}

AnimatedNode.propTypes = {
  position:         PropTypes.arrayOf(PropTypes.number).isRequired,
  color:            PropTypes.object.isRequired,
  delay:            PropTypes.number.isRequired,
  nodeIdx:          PropTypes.number.isRequired,
  emissiveOverride: PropTypes.number,
  opacityScale:     PropTypes.number,
}

FCLayer.propTypes = {
  layerDef:    layerDefShape.isRequired,
  x:           PropTypes.number.isRequired,
  layerIdx:    PropTypes.number.isRequired,
  globalDelay: PropTypes.number.isRequired,
}

DelayedLabel.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  label:    PropTypes.string.isRequired,
  isKhang:  PropTypes.bool,
  delay:    PropTypes.number.isRequired,
}

OutputLayer.propTypes = {
  x:     PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
}

ConvBeam.propTypes = {
  fromX:  PropTypes.number.isRequired,
  toX:    PropTypes.number.isRequired,
  fromSz: PropTypes.number.isRequired,
  toSz:   PropTypes.number.isRequired,
  color:  PropTypes.object.isRequired,
  delay:  PropTypes.number.isRequired,
  count:  PropTypes.number,
}

FlattenSkeleton.propTypes = {
  fromXLeft:  PropTypes.number.isRequired,
  fromXRight: PropTypes.number.isRequired,
  fromSz:     PropTypes.number.isRequired,
  sliceCount: PropTypes.number.isRequired,
  toX:        PropTypes.number.isRequired,
  fcCount:    PropTypes.number.isRequired,
  color:      PropTypes.object.isRequired,
  delay:      PropTypes.number.isRequired,
  animated:   PropTypes.bool,
}

FCLines.propTypes = {
  fromCount: PropTypes.number.isRequired,
  toCount:   PropTypes.number.isRequired,
  fromX:     PropTypes.number.isRequired,
  toX:       PropTypes.number.isRequired,
  color:     PropTypes.object.isRequired,
  delay:     PropTypes.number.isRequired,
}

FCParticles.propTypes = {
  fromCount:    PropTypes.number.isRequired,
  toCount:      PropTypes.number.isRequired,
  fromX:        PropTypes.number.isRequired,
  toX:          PropTypes.number.isRequired,
  delay:        PropTypes.number.isRequired,
  maxCount:     PropTypes.number,
  toOutputOnly: PropTypes.bool,
  color:        PropTypes.object,
}

CNNScene.propTypes = {
  started: PropTypes.bool.isRequired,
}

NeuralNetworkCanvas.propTypes = {
  phase: PropTypes.oneOf(['intro', 'cnn']).isRequired,
}

IntroOverlay.propTypes = {
  onStart: PropTypes.func,
  visible: PropTypes.bool.isRequired,
}

RestartButton.propTypes = {
  visible:   PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
}

export default NeuralNetworkCanvas