
import React from 'react';
import { Star, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramDay } from '@/utils/programData';

interface ProgramTableProps {
  filteredData: ProgramDay[];
  programData: ProgramDay[];
  selectedDay: number;
  showAnimations: boolean;
  onUpdateProgramData: (index: number, field: keyof ProgramDay, value: any) => void;
  onSelectDay: (index: number, note: string) => void;
}

const ProgramTable = ({
  filteredData,
  programData,
  selectedDay,
  showAnimations,
  onUpdateProgramData,
  onSelectDay
}: ProgramTableProps) => {
  const handleUpdateProgramData = (index: number, field: keyof ProgramDay, value: any) => {
    onUpdateProgramData(index, field, value);

    // Add success animation
    if (showAnimations && field.endsWith('Done') && value) {
      const element = document.querySelector(`[data-day-index="${index}"]`);
      if (element) {
        element.classList.add('animate-success');
        setTimeout(() => element.classList.remove('animate-success'), 600);
      }
    }
  };

  return (
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
                    onClick={() => onSelectDay(originalIndex, day.note || 'Bu gün için özel bir not bulunmamaktadır.')}
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
                            handleUpdateProgramData(originalIndex, 'sportDone', e.target.checked);
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
                            handleUpdateProgramData(originalIndex, 'bootcampDone', e.target.checked);
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
                            handleUpdateProgramData(originalIndex, 'transferPlusValue', e.target.value ? parseFloat(e.target.value) : null);
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
                            handleUpdateProgramData(originalIndex, 'transferPlusDone', e.target.checked);
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
  );
};

export default ProgramTable;
