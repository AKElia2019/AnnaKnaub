import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck, XCircle, ChevronRight, ShoppingBag, User, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

const STATUS_CONFIG = {
  pending:   { label: 'Pending Review', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Clock },
  confirmed: { label: 'Confirmed',      color: 'text-blue-700 bg-blue-50 border-blue-200',   icon: CheckCircle2 },
  shipped:   { label: 'Shipped',        color: 'text-green-700 bg-green-50 border-green-200', icon: Truck },
  completed: { label: 'Completed',      color: 'text-primary bg-secondary border-border',     icon: CheckCircle2 },
  cancelled: { label: 'Cancelled',      color: 'text-red-700 bg-red-50 border-red-100',       icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[9px] tracking-[0.2em] uppercase font-body ${cfg.color}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function OrderRow({ order, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center justify-between p-4 border border-border hover:border-accent/50 hover:bg-secondary/30 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors">
          <Package className="w-4 h-4" />
        </div>
        <div>
          <p className="font-display text-base italic text-foreground">
            Order #{order.id?.slice(-6).toUpperCase()}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} · {new Date(order.created_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="font-display text-lg font-light">${order.total_usd?.toLocaleString()}</p>
        </div>
        <StatusBadge status={order.status} />
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
      </div>
    </div>
  );
}

function OrderDetail({ order, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-6">
        ← Back to Orders
      </button>

      <div className="border border-border p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display text-xl italic text-foreground">Order #{order.id?.slice(-6).toUpperCase()}</h3>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              Placed {new Date(order.created_date).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="space-y-3 mb-5">
          {order.items?.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-border/60 last:border-0">
              <div>
                <p className="font-display text-sm italic">{item.product_name}</p>
                <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{item.weight_oz} oz · {item.material} · qty {item.quantity}</p>
              </div>
              <p className="font-display text-sm">${(item.price_usd * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-baseline pt-3 border-t border-border">
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Total</span>
          <span className="font-display text-xl">${order.total_usd?.toLocaleString()}</span>
        </div>
      </div>

      <div className="border border-border p-5">
        <p className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Shipping Address</p>
        <div className="font-body text-sm text-foreground space-y-0.5">
          <p>{order.full_name}</p>
          <p className="text-muted-foreground">{order.address_line1}{order.address_line2 ? `, ${order.address_line2}` : ''}</p>
          <p className="text-muted-foreground">{[order.city, order.state, order.postal_code].filter(Boolean).join(', ')}</p>
          <p className="text-muted-foreground">{order.country}</p>
        </div>
      </div>
    </div>
  );
}

export default function ClientPortal() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.Order.filter({ email: user?.email })
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-background">
      {/* Portal Header */}
      <header className="green-bg border-b border-primary/20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/gold-shop" className="flex items-center gap-3">
            <span className="font-display text-xl tracking-[0.18em] text-primary-foreground">AURUM</span>
            <span className="font-body text-[8px] tracking-[0.35em] uppercase text-primary-foreground/40 border-l border-primary-foreground/20 pl-3">Client Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-primary-foreground/30 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary-foreground/70" />
              </div>
              <span className="font-body text-xs text-primary-foreground/70 hidden sm:inline">{user?.email}</span>
            </div>
            <button onClick={() => base44.auth.logout()} className="font-body text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-1.5">
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-1">Welcome back</p>
          <h1 className="font-display text-3xl font-light italic text-foreground">{user?.full_name || 'Valued Client'}</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: orders.length },
            { label: 'Pending', value: orders.filter(o => o.status === 'pending').length },
            { label: 'Confirmed', value: orders.filter(o => o.status === 'confirmed' || o.status === 'shipped').length },
            { label: 'Completed', value: orders.filter(o => o.status === 'completed').length },
          ].map(stat => (
            <div key={stat.label} className="border border-border p-4">
              <p className="font-body text-[8px] tracking-[0.35em] uppercase text-muted-foreground mb-1">{stat.label}</p>
              <p className="font-display text-3xl font-light text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="fluted-divider mb-10 opacity-60" />

        {/* Orders */}
        {selected ? (
          <OrderDetail order={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl italic text-foreground">Your Orders</h2>
              <Link to="/gold-shop" className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.2em] uppercase text-accent hover:text-foreground transition-colors">
                <ShoppingBag className="w-3 h-3" />
                Shop
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-secondary animate-pulse" />)}
              </div>
            ) : orders.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center">
                <Package className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-display text-lg italic text-muted-foreground">No orders yet</p>
                <p className="font-body text-xs text-muted-foreground/60 mt-1">Your order history will appear here.</p>
                <Link to="/gold-shop" className="inline-block mt-5 font-body text-[9px] tracking-[0.3em] uppercase px-6 py-2.5 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {orders.map(o => <OrderRow key={o.id} order={o} onClick={() => setSelected(o)} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}