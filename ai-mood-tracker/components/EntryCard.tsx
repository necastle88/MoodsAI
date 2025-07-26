const EntryCard = ({ entry }: any) => {
  const date = new Date(entry.createdAt).toDateString()
 
  return (
    <div className="divide-y divide-gray-200 bg-white overflow-hidden rounded-lg shadow">
      <div className="px-4 py-5 sm:px-4" style={{backgroundColor: entry.analysis.color}}>{date}</div>
      <div className="px-2 py-2 sm:p-4">Negative: { entry.analysis.negative ? "True" : "False"}</div>
      <div className="px-2 py-2 sm:p-4">Tone: { entry.analysis.tone }</div>
      <div className="px-4 py-4 sm:px-4">Summary: <p>{ entry.analysis.summary  }</p></div>
    </div>
  )
}

export default EntryCard