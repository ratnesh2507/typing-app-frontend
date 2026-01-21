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
    <div className="bg-background text-text rounded-xl p-6 shadow-xl border-2 border-accent w-full max-w-md">
      <h3 className="text-2xl font-bold font-mono mb-6 text-accent flex items-center gap-2">
        📊 Race Summary
        <span className="w-2 h-2 bg-accent animate-pulse inline-block"></span>
      </h3>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center p-2 rounded-lg bg-background border border-accent/30 hover:border-accent transition-colors">
          <span className="text-text font-mono">⚡ Average WPM:</span>
          <span className="font-bold text-accent">{stats.avgWPM}</span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-lg bg-background border border-accent/30 hover:border-accent transition-colors">
          <span className="text-text font-mono">🏆 Fastest Typist:</span>
          <span className="font-bold text-accent">
            {stats.fastestUser} ({stats.fastestWPM} WPM)
          </span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-lg bg-background border border-accent/30 hover:border-accent transition-colors">
          <span className="text-text font-mono">👥 Total Participants:</span>
          <span className="font-bold text-accent">{stats.totalUsers}</span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-lg bg-background border border-accent/30 hover:border-accent transition-colors">
          <span className="text-text font-mono">✅ Finished:</span>
          <span className="font-bold text-accent">
            {stats.finishedUsers} ({stats.completionRate}%)
          </span>
        </div>
      </div>

      {/* WPM Distribution Line Chart */}
      {stats.chartData.length > 0 && (
        <div className="w-full h-48 mt-6 p-3 rounded-lg border-2 border-accent/50 bg-background">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats.chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="username"
                tick={{ fontSize: 12, fill: "#6B728E" }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 12, fill: "#6B728E" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A2E",
                  border: "2px solid #FFEE63",
                  borderRadius: "8px",
                  color: "#FFEE63",
                  fontFamily: "JetBrains Mono, monospace",
                }}
                labelStyle={{ color: "#FFEE63", fontWeight: "bold" }}
                itemStyle={{ color: "#6B728E" }}
              />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="#FFEE63"
                strokeWidth={3}
                dot={{ fill: "#FFEE63", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#E94560" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RaceSummaryCard;
