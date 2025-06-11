
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { TrendingUp, CheckCircle2, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
  bootcamp: {
    completed: number;
    total: number;
    percentage: number;
  };
  sport: {
    completed: number;
    total: number;
    percentage: number;
  };
}

interface ProgressChartsProps {
  stats: Stats;
  chartOptions: any;
}

const ProgressCharts = ({ stats, chartOptions }: ProgressChartsProps) => {
  const bootcampChartData = {
    labels: ['Tamamlandı', 'Kalan'],
    datasets: [{
      data: [stats.bootcamp.completed, Math.max(0, stats.bootcamp.total - stats.bootcamp.completed)],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(229, 231, 235, 0.8)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(229, 231, 235, 1)'
      ],
      borderWidth: 2,
      cutout: '75%',
      hoverBackgroundColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(229, 231, 235, 1)'
      ],
      hoverBorderWidth: 3,
    }]
  };

  const sportChartData = {
    labels: ['Tamamlandı', 'Kalan'],
    datasets: [{
      data: [stats.sport.completed, Math.max(0, stats.sport.total - stats.sport.completed)],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(229, 231, 235, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(229, 231, 235, 1)'
      ],
      borderWidth: 2,
      cutout: '75%',
      hoverBackgroundColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(229, 231, 235, 1)'
      ],
      hoverBorderWidth: 3,
    }]
  };

  return (
    <Card className="shadow-2xl border border-gray-700/60 bg-gray-800/80 backdrop-blur-sm hover-lift animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 font-['Poppins'] text-gray-200">
          <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow-sm">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          Genel İlerleme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
          <div className="text-center">
            <h3 className="text-base font-semibold text-gray-300 mb-6 font-['Poppins']">Bootcamp Tamamlandı</h3>
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto mb-6">
              <Doughnut data={bootcampChartData} options={chartOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 font-['Poppins']">
                  {stats.bootcamp.percentage.toFixed(1)}%
                </span>
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 mt-2" />
              </div>
            </div>
            <div className="bg-emerald-900/80 rounded-xl p-4 border border-emerald-700/60 shadow-sm backdrop-blur-sm">
              <p className="text-sm text-emerald-300 font-medium">
                {stats.bootcamp.completed.toFixed(1)} / {stats.bootcamp.total.toFixed(1)} saat
              </p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-base font-semibold text-gray-300 mb-6 font-['Poppins']">Spor Tamamlandı</h3>
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto mb-6">
              <Doughnut data={sportChartData} options={chartOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 font-['Poppins']">
                  {stats.sport.percentage.toFixed(1)}%
                </span>
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-2" />
              </div>
            </div>
            <div className="bg-blue-900/80 rounded-xl p-4 border border-blue-700/60 shadow-sm backdrop-blur-sm">
              <p className="text-sm text-blue-300 font-medium">
                {stats.sport.completed} / {stats.sport.total} gün
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCharts;
