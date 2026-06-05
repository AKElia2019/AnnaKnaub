import React from 'react';
import { motion } from 'framer-motion';

const HORIZONTAL = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/347b42495_generated_image.png';
const CORNER = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/dd83aba9c_generated_image.png';
const VERTICAL = 'https://media.base44.com/images/public/6a22880d6f3f040d6f180c10/b7ce881a0_generated_image.png';

// ── Horizontal section divider with centered floral strip ──
export function FloralDivider({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.92 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      <img
        src={HORIZONTAL}
        alt=""
        className="w-full max-w-4xl h-16 object-cover object-center"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(40,52,36,0.10))' }}
      />
    </motion.div>
  );
}

// ── Four-corner frame around a section ──
export function FloralFrame({ children, className = '' }) {
  const cornerCls = 'absolute w-16 md:w-20 pointer-events-none select-none';
  return (
    <div className={`relative ${className}`}>
      <img src={CORNER} alt="" className={`${cornerCls} top-0 left-0`}
        style={{ filter: 'drop-shadow(2px 4px 6px rgba(40,52,36,0.12))' }} />
      <img src={CORNER} alt="" className={`${cornerCls} top-0 right-0 scale-x-[-1]`}
        style={{ filter: 'drop-shadow(-2px 4px 6px rgba(40,52,36,0.12))' }} />
      <img src={CORNER} alt="" className={`${cornerCls} bottom-0 left-0 scale-y-[-1]`}
        style={{ filter: 'drop-shadow(2px -4px 6px rgba(40,52,36,0.12))' }} />
      <img src={CORNER} alt="" className={`${cornerCls} bottom-0 right-0 scale-x-[-1] scale-y-[-1]`}
        style={{ filter: 'drop-shadow(-2px -4px 6px rgba(40,52,36,0.12))' }} />
      {children}
    </div>
  );
}

// ── Vertical side accent (left or right column) ──
export function FloralSide({ side = 'left', className = '' }) {
  return (
    <div className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-10 pointer-events-none select-none hidden xl:block ${className}`}
      style={{ filter: 'drop-shadow(2px 0 6px rgba(40,52,36,0.09))' }}>
      <img src={VERTICAL} alt="" className="w-full h-full object-cover object-center"
        style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none' }} />
    </div>
  );
}