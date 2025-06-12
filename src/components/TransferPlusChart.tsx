
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Award, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramDay } from '@/utils/programData';
import { createLineChartOptions } from '@/utils/chartConfig';
import StatsSummary from './StatsSummary';

interface TransferPlusChartProps {
  programData: ProgramDay[];
  stats: {
    transferPlus: {
      total: number;
    };
  };
  showAnimations: boolean;
}

const TransferPlusChart = ({ programData, stats, showAnimations }: TransferPlusChartProps) => {
  const transferPlusChartData = {
    labels: programData.map(d => d.date),
    datasets: [{
      label: 'Çalışılan Saatler',
      data: programData.map(d => d.transferPlusValue || 0),
      borderColor: 'rgba(249, 115, 22, 1)',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(249, 115, 22, 1)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'rgba(249, 115, 22, 1)',
      pointHoverBorderColor: 'white',
      pointHoverBorderWidth: 3,
    }]
  };

  const lineChartOptions = createLineChartOptions(showAnimations);

  return (
    <Card className="shadow-2xl border border-orange-700/60 bg-gray-800/80 backdrop-blur-sm hover-lift animate-scale-in mb-12 sm:mb-16 mx-4 sm:mx-0">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-4 text-center font-['Poppins'] text-gray-200">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-pink-700 rounded-xl shadow-sm">
              <Award className="h-6 w-6 text-white" />
            </div>
            TransferPlus Çalışma Saatleri Trendi
          </div>
          <div className="flex items-center gap-3 text-base bg-orange-900/80 text-orange-300 px-4 py-2 rounded-full border border-orange-700/60 shadow-sm justify-center sm:justify-start backdrop-blur-sm">
            <Clock className="h-4 w-4" />
            {stats.transferPlus.total.toFixed(1)} saat
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 sm:h-64 lg:h-72">
          <Line data={transferPlusChartData} options={lineChartOptions} />
        </div>
        <StatsSummary stats={stats} programData={programData} />
      </CardContent>
    </Card>
  );
};

export default TransferPlusChart;
