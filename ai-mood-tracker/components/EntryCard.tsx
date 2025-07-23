const EntryCard = ({ entry }: any) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">{ entry.id }</div>
      <div className="px-4 py-5 sm:p-6">summary</div>
      <div className="px-4 py-4 sm:px-6">mood</div>
    </div>
  );
};

export default EntryCard;
