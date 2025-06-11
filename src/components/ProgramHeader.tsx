
import React from 'react';
import { Target, Clock, Zap } from 'lucide-react';

interface ProgramHeaderProps {
  currentTime: Date;
  progressStreak: number;
}

const ProgramHeader = ({ currentTime, progressStreak }: ProgramHeaderProps) => {
  return (
    <div className="text-center mb-16 sm:mb-20 animate-fade-in">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="relative">
          <Target className="h-12 w-12 sm:h-14 sm:w-14 text-blue-400 animate-pulse-glow" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-bounce"></div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient font-['Poppins']">
          Program Takip Panelim
        </h1>
      </div>
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
        🎯 Spor, Bootcamp ve hedeflerinizi sistematik olarak takip edin ve gelişiminizi görselleştirin.
      </p>
      
      {/* Real-time Clock and Streak */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
        <div className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/50 shadow-2xl">
          <Clock className="h-5 w-5 text-blue-400" />
          <span className="text-base font-medium text-gray-200">
            {currentTime.toLocaleTimeString('tr-TR')}
          </span>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-full px-6 py-3 shadow-2xl">
          <Zap className="h-5 w-5" />
          <span className="text-base font-bold">
            {progressStreak} günlük seri! 🔥
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgramHeader;
