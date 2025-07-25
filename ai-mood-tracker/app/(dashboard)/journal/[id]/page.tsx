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
    { label: 'Color', value: "#F5F5F5" },
    { label: 'Negative', value: false },
    { label: 'Tone', value: "uncertain" },
    { label: 'Summary', value: "This journal entry conveys a tone of uncertainty and curiosity about the outcome of a test. The author seems unsure about how the test will go and is seeking feedback or opinions." },
    { label: 'Suggestions', value: ["Clarify the purpose or context of the test for better understanding", "Express more confidence or optimism in the outcome", "Seek support or advice from others to alleviate uncertainty"] },
  ];
   
    const colorValue = analysisData.find(item => item.label === 'Color')?.value;
    const colorClass = typeof colorValue === 'string' ? colorValue : undefined;

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="flex flex-col col-span-2 items-center justify-center h-screen">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-gray-300 p-4 col-span-1">
        <div className="flex justify-between place-items-center mb-4  border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-bold">Entry Details</h2>
          <div className={`w-6 h-6 rounded-full mr-3`} style={{ backgroundColor: colorClass }}></div>
        </div>
        <div>
          <ul className="flex flex-col">
            {analysisData.map((item, index) =>
              item.label === 'Color' ? null : (
                <li key={index} className="mb-2 justify-between gap-4 flex-col">
                  <div className="font-semibold">{item.label}:</div>
                  <div className="font-light text-xs">
                    {item.label === "Suggestions" && Array.isArray(item.value) ? (
                      <ul className="list-disc pl-5">
                        {item.value.map((suggestion: string, i: number) => (
                          <li key={suggestion + i}>{suggestion}</li>
                        ))}
                      </ul>
                    ) : (
                      item.value ? item.value : 'N/A'
                    )}
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
