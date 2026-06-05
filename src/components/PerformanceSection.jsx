import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { year: '2016', elia: 100, market: 100 },
  { year: '2017', elia: 112, market: 108 },
  { year: '2018', elia: 121, market: 104 },
  { year: '2019', elia: 138, market: 118 },
  { year: '2020', elia: 132, market: 110 },
  { year: '2021', elia: 158, market: 135 },
  { year: '2022', elia: 152, market: 122 },
  { year: '2023', elia: 172, market: 140 },
  { year: '2024', elia: 195, market: 155 },
  { year: '2025', elia: 218, market: 168 },
];

const stats = [
  { label: 'Annualized Return', value: '9.2%' },
  { label: 'Max Drawdown', value: '-8.4%' },
  { label: 'Sharpe Ratio', value: '1.62' },
  { label: 'Assets Under Advisory', value: '€420M' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background/90 backdrop-blur-md border border-border px-4 py-3">
      <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="font-body text-sm text-foreground">
          <span className="text-muted-foreground">{entry.name === 'elia' ? 'Elia' : 'Benchmark'}: </span>
          <span className="font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

function StatCard({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center md:text-left"
    >
      <p className="font-display text-4xl md:text-5xl font-light text-foreground mb-2">
        {stat.value}
      </p>
      <p className="font-body text-sm tracking-widest uppercase text-muted-foreground">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function PerformanceSection({ coinImage }) {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [chartRef, chartInView] = useInView({ threshold: 0.2 });

  return (
    <section id="performance" className="py-32 md:py-40 bg-card relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 md:mb-28"
        >
          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              The Pantheon
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
              Performance carved in{' '}
              <span className="italic">stone</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-body text-body text-muted-foreground max-w-lg leading-relaxed">
              Our track record speaks with the quiet authority of proven results.
              Below, a decade of disciplined growth — measured not in bursts,
              but in the steady ascent of well-stewarded capital.
            </p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="fluted-divider w-full mb-16" />

        {/* Chart + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0 }}
            animate={chartInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="lg:col-span-8"
          >
            <div className="mb-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-foreground" />
                <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">Elia Portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-accent opacity-50" />
                <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">Benchmark</span>
              </div>
            </div>
            <div className="h-[350px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="eliaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(90, 30%, 22%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(90, 30%, 22%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(37, 30%, 50%)" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="hsl(37, 30%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(90, 15%, 40%)' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(90, 15%, 40%)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="market"
                    stroke="hsl(37, 30%, 50%)"
                    strokeWidth={1.5}
                    fill="url(#marketGrad)"
                    strokeOpacity={0.5}
                    name="market"
                  />
                  <Area
                    type="monotone"
                    dataKey="elia"
                    stroke="hsl(90, 30%, 22%)"
                    strokeWidth={2}
                    fill="url(#eliaGrad)"
                    name="elia"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="font-body text-xs text-muted-foreground mt-4 italic">
              * Hypothetical illustration. Past performance is not indicative of future results.
              Base index = 100 (2016).
            </p>
          </motion.div>

          {/* Coin image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="aspect-square relative overflow-hidden sticky top-24 shadow-[0_16px_60px_rgba(0,0,0,0.07)] arch-frame">
              <img
                src={coinImage}
                alt="Ancient Greek silver tetradrachm coin on Pentelic marble"
                className="w-full h-full object-cover bg-secondary"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}