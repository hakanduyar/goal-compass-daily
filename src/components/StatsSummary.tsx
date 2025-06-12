
import React from 'react';
import { Clock } from 'lucide-react';

interface StatsSummaryProps {
  stats: {
    transferPlus: {
      total: number;
    };
  };
  programData: Array<{ transferPlusValue: number | null }>;
}

const StatsSummary = ({ stats, programData }: StatsSummaryProps) => {
  const activeDays = programData.filter(d => d.transferPlusValue !== null && d.transferPlusValue > 0).length;
  const averagePerDay = activeDays > 0 ? stats.transferPlus.total / activeDays : 0;
  const maxHours = Math.max(...programData.map(d => d.transferPlusValue || 0));

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-orange-900/80 rounded-xl p-6 text-center border border-orange-700/60 shadow-sm backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl font-bold text-orange-300 font-['Poppins']">
          {stats.transferPlus.total.toFixed(1)}
        </div>
        <div className="text-base text-orange-400 mt-2">Toplam Saat</div>
      </div>
      <div className="bg-blue-900/80 rounded-xl p-6 text-center border border-blue-700/60 shadow-sm backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl font-bold text-blue-300 font-['Poppins']">
          {averagePerDay.toFixed(1)}
        </div>
        <div className="text-base text-blue-400 mt-2">Ortalama/Gün</div>
      </div>
      <div className="bg-emerald-900/80 rounded-xl p-6 text-center border border-emerald-700/60 shadow-sm backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-['Poppins']">
          {maxHours.toFixed(1)}
        </div>
        <div className="text-base text-emerald-400 mt-2">En Yüksek</div>
      </div>
    </div>
  );
};

export default StatsSummary;
