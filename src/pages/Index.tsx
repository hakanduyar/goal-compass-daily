import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  Award, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Star,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgramHeader from '@/components/ProgramHeader';
import ControlPanel from '@/components/ControlPanel';
import MotivationalMessage from '@/components/MotivationalMessage';
import ProgressCharts from '@/components/ProgressCharts';
import DailyNotes from '@/components/DailyNotes';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface ProgramDay {
  date: string;
  bootcamp: string;
  bootcampDone: boolean;
  sport: string;
  sportDone: boolean;
  transferPlus: string;
  transferPlusValue: number | null;
  transferPlusDone: boolean;
  note: string;
}

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

  const getTurkishDate = (date: Date) => {
    const options = { day: 'numeric', month: 'short' } as const;
    return date.toLocaleDateString('tr-TR', options).replace('.', '');
  };

  const getDayOfWeek = (date: Date) => {
    return date.getDay();
  };

  const parseHours = (text: string) => {
    if (text === 'Yok' || text === '-' || text === 'Tatil' || !text) return 0;
    let totalHours = 0;
    const parts = text.match(/(\d+)\s*saat(?:\s*(\d+)\s*dk)?/g);
    if (!parts) return 0;

    parts.forEach(part => {
      const hoursMatch = part.match(/(\d+)\s*saat/);
      const minutesMatch = part.match(/(\d+)\s*dk/);
      let hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      let minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
      totalHours += hours + (minutes / 60);
    });
    return totalHours;
  };

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    for (let i = programData.length - 1; i >= 0; i--) {
      const day = programData[i];
      if ((day.bootcampDone && day.bootcamp !== '-' && day.bootcamp !== 'Tatil') || 
          (day.sportDone && day.sport !== '-' && day.sport !== 'Yok' && day.sport !== 'Tatil')) {
        streak++;
      } else if (day.bootcamp !== '-' && day.bootcamp !== 'Tatil' || 
                 day.sport !== '-' && day.sport !== 'Yok' && day.sport !== 'Tatil') {
        break;
      }
    }
    return streak;
  };

  useEffect(() => {
    const initializeProgramData = () => {
      const startDate = new Date('2025-06-11T00:00:00');
      const data: ProgramDay[] = [];

      const bootcampLessons = [
        'Hafta3 Ödev', 'Ders 4 (6 saat)', 'Ders 4 (3 saat) + Ders 5 (3 saat)', 'Ders 5 (6 saat)', 'Ders 5 (1 saat) + Ders 6 (5 saat)',
        'Ders 6 (6 saat)', 'Ders 7 (2 saat 40 dk) + Ders 8 (3 saat 20 dk)', 'Ders 8 (2 saat 0 dk) + Ders 9 (1 saat 15 dk)',
        'Ders 10 (2 saat)', 'Ders 11 (2 saat)', 'Ders 12 (3 saat)', 'Ders 13 (3 saat)', 'Ders 14 (3 saat)',
        'Ders 15 (3 saat)', 'Ders 16 (2 saat)', 'Ders 17 (2 saat)', 'Ders 18 (1 saat 44 dk)', 'Ders 19 (1 saat 17 dk)',
        'Ders 20 (2 saat)', 'Ders 21 (3 saat)'
      ];

      let bootcampLessonAssignedCount = 0;

      for (let dayOffset = 0; dayOffset < 40; dayOffset++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + dayOffset);
        
        const turkDate = getTurkishDate(currentDay);
        const dayOfWeek = getDayOfWeek(currentDay);

        let programEntry: ProgramDay = {
          date: turkDate,
          bootcamp: '-',
          bootcampDone: false,
          sport: '-',
          sportDone: false,
          transferPlus: '',
          transferPlusValue: null,
          transferPlusDone: false,
          note: ''
        };

        if (turkDate === '15 Haz') {
          programEntry.bootcamp = 'Tatil';
          programEntry.sport = 'Tatil';
          programEntry.transferPlus = 'Tatil';
          programEntry.note = '🎉 15 Haziran, programdaki özel tatil gününüz! Tamamen dinlenin ve rahatlayın.';
          data.push(programEntry);
          continue;
        }

        // 11 Haziran'a Hafta3 Ödev ekle
        if (turkDate === '11 Haz') {
          programEntry.bootcamp = 'Hafta3 Ödev';
        } else if (turkDate === '12 Haz') {
          programEntry.bootcamp = 'Hafta3 Ödev';
        } else {
          // Bootcamp derslerini 13 Haziran'dan başlat (2 gün kaydırıldı)
          const bootcampStartDate = new Date('2025-06-13T00:00:00');
          const bootcampEndDate = new Date('2025-07-02T00:00:00');
          
          if (currentDay >= bootcampStartDate && currentDay <= bootcampEndDate) {
            if (dayOfWeek !== 0) { // Pazar değilse
              if (bootcampLessonAssignedCount < bootcampLessons.length) {
                programEntry.bootcamp = bootcampLessons[bootcampLessonAssignedCount];
                bootcampLessonAssignedCount++;
              }
            }
          }
        }

        // Spor programı
        if (dayOfWeek === 0) {
          programEntry.sport = 'Yok';
          if (!programEntry.note) programEntry.note = '🏖️ Pazar günü, spor dışındaki diğer programlar devam ediyor.';
        } else {
          // 11 Haziran (Pazartesi) ve 13 Haziran (Çarşamba) - Kardiyo-Mobilite
          if (turkDate === '11 Haz' || turkDate === '13 Haz') {
            programEntry.sport = 'Kardiyo-Mobilite';
          } 
          // 12 Haziran (Salı) ve 14 Haziran (Perşembe) - Ağırlık Antrenmanı
          else if (turkDate === '12 Haz' || turkDate === '14 Haz') {
            programEntry.sport = 'Ağırlık Antrenmanı';
          } 
          // 15 Haziran sonrası normal program
          else if (currentDay > new Date('2025-06-15T00:00:00')) {
            if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
              // Pazartesi, Çarşamba, Cuma - Ağırlık Antrenmanı
              programEntry.sport = 'Ağırlık Antrenmanı';
            } else if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
              // Salı, Perşembe, Cumartesi - Kardiyo-Mobilite
              programEntry.sport = 'Kardiyo-Mobilite';
            }
          } else {
            programEntry.sport = '-';
          }
        }
        
        if (!programEntry.note) {
          if (turkDate === '11 Haz') {
            programEntry.note = '🚀 Programın ilk günü! Disiplinli ve motive bir başlangıç yapın.';
          } else if (turkDate === '2 Tem' && programEntry.bootcamp === '-') {
            programEntry.note = '🎓 Bugün bootcamp derslerinin son günü! Tebrikler!';
          } else if (bootcampLessonAssignedCount === bootcampLessons.length) {
            programEntry.note = '✨ Tüm bootcamp dersleri tamamlandı. Başarılar dileriz!';
          }
        }

        data.push(programEntry);
      }
      
      setProgramData(data);
      setSelectedDayNote(data[0]?.note || 'Programı takip etmek için bir gün seçin.');
      setProgressStreak(calculateStreak());
    };

    initializeProgramData();
  }, []);

  useEffect(() => {
    setProgressStreak(calculateStreak());
  }, [programData]);

  const updateProgramData = (index: number, field: keyof ProgramDay, value: any) => {
    const newData = [...programData];
    newData[index] = { ...newData[index], [field]: value };
    setProgramData(newData);
    setSelectedDayNote(newData[index].note || 'Bu gün için özel bir not bulunmamaktadır.');
    setSelectedDay(index);

    // Add success animation
    if (showAnimations && field.endsWith('Done') && value) {
      const element = document.querySelector(`[data-day-index="${index}"]`);
      if (element) {
        element.classList.add('animate-success');
        setTimeout(() => element.classList.remove('animate-success'), 600);
      }
    }
  };

  const calculateStats = () => {
    let totalBootcampHours = 0;
    let completedBootcampHours = 0;
    let totalSportDays = 0;
    let completedSportDays = 0;
    let totalTransferPlusHours = 0;

    programData.forEach(day => {
      const hours = parseHours(day.bootcamp);
      if (hours > 0) {
        totalBootcampHours += hours;
        if (day.bootcampDone) {
          completedBootcampHours += hours;
        }
      }

      if (day.sport !== 'Yok' && day.sport !== 'Tatil' && day.sport !== '-') {
        totalSportDays += 1;
        if (day.sportDone) {
          completedSportDays += 1;
        }
      }

      if (day.transferPlusValue !== null && day.transferPlusValue > 0) {
        totalTransferPlusHours += day.transferPlusValue;
      }
    });

    return {
      bootcamp: {
        completed: completedBootcampHours,
        total: totalBootcampHours,
        percentage: totalBootcampHours > 0 ? (completedBootcampHours / totalBootcampHours * 100) : 0
      },
      sport: {
        completed: completedSportDays,
        total: totalSportDays,
        percentage: totalSportDays > 0 ? (completedSportDays / totalSportDays * 100) : 0
      },
      transferPlus: {
        total: totalTransferPlusHours
      }
    };
  };

  const stats = calculateStats();

  const getMotivationalMessage = () => {
    const totalProgress = (stats.bootcamp.percentage + stats.sport.percentage) / 2;
    if (totalProgress >= 80) return "🔥 Harika gidiyorsun! Şampiyon gibi!";
    if (totalProgress >= 60) return "💪 Çok iyi! Hedeflerin yakın!";
    if (totalProgress >= 40) return "⚡ İyi gidiyor! Devam et!";
    if (totalProgress >= 20) return "🌟 Başlangıç güzel! Momentum yakala!";
    return "🚀 Başlayalım! Her büyük yolculuk ilk adımla başlar!";
  };

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
            const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
    animation: showAnimations ? {
      animateRotate: true,
      animateScale: true,
      duration: 1000
    } : false
  } as const;

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

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(249, 115, 22, 0.5)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Tarih', color: '#6B7280' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        ticks: { color: '#6B7280' }
      },
      y: {
        title: { display: true, text: 'Saat', color: '#6B7280' },
        beginAtZero: true,
        suggestedMax: 8,
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        ticks: { color: '#6B7280' }
      }
    },
    animation: showAnimations ? {
      duration: 1000
    } : false
  } as const;

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
        <MotivationalMessage message={getMotivationalMessage()} show={showMotivation} />

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

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-12 sm:mb-16 px-4 sm:px-0`}>
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-10">
            {/* Progress Charts Component */}
            <ProgressCharts stats={stats} chartOptions={chartOptions} />

            {/* Program Table */}
            <Card className="shadow-2xl border border-gray-700/60 bg-gray-800/80 backdrop-blur-sm hover-lift animate-slide-up">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-4 font-['Poppins'] text-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl shadow-sm">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    Program Detayları
                  </div>
                  <span className="text-sm bg-gray-700/80 text-gray-300 px-4 py-2 rounded-full border border-gray-600/60 shadow-sm backdrop-blur-sm">
                    {filteredData.length} gün
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto max-h-[500px] lg:max-h-[600px] rounded-lg">
                  <table className="w-full text-sm sm:text-base">
                    <thead className="bg-gradient-to-r from-gray-700/95 to-gray-600/95 border-b sticky top-0 z-10 backdrop-blur-sm">
                      <tr>
                        <th className="text-left p-3 sm:p-4 font-semibold text-gray-200 font-['Poppins']">Tarih</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-gray-200 font-['Poppins']">Spor</th>
                        <th className="text-center p-3 sm:p-4 font-semibold text-gray-200">✓</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-gray-200 font-['Poppins']">Bootcamp</th>
                        <th className="text-center p-3 sm:p-4 font-semibold text-gray-200">✓</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-gray-200 font-['Poppins']">TransferPlus</th>
                        <th className="text-center p-3 sm:p-4 font-semibold text-gray-200">✓</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((day, index) => {
                        const originalIndex = programData.indexOf(day);
                        const isHoliday = day.transferPlus === 'Tatil';
                        const isSunday = day.bootcamp === 'Yok' && day.sport === 'Yok' && !isHoliday;
                        const isSelected = selectedDay === originalIndex;
                        const rowClass = isHoliday 
                          ? 'bg-gradient-to-r from-orange-900/80 to-amber-900/80 border-l-4 border-orange-500/80' 
                          : isSunday 
                          ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-l-4 border-gray-500/80' 
                          : isSelected
                          ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-l-4 border-blue-500/80'
                          : 'bg-gray-900/50 hover:bg-gradient-to-r hover:from-gray-800/80 hover:to-gray-700/80 transition-all duration-300';

                        return (
                          <tr 
                            key={originalIndex}
                            data-day-index={originalIndex}
                            className={`${rowClass} border-b border-gray-700/50 cursor-pointer interactive-card`}
                            onClick={() => {
                              setSelectedDayNote(day.note || 'Bu gün için özel bir not bulunmamaktadır.');
                              setSelectedDay(originalIndex);
                            }}
                          >
                            <td className="p-3 sm:p-4 font-medium text-gray-200 font-['Poppins']">
                              <div className="flex items-center gap-3">
                                {day.date}
                                {isSelected && <Star className="h-4 w-4 text-amber-400" />}
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 text-gray-300">{day.sport}</td>
                            <td className="p-3 sm:p-4 text-center">
                              {day.sport !== 'Yok' && day.sport !== 'Tatil' && day.sport !== '-' ? (
                                <input
                                  type="checkbox"
                                  checked={day.sportDone}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'sportDone', e.target.checked);
                                  }}
                                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 bg-gray-700 border-2 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                                />
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </td>
                            <td className="p-3 sm:p-4 text-gray-300">{day.bootcamp}</td>
                            <td className="p-3 sm:p-4 text-center">
                              {day.bootcamp !== 'Yok' && day.bootcamp !== '-' && day.bootcamp !== 'Tatil' ? (
                                <input
                                  type="checkbox"
                                  checked={day.bootcampDone}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'bootcampDone', e.target.checked);
                                  }}
                                  className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 bg-gray-700 border-2 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                                />
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </td>
                            <td className="p-3 sm:p-4">
                              {day.transferPlus === 'Tatil' ? (
                                <span className="text-gray-400 italic text-sm">Tatil</span>
                              ) : (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={day.transferPlusValue || ''}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'transferPlusValue', e.target.value ? parseFloat(e.target.value) : null);
                                  }}
                                  className="w-20 sm:w-24 px-2 sm:px-3 py-2 text-sm sm:text-base border-2 border-gray-600 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-400 bg-gray-700/80 text-gray-200 backdrop-blur-sm"
                                  placeholder="0"
                                />
                              )}
                            </td>
                            <td className="p-3 sm:p-4 text-center">
                              {day.transferPlus === 'Tatil' ? (
                                <span className="text-gray-500">—</span>
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={day.transferPlusDone}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'transferPlusDone', e.target.checked);
                                  }}
                                  className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 bg-gray-700 border-2 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Notes Component */}
          <DailyNotes selectedDayNote={selectedDayNote} />
        </div>

        {/* TransferPlus Trend Chart */}
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
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-orange-900/80 rounded-xl p-6 text-center border border-orange-700/60 shadow-sm backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-orange-300 font-['Poppins']">
                  {stats.transferPlus.total.toFixed(1)}
                </div>
                <div className="text-base text-orange-400 mt-2">Toplam Saat</div>
              </div>
              <div className="bg-blue-900/80 rounded-xl p-6 text-center border border-blue-700/60 shadow-sm backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-blue-300 font-['Poppins']">
                  {(stats.transferPlus.total / Math.max(1, programData.filter(d => d.transferPlusValue !== null && d.transferPlusValue > 0).length)).toFixed(1)}
                </div>
                <div className="text-base text-blue-400 mt-2">Ortalama/Gün</div>
              </div>
              <div className="bg-emerald-900/80 rounded-xl p-6 text-center border border-emerald-700/60 shadow-sm backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-['Poppins']">
                  {Math.max(...programData.map(d => d.transferPlusValue || 0)).toFixed(1)}
                </div>
                <div className="text-base text-emerald-400 mt-2">En Yüksek</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
