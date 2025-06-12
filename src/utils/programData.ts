
export interface ProgramDay {
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

export const getTurkishDate = (date: Date) => {
  const options = { day: 'numeric', month: 'short' } as const;
  return date.toLocaleDateString('tr-TR', options).replace('.', '');
};

export const getDayOfWeek = (date: Date) => {
  return date.getDay();
};

export const parseHours = (text: string) => {
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

export const initializeProgramData = (): ProgramDay[] => {
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

    // 11 ve 12 Haziran'a Hafta3 Ödev ekle
    if (turkDate === '11 Haz' || turkDate === '12 Haz') {
      programEntry.bootcamp = 'Hafta3 Ödev';
    } else {
      // Bootcamp derslerini 13 Haziran'dan başlat
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
  
  return data;
};

export const calculateStreak = (programData: ProgramDay[]) => {
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

export const calculateStats = (programData: ProgramDay[]) => {
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

export const getMotivationalMessage = (stats: ReturnType<typeof calculateStats>) => {
  const totalProgress = (stats.bootcamp.percentage + stats.sport.percentage) / 2;
  if (totalProgress >= 80) return "🔥 Harika gidiyorsun! Şampiyon gibi!";
  if (totalProgress >= 60) return "💪 Çok iyi! Hedeflerin yakın!";
  if (totalProgress >= 40) return "⚡ İyi gidiyor! Devam et!";
  if (totalProgress >= 20) return "🌟 Başlangıç güzel! Momentum yakala!";
  return "🚀 Başlayalım! Her büyük yolculuk ilk adımla başlar!";
};
