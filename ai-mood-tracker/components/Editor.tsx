'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }: any) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);

  useAutosave({
    data: value,
    interval: 4000,
    onSave: async (_value) => {
      setIsSaving(true);
      const updated = await updateEntry(entry.id, _value);
      setIsSaving(false);
    },
  });

  return (
    <div className="w-full h-full mx-auto p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Tone Tracker</h1>
      {isSaving ? (
        <p className="text-sm text-gray-500 mb-2">Saving...</p>
      ) : (
        <textarea
          className="border border-gray-300 p-2 w-full h-48 outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default Editor;
