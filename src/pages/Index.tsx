import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Info, 
  Award, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Star,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Filter,
  Download,
  Share2,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
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
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [showAnimations, setShowAnimations] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'pending'>('all');
  const [showMotivation, setShowMotivation] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progressStreak, setProgressStreak] = useState(0);
  const chartRefs = useRef<any>({});

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
          programEntry.note = '🎉 15 Haziran, programdaki özel tatil gününüz! Tamamen dinlenin ve rahatlayın.';
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
          if (!programEntry.note) programEntry.note = '🏖️ Pazar günü, spor dışındaki diğer programlar devam ediyor.';
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
            programEntry.note = '🚀 Programın ilk günü! Disiplinli ve motive bir başlangıç yapın.';
          } else if (turkDate === '28 Haz' && programEntry.bootcamp === '-') {
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
      duration: 1000,
      easing: 'easeInOutQuart' as const
    } : false
  };

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
      duration: 1000,
      easing: 'easeInOutQuart' as const
    } : false
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-indigo-50/70 relative overflow-hidden">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-emerald-100/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-100/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto mobile-padding relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Target className="h-12 w-12 text-blue-600 animate-pulse-glow" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
            </div>
            <h1 className="mobile-heading font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent animate-gradient font-['Poppins']">
              Program Takip Panelim
            </h1>
          </div>
          <p className="mobile-text text-gray-600 max-w-3xl mx-auto leading-relaxed">
            🎯 Spor, Bootcamp ve hedeflerinizi sistematik olarak takip edin ve gelişiminizi görselleştirin.
          </p>
          
          {/* Real-time Clock and Streak */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200/50 shadow-sm">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {currentTime.toLocaleTimeString('tr-TR')}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full px-4 py-2 shadow-lg">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-bold">
                {progressStreak} günlük seri! 🔥
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Control Panel */}
        <div className="mb-8 animate-slide-up">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover-lift">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <select 
                      value={filterCompleted} 
                      onChange={(e) => setFilterCompleted(e.target.value as any)}
                      className="bg-white/90 border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    >
                      <option value="all">Tümü</option>
                      <option value="completed">Tamamlanan</option>
                      <option value="pending">Bekleyen</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-lg transition-colors border border-blue-200/50"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm">{viewMode === 'grid' ? 'Liste' : 'Grid'}</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAnimations(!showAnimations)}
                    className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1 rounded-lg transition-colors border border-purple-200/50"
                  >
                    {showAnimations ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    <span className="text-sm">Animasyonlar</span>
                  </button>
                  <button
                    onClick={() => setShowMotivation(!showMotivation)}
                    className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg transition-colors border border-emerald-200/50"
                  >
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Motivasyon</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Message */}
        {showMotivation && (
          <div className="mb-8 animate-bounce-in">
            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg text-center border border-orange-300/50">
              <p className="font-semibold mobile-text">
                {getMotivationalMessage()}
              </p>
            </div>
          </div>
        )}

        {/* Info Card */}
        <Card className="mb-8 border border-blue-200/50 bg-gradient-to-br from-blue-50/90 to-indigo-50/90 backdrop-blur-sm animate-scale-in shadow-lg hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700">
              <div className="p-2 bg-blue-100/80 rounded-lg border border-blue-200/50">
                <Info className="h-5 w-5" />
              </div>
              <span className="font-['Poppins']">Uygulama Nasıl Kullanılır?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mobile-text">
              Bu interaktif panel, günlük spor, bootcamp dersleri ve TransferPlus aktivitelerinizi takip etmenize yardımcı olur. 
              Aşağıdaki tabloda her aktivitenin yanındaki "Yapıldı" kutucuklarını işaretleyerek ilerlemenizi kaydedebilirsiniz. 
              Bootcamp ve spor için sol taraftaki genel ilerleme grafiklerini takip edebilir, TransferPlus için ise çalışma 
              saatlerinizi girerek aşağıdaki çizgi grafikte zaman içindeki gelişiminizi görebilirsiniz.
            </p>
          </CardContent>
        </Card>

        <div className={`dashboard-grid mb-8`}>
          {/* Charts Section */}
          <div className="space-y-6">
            {/* Progress Charts */}
            <Card className="shadow-lg border border-emerald-200/50 bg-white/85 backdrop-blur-sm hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-['Poppins']">
                  <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg shadow-sm">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Genel İlerleme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-600 mb-4 font-['Poppins']">Bootcamp Tamamlandı</h3>
                    <div className="relative chart-mini mx-auto mb-4">
                      <Doughnut data={bootcampChartData} options={chartOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl lg:text-3xl font-bold text-emerald-600 font-['Poppins']">
                          {stats.bootcamp.percentage.toFixed(1)}%
                        </span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1" />
                      </div>
                    </div>
                    <div className="bg-emerald-50/80 rounded-lg p-3 border border-emerald-200/50">
                      <p className="text-xs text-emerald-700 font-medium">
                        {stats.bootcamp.completed.toFixed(1)} / {stats.bootcamp.total.toFixed(1)} saat
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-600 mb-4 font-['Poppins']">Spor Tamamlandı</h3>
                    <div className="relative chart-mini mx-auto mb-4">
                      <Doughnut data={sportChartData} options={chartOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl lg:text-3xl font-bold text-blue-600 font-['Poppins']">
                          {stats.sport.percentage.toFixed(1)}%
                        </span>
                        <Activity className="h-4 w-4 text-blue-500 mt-1" />
                      </div>
                    </div>
                    <div className="bg-blue-50/80 rounded-lg p-3 border border-blue-200/50">
                      <p className="text-xs text-blue-700 font-medium">
                        {stats.sport.completed} / {stats.sport.total} gün
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Notes */}
            <Card className="shadow-lg border border-amber-200/50 bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-sm hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-700 font-['Poppins']">
                  <div className="p-2 bg-amber-100/80 rounded-lg border border-amber-200/50">
                    <Calendar className="h-5 w-5" />
                  </div>
                  Günlük Not
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white/70 rounded-lg p-4 border border-amber-200/50">
                  <p className="text-gray-700 italic leading-relaxed min-h-[60px] mobile-text">
                    {selectedDayNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program Table */}
          <div>
            <Card className="shadow-lg border border-indigo-200/50 bg-white/85 backdrop-blur-sm hover-lift animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-['Poppins']">
                  <div className="p-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg shadow-sm">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  Program Detayları
                  <span className="ml-auto text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border border-indigo-200/50">
                    {filteredData.length} gün
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto max-h-[600px] rounded-lg">
                  <table className="w-full text-sm mobile-table">
                    <thead className="bg-gradient-to-r from-gray-50/90 to-slate-50/90 border-b sticky top-0 z-10 backdrop-blur-sm">
                      <tr>
                        <th className="text-left p-3 font-semibold text-gray-700 font-['Poppins']">Tarih</th>
                        <th className="text-left p-3 font-semibold text-gray-700 font-['Poppins']">Spor</th>
                        <th className="text-center p-3 font-semibold text-gray-700">✓</th>
                        <th className="text-left p-3 font-semibold text-gray-700 font-['Poppins']">Bootcamp</th>
                        <th className="text-center p-3 font-semibold text-gray-700">✓</th>
                        <th className="text-left p-3 font-semibold text-gray-700 font-['Poppins']">TransferPlus</th>
                        <th className="text-center p-3 font-semibold text-gray-700">✓</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((day, index) => {
                        const originalIndex = programData.indexOf(day);
                        const isHoliday = day.transferPlus === 'Tatil';
                        const isSunday = day.bootcamp === 'Yok' && day.sport === 'Yok' && !isHoliday;
                        const isSelected = selectedDay === originalIndex;
                        const rowClass = isHoliday 
                          ? 'bg-gradient-to-r from-orange-50/80 to-amber-50/80 border-l-4 border-orange-300/50' 
                          : isSunday 
                          ? 'bg-gradient-to-r from-gray-50/80 to-slate-50/80 border-l-4 border-gray-300/50' 
                          : isSelected
                          ? 'bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border-l-4 border-indigo-400/50'
                          : 'bg-white/80 hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-indigo-50/60 transition-all duration-300';

                        return (
                          <tr 
                            key={originalIndex}
                            data-day-index={originalIndex}
                            className={`${rowClass} border-b border-gray-100/50 cursor-pointer interactive-card`}
                            onClick={() => {
                              setSelectedDayNote(day.note || 'Bu gün için özel bir not bulunmamaktadır.');
                              setSelectedDay(originalIndex);
                            }}
                          >
                            <td className="p-3 font-medium text-gray-900 font-['Poppins']">
                              <div className="flex items-center gap-2">
                                {day.date}
                                {isSelected && <Star className="h-3 w-3 text-amber-500" />}
                              </div>
                            </td>
                            <td className="p-3 text-gray-700">{day.sport}</td>
                            <td className="p-3 text-center">
                              {day.sport !== 'Yok' && day.sport !== 'Tatil' && day.sport !== '-' ? (
                                <input
                                  type="checkbox"
                                  checked={day.sportDone}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'sportDone', e.target.checked);
                                  }}
                                  className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 hover:scale-110"
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
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'bootcampDone', e.target.checked);
                                  }}
                                  className="w-5 h-5 text-emerald-600 bg-white border-2 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                                />
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="p-3">
                              {day.transferPlus === 'Tatil' ? (
                                <span className="text-gray-400 italic">Tatil</span>
                              ) : (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={day.transferPlusValue || ''}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'transferPlusValue', e.target.value ? parseFloat(e.target.value) : null);
                                  }}
                                  className="w-20 px-2 py-1 text-sm border-2 border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300 bg-white/90"
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
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateProgramData(originalIndex, 'transferPlusDone', e.target.checked);
                                  }}
                                  className="w-5 h-5 text-orange-600 bg-white border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 transition-all duration-200 hover:scale-110"
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
        <Card className="shadow-lg border border-orange-200/50 bg-white/85 backdrop-blur-sm hover-lift animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-center font-['Poppins']">
              <div className="p-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg shadow-sm">
                <Award className="h-5 w-5 text-white" />
              </div>
              TransferPlus Çalışma Saatleri Trendi
              <div className="ml-auto flex items-center gap-2 text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200/50">
                <Clock className="h-3 w-3" />
                {stats.transferPlus.total.toFixed(1)} saat
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <Line data={transferPlusChartData} options={lineChartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-orange-50/80 rounded-lg p-4 text-center border border-orange-200/50">
                <div className="text-2xl font-bold text-orange-600 font-['Poppins']">
                  {stats.transferPlus.total.toFixed(1)}
                </div>
                <div className="text-sm text-orange-700">Toplam Saat</div>
              </div>
              <div className="bg-blue-50/80 rounded-lg p-4 text-center border border-blue-200/50">
                <div className="text-2xl font-bold text-blue-600 font-['Poppins']">
                  {(stats.transferPlus.total / Math.max(1, programData.filter(d => d.transferPlusValue !== null && d.transferPlusValue > 0).length)).toFixed(1)}
                </div>
                <div className="text-sm text-blue-700">Ortalama/Gün</div>
              </div>
              <div className="bg-emerald-50/80 rounded-lg p-4 text-center border border-emerald-200/50">
                <div className="text-2xl font-bold text-emerald-600 font-['Poppins']">
                  {Math.max(...programData.map(d => d.transferPlusValue || 0)).toFixed(1)}
                </div>
                <div className="text-sm text-emerald-700">En Yüksek</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p className="animate-fade-in">
            🚀 Başarıya giden yolda her adım önemli! Devam et! 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
