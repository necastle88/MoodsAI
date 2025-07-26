'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const CustomTooltip = ({
  payload,
  label,
  active,
}: {
  payload?: any;
  label?: any;
  active?: any;
}) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  if (active) {
    const analysis = payload[0].payload;
    console.log('From History:', analysis);
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-4 h-4 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-l uppercase">{analysis.tone}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = ({ data }: any) => {
  return (
    <div className="w-full h-full flex pt-8 justify-center">
      <ResponsiveContainer width={800} height={500}>
        <LineChart width={1500} height={500} data={data}>
          <Line
            type="monotone"
            dataKey="sentimentScore"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <XAxis dataKey="createdAt" />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
