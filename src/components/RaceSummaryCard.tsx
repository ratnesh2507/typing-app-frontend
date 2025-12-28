import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface User {
  username: string;
  wpm: number;
  finished: boolean;
  disqualified?: boolean;
}

interface RaceSummaryCardProps {
  users: User[];
}

const RaceSummaryCard: React.FC<RaceSummaryCardProps> = ({ users }) => {
  const stats = useMemo(() => {
    const validUsers = users.filter((u) => !u.disqualified && u.finished);
    const totalUsers = users.length;
    const finishedUsers = validUsers.length;

    const avgWPM =
      finishedUsers > 0
        ? (
            validUsers.reduce((sum, u) => sum + u.wpm, 0) / finishedUsers
          ).toFixed(2)
        : "0.00";

    const fastestUser =
      validUsers.length > 0
        ? validUsers.reduce((prev, curr) => (curr.wpm > prev.wpm ? curr : prev))
        : null;

    const completionRate = ((finishedUsers / totalUsers) * 100).toFixed(1);

    // WPM chart data
    const chartData = validUsers.map((u) => ({
      username: u.username,
      wpm: u.wpm,
    }));

    return {
      avgWPM,
      fastestUser: fastestUser?.username || "N/A",
      fastestWPM: fastestUser?.wpm || 0,
      totalUsers,
      finishedUsers,
      completionRate,
      chartData,
    };
  }, [users]);

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl p-6 shadow-lg w-full max-w-md">
      <h3 className="text-2xl font-bold font-mono mb-4">Race Summary</h3>

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex justify-between">
          <span>Average WPM:</span>
          <span className="font-semibold">{stats.avgWPM}</span>
        </div>

        <div className="flex justify-between">
          <span>Fastest Typist:</span>
          <span className="font-semibold">
            {stats.fastestUser} ({stats.fastestWPM} WPM)
          </span>
        </div>

        <div className="flex justify-between">
          <span>Total Participants:</span>
          <span className="font-semibold">{stats.totalUsers}</span>
        </div>

        <div className="flex justify-between">
          <span>Finished:</span>
          <span className="font-semibold">
            {stats.finishedUsers} ({stats.completionRate}%)
          </span>
        </div>
      </div>

      {/* WPM Distribution Line Chart */}
      {stats.chartData.length > 0 && (
        <div className="w-full h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats.chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="username"
                tick={{ fontSize: 12, fill: "#ffffff" }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 12, fill: "#ffffff" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A2E",
                  border: "none",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="#FFEE63"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RaceSummaryCard;
