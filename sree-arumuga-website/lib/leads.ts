export type Lead = {
  timestamp: Date | null;
  name: string;
  phone: string;
  email: string;
  product: string;
  brand: string;
  quantity: number;   // tons, parsed from Message
  source: string;     // 'Enquiry' | 'Exit Popup' | 'Contact'
  message: string;
  raw: Record<string, any>;
};

function parseTimestamp(v: any): Date | null {
  if (!v) return null;
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) {
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s*(\d{1,2}):(\d{2}):(\d{2})/);
  if (m) {
    const [, dd, mm, yyyy, hh, mi, ss] = m;
    return new Date(+yyyy, +mm - 1, +dd, +hh, +mi, +ss);
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function field(message: string, label: string): string {
  const re = new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:\\s*(.+)', 'i');
  const m = message.match(re);
  return m ? m[1].trim() : '';
}

function detectSource(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('new steel enquiry')) return 'Enquiry';
  if (m.includes('exit intent')) return 'Exit Popup';
  return 'Contact';
}

export async function getLeads(): Promise<Lead[]> {
  const url = process.env.LEADS_API_URL;
  const key = process.env.LEADS_API_KEY;
  if (!url || !key) return [];
  const res = await fetch(`${url}?key=${encodeURIComponent(key)}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  const rows: Record<string, any>[] = data.leads || [];
  return rows.map((r) => {
    const message = String(r['Message'] ?? '');
    const quantity = Number(field(message, 'Quantity').replace(/[^0-9.]/g, '')) || 0;
    return {
      timestamp: parseTimestamp(r['Timestamp']),
      name: String(r['Name'] ?? '').trim(),
      phone: String(r['Phone'] ?? '').trim(),
      email: String(r['Email'] ?? '').trim(),
      product: field(message, 'Product') || String(r['Product Interest'] ?? '').trim(),
      brand: field(message, 'Brand'),
      quantity,
      source: detectSource(message),
      message,
      raw: r,
    };
  });
}
