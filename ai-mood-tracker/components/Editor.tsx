'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }: any) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysisData] = useState(entry.analysis);

  const tone = analysis?.tone ?? '';
  const summary = analysis?.summary ?? '';
  const color = analysis?.color ?? '';
  const negative = analysis?.negative ? 'True' : 'False';
  const suggestions = analysis?.suggestions ?? [];
  const analysisData = [
    { label: 'Color', value: color },
    { label: 'Negative', value: negative },
    { label: 'Tone', value: tone },
    { label: 'Summary', value: summary },
    { label: 'Suggestions', value: suggestions },
  ];

  const colorValue = analysisData.find((item) => item.label === 'Color')?.value;
  const colorClass = typeof colorValue === 'string' ? colorValue : undefined;

  useAutosave({
    data: value,
    interval: 4000,
    onSave: async (_value) => {
      setIsSaving(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysisData(data.analysis);
      setIsSaving(false);
    },
  });

  return (
    <>
      <div className="flex flex-col col-span-2 items-center justify-center h-screen">
        <div className="w-full h-full mx-auto p-4 bg-gray-50 rounded-lg shadow-md flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Tone Tracker</h1>
          {isSaving ? (
            <p className="text-sm text-gray-300 mb-2">Saving...</p>
          ) : (
            <textarea
              className="border border-gray-300 p-2 w-full h-96 outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="border-l border-gray-300 p-4 col-span-1">
        <div className="flex justify-between place-items-center mb-4  border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-bold">Entry Details</h2>
          <div
            className={`w-6 h-6 rounded-full mr-3`}
            style={{ backgroundColor: colorClass }}
          ></div>
        </div>
        <div>
          <ul className="flex flex-col">
            {analysisData.map((item, index) =>
              item.label === 'Color' ? null : (
                <li key={index} className="mb-2 justify-between gap-4 flex-col">
                  <div className="font-semibold">{item.label}:</div>
                  <div className="font-light text-xs">
                    {item.label === 'Suggestions' &&
                    Array.isArray(item.value) ? (
                      <ul className="list-disc pl-5">
                        {item.value.map((suggestion: string, i: number) => (
                          <li key={suggestion + i}>{suggestion}</li>
                        ))}
                      </ul>
                    ) : item.value ? (
                      item.value
                    ) : (
                      'N/A'
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Editor;
