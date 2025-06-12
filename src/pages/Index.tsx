import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgramHeader from '@/components/ProgramHeader';
import ControlPanel from '@/components/ControlPanel';
import MotivationalMessage from '@/components/MotivationalMessage';
import ProgressCharts from '@/components/ProgressCharts';
import DailyNotes from '@/components/DailyNotes';
import ProgramTable from '@/components/ProgramTable';
import TransferPlusChart from '@/components/TransferPlusChart';
import { 
  ProgramDay, 
  initializeProgramData, 
  calculateStreak, 
  calculateStats, 
  getMotivationalMessage 
} from '@/utils/programData';
import { createChartOptions } from '@/utils/chartConfig';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const Index = () => {
  const [programData, setProgramData] = useState<ProgramDay[]>([]);
  const [selectedDayNote, setSelectedDayNote] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [showAnimations, setShowAnimations] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'pending'>('all');
  const [showMotivation, setShowMotivation] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progressStreak, setProgressStreak] = useState(0);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const data = initializeProgramData();
    setProgramData(data);
    setSelectedDayNote(data[0]?.note || 'Programı takip etmek için bir gün seçin.');
    setProgressStreak(calculateStreak(data));
  }, []);

  useEffect(() => {
    setProgressStreak(calculateStreak(programData));
  }, [programData]);

  const updateProgramData = (index: number, field: keyof ProgramDay, value: any) => {
    const newData = [...programData];
    newData[index] = { ...newData[index], [field]: value };
    setProgramData(newData);
    setSelectedDayNote(newData[index].note || 'Bu gün için özel bir not bulunmamaktadır.');
    setSelectedDay(index);
  };

  const handleSelectDay = (index: number, note: string) => {
    setSelectedDayNote(note);
    setSelectedDay(index);
  };

  const stats = calculateStats(programData);

  const filteredData = programData.filter(day => {
    if (filterCompleted === 'completed') {
      return day.bootcampDone || day.sportDone || day.transferPlusDone;
    }
    if (filterCompleted === 'pending') {
      return (!day.bootcampDone && day.bootcamp !== '-' && day.bootcamp !== 'Tatil') ||
             (!day.sportDone && day.sport !== '-' && day.sport !== 'Yok' && day.sport !== 'Tatil');
    }
    return true;
  });

  const chartOptions = createChartOptions(showAnimations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Top Spacing */}
      <div className="pt-12 sm:pt-16"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Header Component */}
        <ProgramHeader currentTime={currentTime} progressStreak={progressStreak} />

        {/* Control Panel Component */}
        <ControlPanel
          filterCompleted={filterCompleted}
          setFilterCompleted={setFilterCompleted}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showAnimations={showAnimations}
          setShowAnimations={setShowAnimations}
          showMotivation={showMotivation}
          setShowMotivation={setShowMotivation}
        />

        {/* Motivational Message Component */}
        <MotivationalMessage message={getMotivationalMessage(stats)} show={showMotivation} />

        {/* Info Card */}
        <Card className="mb-12 sm:mb-16 border border-blue-700/60 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm animate-scale-in shadow-2xl hover-lift mx-4 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-blue-300">
              <div className="p-3 bg-blue-700/80 rounded-xl border border-blue-600/50 backdrop-blur-sm">
                <Info className="h-6 w-6" />
              </div>
              <span className="font-['Poppins'] text-xl">Uygulama Nasıl Kullanılır?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
              Bu interaktif panel, günlük spor, bootcamp dersleri ve TransferPlus aktivitelerinizi takip etmenize yardımcı olur. 
              Aşağıdaki tabloda her aktivitenin yanındaki "Yapıldı" kutucuklarını işaretleyerek ilerlemenizi kaydedebilirsiniz. 
              Bootcamp ve spor için sol taraftaki genel ilerleme grafiklerini takip edebilir, TransferPlus için ise çalışma 
              saatlerinizi girerek aşağıdaki çizgi grafikte zaman içindeki gelişiminizi görebilirsiniz.
            </p>
          </CardContent>
        </Card>

        {/* Daily Notes Component - moved here and made compact */}
        <div className="mb-12 sm:mb-16 px-4 sm:px-0">
          <DailyNotes selectedDayNote={selectedDayNote} />
        </div>

        <div className="space-y-8 lg:space-y-10 mb-12 sm:mb-16 px-4 sm:px-0">
          {/* Progress Charts Component */}
          <ProgressCharts stats={stats} chartOptions={chartOptions} />

          {/* Program Table Component */}
          <ProgramTable
            filteredData={filteredData}
            programData={programData}
            selectedDay={selectedDay}
            showAnimations={showAnimations}
            onUpdateProgramData={updateProgramData}
            onSelectDay={handleSelectDay}
          />
        </div>

        {/* TransferPlus Trend Chart Component */}
        <TransferPlusChart
          programData={programData}
          stats={stats}
          showAnimations={showAnimations}
        />

        {/* Footer */}
        <div className="mt-16 sm:mt-20 text-center text-gray-400 text-base pb-12 sm:pb-16">
          <p className="animate-fade-in">
            🚀 Başarıya giden yolda her adım önemli! Devam et! 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
