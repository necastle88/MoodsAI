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
  });

  return entry;
};

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    { label: 'Color', value: '' },
    { label: 'Tone', value: '' },
    { label: 'Negative', value: '' },
    { label: 'Summary', value: '' },
    { label: 'Suggestions', value: '' },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="flex flex-col col-span-2 items-center justify-center h-screen">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-gray-300 p-4 col-span-1">
        <div className="flex justify-between place-items-center mb-4  border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-bold">Entry Details</h2>
          <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
        </div>
        <div>
          <ul className="flex flex-col">
            {analysisData.map((item, index) =>
              item.label === 'Color' ? null : (
                <li key={index} className="mb-2 justify-between gap-4 flex-col">
                  <div className="font-semibold">{item.label}:</div>
                  <div className="font-light text-xs">
                    {item.value ? item.value : 'N/A'}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
