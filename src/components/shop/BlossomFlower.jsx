import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// SVG Rose petal path
const PETAL = "M0,-40 C12,-30 18,-10 0,0 C-18,-10 -12,-30 0,-40Z";
const LEAF  = "M0,0 C8,-20 20,-30 0,-45 C-20,-30 -8,-20 0,0Z";

function Petal({ angle, delay, color, size = 1 }) {
  return (
    <motion.g
      style={{ transformOrigin: '0 0' }}
      initial={{ rotate: angle, scale: 0, opacity: 0 }}
      animate={{ rotate: angle, scale: size, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <path d={PETAL} fill={color} />
    </motion.g>
  );
}

export default function BlossomFlower({ size = 80, delay = 0, className = '', variant = 'rose' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => { if (inView) setBloomed(true); }, [inView]);

  const configs = {
    rose: {
      petals: 8,
      colors: ['#c8a96e','#d4b87a','#c09050','#b88040'],
      center: '#e8d4a0',
      innerR: 8,
    },
    peony: {
      petals: 12,
      colors: ['#a8c4a0','#90b890','#78a878','#609060'],
      center: '#d4e8d0',
      innerR: 6,
    },
    lotus: {
      petals: 10,
      colors: ['#c8b890','#d4c89a','#baa878','#a89060'],
      center: '#f0e8d0',
      innerR: 10,
    },
  };

  const cfg = configs[variant] || configs.rose;
  const half = size / 2;
  const petalCount = cfg.petals;

  return (
    <div ref={ref} className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`${-half} ${-half} ${size} ${size}`} overflow="visible">
        {/* Outer petals */}
        {bloomed && Array.from({ length: petalCount }).map((_, i) => (
          <Petal
            key={`outer-${i}`}
            angle={(360 / petalCount) * i}
            delay={delay + i * 0.05}
            color={cfg.colors[i % cfg.colors.length]}
            size={1}
          />
        ))}
        {/* Inner petals */}
        {bloomed && Array.from({ length: petalCount }).map((_, i) => (
          <Petal
            key={`inner-${i}`}
            angle={(360 / petalCount) * i + (180 / petalCount)}
            delay={delay + 0.3 + i * 0.04}
            color={cfg.colors[(i + 1) % cfg.colors.length]}
            size={0.65}
          />
        ))}
        {/* Centre */}
        {bloomed && (
          <motion.circle
            cx={0} cy={0} r={cfg.innerR}
            fill={cfg.center}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
          />
        )}
      </svg>
    </div>
  );
}