import { DataProvider } from '@/components/providers/DataProvider';
import { generateInitialDataset } from '@/lib/dataGenerator';
import DashboardView from '@/components/ui/DashboardView';

export const dynamic = 'force-static';

export default async function DashboardPage() {
  const initialData = generateInitialDataset(10000);
  return (
    <DataProvider initialData={initialData}>
      <DashboardView />
    </DataProvider>
  );
}

