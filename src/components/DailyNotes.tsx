
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DailyNotesProps {
  selectedDayNote: string;
}

const DailyNotes = ({ selectedDayNote }: DailyNotesProps) => {
  return (
    <Card className="shadow-2xl border border-amber-700/60 bg-gradient-to-br from-amber-900/80 to-orange-900/80 backdrop-blur-sm hover-lift animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-amber-300 font-['Poppins']">
          <div className="p-3 bg-amber-700/80 rounded-xl border border-amber-600/60 backdrop-blur-sm">
            <Calendar className="h-6 w-6" />
          </div>
          Günlük Not
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-amber-800/40 rounded-xl p-6 border border-amber-600/60 shadow-sm backdrop-blur-sm">
          <p className="text-amber-100 italic leading-relaxed min-h-[100px] sm:min-h-[140px] text-base sm:text-lg flex items-center justify-center text-center">
            {selectedDayNote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyNotes;
