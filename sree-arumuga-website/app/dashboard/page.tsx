import { getLeads } from '@/lib/leads';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const leads = await getLeads();
  return <DashboardClient leads={leads} />;
}
