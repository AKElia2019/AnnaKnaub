import React, { useEffect, useState } from 'react';

const PETAL_SHAPES = [
  'M0,0 C5,-12 15,-16 12,-4 C10,6 2,8 0,0Z',
  'M0,0 C8,-10 18,-12 14,-2 C10,8 2,6 0,0Z',
  'M0,0 C4,-14 14,-18 10,-6 C6,4 1,6 0,0Z',
];

const COLORS = ['#c8a96e','#d4b87a','#a8c4a0','#90b890','#e8d4a0','#d4c89a'];

function FallingPetal({ x, delay, duration, color, shape, size }) {
  return (
    <div
      className="fixed pointer-events-none z-0"
      style={{
        left: `${x}%`,
        top: -20,
        animation: `petalDrift ${duration}s ${delay}s ease-in forwards`,
      }}
    >
      <svg width={size} height={size} viewBox="-10 -20 30 30" style={{ opacity: 0.75 }}>
        <path d={shape} fill={color} />
      </svg>
    </div>
  );
}

export default function FallingPetals({ count = 12 }) {
  const [petals] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)],
      size: 16 + Math.floor(Math.random() * 12),
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map(p => <FallingPetal key={p.id} {...p} />)}
    </div>
  );
}