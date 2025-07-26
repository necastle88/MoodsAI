import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import HistoryChart from '@/components/HistoryChart';

const getData = async () => {
  const user = await getUserByClerkID();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0);
  const avg = analyses.length ? Math.round(sum / analyses.length) : 0;

  return { analyses, avg };
};

// ✅ This is a server component
const HistoryPage = async () => {
  const { analyses, avg } = await getData();

  return (
    <div className="w-full h-full">
      <div className="pt-8 pl-32">{`Average sentiment score: ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default HistoryPage;
