
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { CheckCircle2, Target, TrendingUp, Calendar, Info, Award, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  useEffect(() => {
    const initializeProgramData = () => {
      const startDate = new Date('2025-06-11T00:00:00');
      const data: ProgramDay[] = [];

      const bootcampLessons = [
        'Ders 4 (6 saat)', 'Ders 4 (3 saat) + Ders 5 (3 saat)', 'Ders 5 (6 saat)', 'Ders 5 (1 saat) + Ders 6 (5 saat)',
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
        const currentWeekNum = Math.floor(dayOffset / 7) + 1;

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
          programEntry.note = '15 Haziran, programdaki özel tatil gününüz! Tamamen dinlenin ve rahatlayın.';
          data.push(programEntry);
          continue;
        }

        const bootcampEndDate = new Date('2025-06-28T00:00:00');
        if (currentDay <= bootcampEndDate) {
          if (bootcampLessonAssignedCount < bootcampLessons.length) {
            if (dayOfWeek !== 0) {
              programEntry.bootcamp = bootcampLessons[bootcampLessonAssignedCount];
              bootcampLessonAssignedCount++;
            }
          } else {
            programEntry.bootcamp = '-';
          }
        } else {
          programEntry.bootcamp = '-';
        }

        if (dayOfWeek === 0) {
          programEntry.sport = 'Yok';
          if (!programEntry.note) programEntry.note = 'Pazar günü, spor dışındaki diğer programlar devam ediyor.';
        } else if (currentWeekNum === 1) {
          if (dayOfWeek === 3 || dayOfWeek === 5) {
            programEntry.sport = 'Kardiyo-Mobilite';
          } else {
            programEntry.sport = '-';
          }
        } else {
          if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
            programEntry.sport = 'Kardiyo-Mobilite';
          } else {
            programEntry.sport = '-';
          }
        }
        
        if (!programEntry.note) {
          if (turkDate === '11 Haz') {
            programEntry.note = 'Programın ilk günü! Disiplinli ve motive bir başlangıç yapın.';
          } else if (turkDate === '28 Haz' && programEntry.bootcamp === '-') {
            programEntry.note = 'Bugün bootcamp derslerinin son günü! Tebrikler!';
          } else if (bootcampLessonAssignedCount === bootcampLessons.length) {
            programEntry.note = 'Tüm bootcamp dersleri tamamlandı. Başarılar dileriz!';
          }
        }

        data.push(programEntry);
      }
      
      setProgramData(data);
      setSelectedDayNote(data[0]?.note || 'Programı takip etmek için bir gün seçin.');
    };

    initializeProgramData();
  }, []);

  const updateProgramData = (index: number, field: keyof ProgramDay, value: any) => {
    const newData = [...programData];
    newData[index] = { ...newData[index], [field]: value };
    setProgramData(newData);
    setSelectedDayNote(newData[index].note || 'Bu gün için özel bir not bulunmamaktadır.');
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

  const bootcampChartData = {
    labels: ['Tamamlandı', 'Kalan'],
    datasets: [{
      data: [stats.bootcamp.completed, stats.bootcamp.total - stats.bootcamp.completed],
      backgroundColor: ['#10b981', '#e5e7eb'],
      borderWidth: 0,
      cutout: '70%'
    }]
  };

  const sportChartData = {
    labels: ['Tamamlandı', 'Kalan'],
    datasets: [{
      data: [stats.sport.completed, stats.sport.total - stats.sport.completed],
      backgroundColor: ['#3b82f6', '#e5e7eb'],
      borderWidth: 0,
      cutout: '70%'
    }]
  };

  const transferPlusChartData = {
    labels: programData.map(d => d.date),
    datasets: [{
      label: 'Çalışılan Saatler',
      data: programData.map(d => d.transferPlusValue || 0),
      borderColor: '#f97316',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: '#f97316',
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
            const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: 'Tarih' }
      },
      y: {
        title: { display: true, text: 'Saat' },
        beginAtZero: true,
        suggestedMax: 8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Program Takip Panelim
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Spor, Bootcamp ve diğer hedeflerinizi sistematik olarak takip edin ve gelişiminizi görselleştirin.
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Info className="h-5 w-5" />
              Uygulama Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Bu interaktif panel, günlük spor, bootcamp dersleri ve TransferPlus aktivitelerinizi takip etmenize yardımcı olur. 
              Aşağıdaki tabloda her aktivitenin yanındaki "Yapıldı" kutucuklarını işaretleyerek ilerlemenizi kaydedebilirsiniz. 
              Bootcamp ve spor için sol taraftaki genel ilerleme grafiklerini takip edebilir, TransferPlus için ise çalışma 
              saatlerinizi girerek aşağıdaki çizgi grafikte zaman içindeki gelişiminizi görebilirsiniz.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
          {/* Charts Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Progress Charts */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  Genel İlerleme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-600 mb-4">Bootcamp Tamamlandı</h3>
                    <div className="relative h-40 w-40 mx-auto">
                      <Doughnut data={bootcampChartData} options={chartOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-emerald-600">
                          {stats.bootcamp.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stats.bootcamp.completed.toFixed(1)} / {stats.bootcamp.total.toFixed(1)} saat
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-600 mb-4">Spor Tamamlandı</h3>
                    <div className="relative h-40 w-40 mx-auto">
                      <Doughnut data={sportChartData} options={chartOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {stats.sport.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stats.sport.completed} / {stats.sport.total} gün
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Notes */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Calendar className="h-5 w-5" />
                  Günlük Not
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic leading-relaxed min-h-[60px]">
                  {selectedDayNote}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Program Table */}
          <div className="xl:col-span-3">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Program Detayları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b sticky top-0">
                      <tr>
                        <th className="text-left p-3 font-semibold text-gray-700">Tarih</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Spor</th>
                        <th className="text-center p-3 font-semibold text-gray-700">✓</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Bootcamp</th>
                        <th className="text-center p-3 font-semibold text-gray-700">✓</th>
                        <th className="text-left p-3 font-semibold text-gray-700">TransferPlus</th>
                        <th className="text-center p-3 font-semibold text-gray-700">✓</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programData.map((day, index) => {
                        const isHoliday = day.transferPlus === 'Tatil';
                        const isSunday = day.bootcamp === 'Yok' && day.sport === 'Yok' && !isHoliday;
                        const rowClass = isHoliday 
                          ? 'bg-orange-50 border-l-4 border-orange-200' 
                          : isSunday 
                          ? 'bg-gray-50 border-l-4 border-gray-200' 
                          : 'bg-white hover:bg-blue-50/50 transition-colors';

                        return (
                          <tr 
                            key={index} 
                            className={`${rowClass} border-b cursor-pointer`}
                            onClick={() => setSelectedDayNote(day.note || 'Bu gün için özel bir not bulunmamaktadır.')}
                          >
                            <td className="p-3 font-medium text-gray-900">{day.date}</td>
                            <td className="p-3 text-gray-700">{day.sport}</td>
                            <td className="p-3 text-center">
                              {day.sport !== 'Yok' && day.sport !== 'Tatil' && day.sport !== '-' ? (
                                <input
                                  type="checkbox"
                                  checked={day.sportDone}
                                  onChange={(e) => updateProgramData(index, 'sportDone', e.target.checked)}
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="p-3 text-gray-700">{day.bootcamp}</td>
                            <td className="p-3 text-center">
                              {day.bootcamp !== 'Yok' && day.bootcamp !== '-' && day.bootcamp !== 'Tatil' ? (
                                <input
                                  type="checkbox"
                                  checked={day.bootcampDone}
                                  onChange={(e) => updateProgramData(index, 'bootcampDone', e.target.checked)}
                                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                                />
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="p-3">
                              {day.transferPlus === 'Tatil' ? (
                                <span className="text-gray-400">Tatil</span>
                              ) : (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={day.transferPlusValue || ''}
                                  onChange={(e) => updateProgramData(index, 'transferPlusValue', e.target.value ? parseFloat(e.target.value) : null)}
                                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                                  placeholder="0"
                                />
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {day.transferPlus === 'Tatil' ? (
                                <span className="text-gray-400">—</span>
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={day.transferPlusDone}
                                  onChange={(e) => updateProgramData(index, 'transferPlusDone', e.target.checked)}
                                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
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
        </div>

        {/* TransferPlus Trend Chart */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center">
              <Award className="h-5 w-5 text-orange-600" />
              TransferPlus Çalışma Saatleri Trendi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <Line data={transferPlusChartData} options={lineChartOptions} />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Toplam Loglanan TransferPlus Çalışma Saati: {stats.transferPlus.total.toFixed(1)} saat
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
