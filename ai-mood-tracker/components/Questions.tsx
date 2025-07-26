'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Questions = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await askQuestion(question);

    setAnswer(data);
    setLoading(false);
    setQuestion('');
    setShowClearBtn(true);
  };

  const clearBtnOnClick = () => {
    setAnswer(null);
    setShowClearBtn(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl mb-4">Tone Entries</h2>
      <form onSubmit={handleSubmit} className="flex gap-6 items-center">
        <label className="block">
          <input
            disabled={loading}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-[40rem] h-12 p-2 border border-gray-300 rounded mt-0"
            placeholder="Ask a question about your entries"
          ></input>
        </label>
        <button
          disabled={loading}
          type="submit"
          className="px-4 py-2 mt-0 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Ask
        </button>
        {showClearBtn ? (
          <button
            onClick={clearBtnOnClick}
            disabled={loading}
            type="submit"
            className="px-4 py-2 mt-0 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Clear Answer
          </button>
        ) : null}
      </form>
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-sm">{answer}</p>}
    </div>
  );
};

export default Questions;
