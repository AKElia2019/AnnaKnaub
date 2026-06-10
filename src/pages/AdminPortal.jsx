import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import {
  Package, Users, TrendingUp, Clock, CheckCircle2, Truck, XCircle, BarChart2,
  ChevronDown, ChevronUp, Search, Filter, X, Settings, LogOut, Database, Zap
} from 'lucide-react';

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: 'text-amber-700 bg-amber-50 border-amber-200' },
  confirmed: { label: 'Confirmed', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  shipped:   { label: 'Shipped',   color: 'text-green-700 bg-green-50 border-green-200' },
  completed: { label: 'Completed', color: 'text-primary bg-secondary border-border' },
  cancelled: { label: 'Cancelled', color: 'text-red-700 bg-red-50 border-red-100' },
};

const NEXT_STATUS = { pending: 'confirmed', confirmed: 'shipped', shipped: 'completed' };

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return <span className={`inline-flex items-center px-2 py-0.5 border text-[8px] tracking-[0.15em] uppercase font-body ${cfg.color}`}>{cfg.label}</span>;
}

function StatCard({ label, value, sub, icon: IconComp, accent }) {
  const Icon = IconComp;
  return (
    <div className={`border p-5 ${accent ? 'border-accent/40 bg-accent/5' : 'border-border bg-card'}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground">{label}</p>
        <Icon className={`w-4 h-4 ${accent ? 'text-accent' : 'text-muted-foreground/50'}`} />
      </div>
      <p className="font-display text-4xl font-light text-foreground">{value}</p>
      {sub && <p className="font-body text-[10px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminPortal() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    base44.entities.Order.list('-created_date', 200)
      .then(d => { setOrders(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    await base44.entities.Order.update(orderId, { status: newStatus });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selected?.id === orderId) setSelected(prev => ({ ...prev, status: newStatus }));
    setUpdating(null);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center border border-border p-12 max-w-sm">
          <p className="font-display text-2xl italic text-foreground mb-2">Access Restricted</p>
          <p className="font-body text-xs text-muted-foreground mb-6">This area is for administrators only.</p>
          <Link to="/gold-shop" className="font-body text-[9px] tracking-[0.3em] uppercase px-6 py-2.5 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || o.full_name?.toLowerCase().includes(q) || o.email?.toLowerCase().includes(q) || o.id?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders.reduce((s, o) => s + (o.total_usd || 0), 0);
  const materialBreakdown = orders.flatMap(o => o.items || []).reduce((acc, item) => {
    acc[item.material] = (acc[item.material] || 0) + item.quantity;
    return acc;
  }, {});

  const TABS = [
    { key: 'orders',   label: 'Orders',      icon: Package },
    { key: 'overview', label: 'Overview',     icon: BarChart2 },
    { key: 'system',   label: 'System',       icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 green-bg border-r border-primary/20 hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-primary-foreground/10">
          <span className="font-display text-lg tracking-[0.18em] text-primary-foreground">AURUM</span>
          <p className="font-body text-[7px] tracking-[0.4em] uppercase text-primary-foreground/40 mt-0.5">Admin Console</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 font-body text-xs tracking-[0.15em] uppercase transition-colors ${
                activeTab === tab.key ? 'bg-primary-foreground/10 text-primary-foreground' : 'text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5'
              }`}>
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-primary-foreground/10">
          <button onClick={() => base44.auth.logout()}
            className="w-full flex items-center gap-3 px-3 py-2 font-body text-xs tracking-[0.15em] uppercase text-primary-foreground/40 hover:text-primary-foreground transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b border-border px-6 py-4 flex items-center justify-between bg-background">
          <div>
            <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Aurum Admin</p>
            <h1 className="font-display text-xl italic text-foreground">
              {activeTab === 'orders' ? 'Orders' : activeTab === 'overview' ? 'Overview' : 'System'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <div className="w-8 h-8 green-bg flex items-center justify-center">
              <span className="font-body text-xs text-primary-foreground">{user?.full_name?.[0] || 'A'}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-6 py-6">

          {/* ── ORDERS TAB ── */}
          {activeTab === 'orders' && (
            <>
              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                {Object.keys(STATUS_CONFIG).map(s => (
                  <button key={s} onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
                    className={`border p-3 text-left transition-colors ${statusFilter === s ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40'}`}>
                    <p className="font-body text-[7px] tracking-[0.3em] uppercase text-muted-foreground">{STATUS_CONFIG[s].label}</p>
                    <p className="font-display text-2xl font-light text-foreground mt-1">
                      {orders.filter(o => o.status === s).length}
                    </p>
                  </button>
                ))}
              </div>

              {/* Search & filter bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, email or order ID…"
                    className="w-full pl-9 pr-4 py-2.5 border border-border bg-background font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors" />
                </div>
                {statusFilter !== 'all' && (
                  <button onClick={() => setStatusFilter('all')} className="flex items-center gap-2 px-3 border border-accent/50 text-accent font-body text-xs">
                    <Filter className="w-3 h-3" /> {STATUS_CONFIG[statusFilter]?.label} <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Orders table */}
              <div className="border border-border overflow-hidden">
                <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-secondary border-b border-border">
                  {['Order', 'Client', 'Items', 'Total', 'Status', 'Date', 'Action'].map((h, i) => (
                    <div key={h} className={`font-body text-[8px] tracking-[0.3em] uppercase text-muted-foreground ${i === 0 ? 'col-span-1' : i === 1 ? 'col-span-3' : i === 2 ? 'col-span-1' : i === 3 ? 'col-span-2' : i === 4 ? 'col-span-2' : i === 5 ? 'col-span-2' : 'col-span-1'}`}>{h}</div>
                  ))}
                </div>

                {loading ? (
                  <div className="space-y-0">{[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-secondary/50 animate-pulse border-b border-border" />)}</div>
                ) : filtered.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="font-display italic text-muted-foreground">No orders found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filtered.map(order => (
                      <div key={order.id}
                        className={`grid grid-cols-12 gap-2 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer ${selected?.id === order.id ? 'bg-accent/5 border-l-2 border-accent' : ''}`}
                        onClick={() => setSelected(selected?.id === order.id ? null : order)}>
                        <div className="col-span-1 font-body text-[10px] text-muted-foreground self-center">
                          #{order.id?.slice(-5).toUpperCase()}
                        </div>
                        <div className="col-span-3 self-center">
                          <p className="font-body text-xs text-foreground truncate">{order.full_name}</p>
                          <p className="font-body text-[10px] text-muted-foreground truncate">{order.email}</p>
                        </div>
                        <div className="col-span-1 self-center font-body text-xs text-muted-foreground">{order.items?.length || 0}</div>
                        <div className="col-span-2 self-center font-display text-sm">${order.total_usd?.toLocaleString()}</div>
                        <div className="col-span-2 self-center"><StatusBadge status={order.status} /></div>
                        <div className="col-span-2 self-center font-body text-[10px] text-muted-foreground">
                          {new Date(order.created_date).toLocaleDateString('en-GB', { day:'2-digit', month:'short' })}
                        </div>
                        <div className="col-span-1 self-center">
                          {NEXT_STATUS[order.status] && (
                            <button onClick={e => { e.stopPropagation(); updateStatus(order.id, NEXT_STATUS[order.status]); }}
                              disabled={updating === order.id}
                              className="font-body text-[7px] tracking-[0.15em] uppercase px-2 py-1 border border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-40 whitespace-nowrap">
                              {updating === order.id ? '…' : `→ ${STATUS_CONFIG[NEXT_STATUS[order.status]].label}`}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expanded order detail */}
              {selected && (
                <div className="mt-4 border border-accent/30 bg-accent/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-lg italic">Order #{selected.id?.slice(-6).toUpperCase()}</h3>
                      <p className="font-body text-xs text-muted-foreground">{selected.full_name} · {selected.email}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Items</p>
                      <div className="space-y-2">
                        {selected.items?.map((item, i) => (
                          <div key={i} className="flex justify-between border-b border-border/60 pb-2 last:border-0">
                            <div>
                              <p className="font-display text-sm italic">{item.product_name}</p>
                              <p className="font-body text-[9px] text-muted-foreground">{item.weight_oz}oz · {item.material} · qty {item.quantity}</p>
                            </div>
                            <p className="font-display text-sm">${(item.price_usd * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-3 pt-3 border-t border-border">
                        <span className="font-body text-[9px] uppercase tracking-widest text-muted-foreground">Total</span>
                        <span className="font-display text-lg">${selected.total_usd?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Shipping</p>
                      <div className="font-body text-sm text-muted-foreground space-y-0.5">
                        <p className="text-foreground">{selected.full_name}</p>
                        <p>{selected.phone}</p>
                        <p>{selected.address_line1}{selected.address_line2 ? `, ${selected.address_line2}` : ''}</p>
                        <p>{[selected.city, selected.state, selected.postal_code].filter(Boolean).join(', ')}</p>
                        <p>{selected.country}</p>
                        {selected.notes && <p className="mt-2 italic text-xs">Note: {selected.notes}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Orders" value={orders.length} icon={Package} />
                <StatCard label="Total Revenue" value={`$${(totalRevenue).toLocaleString()}`} sub="estimated" icon={TrendingUp} accent />
                <StatCard label="Pending" value={orders.filter(o => o.status === 'pending').length} sub="awaiting review" icon={Clock} />
                <StatCard label="Completed" value={orders.filter(o => o.status === 'completed').length} icon={CheckCircle2} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Status breakdown */}
                <div className="border border-border p-5">
                  <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-4">Orders by Status</p>
                  <div className="space-y-3">
                    {Object.keys(STATUS_CONFIG).map(s => {
                      const count = orders.filter(o => o.status === s).length;
                      const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
                      return (
                        <div key={s}>
                          <div className="flex justify-between mb-1">
                            <span className="font-body text-xs text-muted-foreground">{STATUS_CONFIG[s].label}</span>
                            <span className="font-body text-xs text-foreground">{count}</span>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-accent transition-all duration-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Material breakdown */}
                <div className="border border-border p-5">
                  <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-4">Units Sold by Metal</p>
                  <div className="space-y-4">
                    {Object.entries(materialBreakdown).map(([mat, qty]) => (
                      <div key={mat} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${mat === 'Gold' ? 'bg-amber-400' : mat === 'Silver' ? 'bg-slate-400' : 'bg-zinc-400'}`} />
                          <span className="font-body text-sm text-foreground">{mat}</span>
                        </div>
                        <span className="font-display text-xl font-light">{qty}</span>
                      </div>
                    ))}
                    {Object.keys(materialBreakdown).length === 0 && (
                      <p className="font-body text-xs text-muted-foreground italic">No data yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="mt-6 border border-border p-5">
                <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-4">Recent Orders</p>
                <div className="space-y-2">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="font-body text-sm text-foreground">{o.full_name}</p>
                        <p className="font-body text-[9px] text-muted-foreground">{o.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-sm">${o.total_usd?.toLocaleString()}</p>
                        <StatusBadge status={o.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SYSTEM TAB ── */}
          {activeTab === 'system' && (
            <div className="space-y-5 max-w-2xl">
              {/* Entity info */}
              <div className="border border-border">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/40">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase text-foreground">Database Entities</p>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { name: 'Order', desc: 'Purchase requests from customers', fields: 'full_name, email, items[], total_usd, status' },
                    { name: 'Product', desc: 'Precious metal product catalog', fields: 'name, material, weight_oz, price_usd, in_stock' },
                    { name: 'User', desc: 'Authenticated platform users', fields: 'email, full_name, role' },
                  ].map(e => (
                    <div key={e.name} className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-body text-xs font-medium text-foreground">{e.name}</span>
                        <span className="font-body text-[7px] px-1.5 py-0.5 bg-accent/10 text-accent">entity</span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground mb-1">{e.desc}</p>
                      <p className="font-mono text-[10px] text-muted-foreground/60">{e.fields}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration info */}
              <div className="border border-border">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/40">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase text-foreground">Integrations & APIs</p>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { name: 'Base44 Auth', status: 'active', desc: 'User authentication, sessions, role-based access' },
                    { name: 'Base44 Database', status: 'active', desc: 'Entity storage for Orders, Products, Users' },
                    { name: 'Base44 LLM (InvokeLLM)', status: 'available', desc: 'AI-assisted responses and content generation' },
                    { name: 'Stripe Payments', status: 'not connected', desc: 'Add Stripe to accept card payments at checkout' },
                    { name: 'Email (SendEmail)', status: 'available', desc: 'Transactional emails via Base44 integrations' },
                  ].map(item => (
                    <div key={item.name} className="px-5 py-4 flex items-start justify-between">
                      <div>
                        <p className="font-body text-xs font-medium text-foreground">{item.name}</p>
                        <p className="font-body text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <span className={`font-body text-[7px] tracking-[0.2em] uppercase px-2 py-1 border ${
                        item.status === 'active' ? 'border-green-200 bg-green-50 text-green-700' :
                        item.status === 'available' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                        'border-border bg-secondary text-muted-foreground'
                      }`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Build info */}
              <div className="border border-border px-5 py-4">
                <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-3">Build Info</p>
                <div className="font-mono text-[10px] text-muted-foreground space-y-1">
                  <p>Stack: React 18 · Tailwind CSS · Framer Motion</p>
                  <p>Auth: Base44 AuthProvider</p>
                  <p>State: React useState / useEffect</p>
                  <p>DB: Base44 Entity SDK</p>
                  <p>Routes: /gold-shop · /client-portal · /admin</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}