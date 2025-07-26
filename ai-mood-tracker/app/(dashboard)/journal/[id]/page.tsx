import Editor from '@/components/Editor';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);
    if (!entry) {
        return <div className="p-10 bg-zinc-400/10 h-full">Entry not found</div>;
    }

  return (
    <div className="h-full w-full grid grid-cols-3">
        <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
