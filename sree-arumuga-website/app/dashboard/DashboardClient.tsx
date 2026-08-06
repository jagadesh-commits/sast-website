'use client';
import { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';
import type { Lead } from '@/lib/leads';

const BLUE = '#1a3a8f';
const PALETTE = ['#1a3a8f', '#2b57c4', '#c0271e', '#e0694f', '#3f7a3f', '#8a6d3b', '#5b4b8a', '#0f766e'];

export default function DashboardClient({ leads }: { leads: Lead[] }) {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(startOfDay); weekAgo.setDate(weekAgo.getDate() - 6);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const kpis = useMemo(() => {
    const d = leads.filter(l => l.timestamp);
    return {
      total: leads.length,
      today: d.filter(l => l.timestamp! >= startOfDay).length,
      week: d.filter(l => l.timestamp! >= weekAgo).length,
      month: d.filter(l => l.timestamp! >= monthStart).length,
    };
  }, [leads]);

  const daily = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(startOfDay); d.setDate(d.getDate() - i);
      map.set(d.toISOString().slice(0, 10), 0);
    }
    leads.forEach(l => {
      if (!l.timestamp) return;
      const k = l.timestamp.toISOString().slice(0, 10);
      if (map.has(k)) map.set(k, map.get(k)! + 1);
    });
    return Array.from(map, ([date, count]) => ({ date: date.slice(5), count }));
  }, [leads]);

  const byProduct = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach(l => map.set(l.product || 'Unknown', (map.get(l.product || 'Unknown') || 0) + 1));
    return Array.from(map, ([product, count]) => ({ product, count })).sort((a, b) => b.count - a.count);
  }, [leads]);

  const recent = useMemo(() =>
    [...leads].filter(l => l.timestamp)
      .sort((a, b) => b.timestamp!.getTime() - a.timestamp!.getTime()).slice(0, 15),
  [leads]);

  const maxQty = Math.max(1, ...leads.map(l => l.quantity));
  const card = 'bg-white rounded-xl border border-gray-200 p-5 shadow-sm';

  return (
    <main className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: BLUE }}>SAST Leads Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Today', value: kpis.today },
          { label: 'Last 7 days', value: kpis.week },
          { label: 'This month', value: kpis.month },
          { label: 'Total leads', value: kpis.total },
        ].map(k => (
          <div key={k.label} className={card}>
            <div className="text-sm text-gray-500">{k.label}</div>
            <div className="text-3xl font-bold mt-1" style={{ color: BLUE }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={card}>
          <h2 className="font-semibold mb-4 text-gray-700">Leads — last 30 days</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke={BLUE} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={card}>
          <h2 className="font-semibold mb-4 text-gray-700">Demand by product</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byProduct} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="product" width={90} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {byProduct.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={card}>
        <h2 className="font-semibold mb-4 text-gray-700">Recent leads (hot = high quantity)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-4">Time</th><th className="pr-4">Name</th>
                <th className="pr-4">Phone</th><th className="pr-4">Product</th>
                <th className="pr-4">Brand</th><th className="pr-4">Qty</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((l, i) => {
                const hot = l.quantity >= maxQty * 0.6 && l.quantity > 0;
                return (
                  <tr key={i} className={`border-b ${hot ? 'bg-red-50 font-medium' : ''}`}>
                    <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                      {l.timestamp?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}{' '}
                      {l.timestamp?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="pr-4">{l.name || '—'}</td>
                    <td className="pr-4">{l.phone || '—'}</td>
                    <td className="pr-4">{l.product || '—'}</td>
                    <td className="pr-4">{l.brand || '—'}</td>
                    <td className="pr-4">{l.quantity || '—'}{hot && ' 🔥'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
