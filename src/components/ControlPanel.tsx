
import React from 'react';
import { Filter, BarChart3, Eye, EyeOff, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ControlPanelProps {
  filterCompleted: 'all' | 'completed' | 'pending';
  setFilterCompleted: (value: 'all' | 'completed' | 'pending') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
  showAnimations: boolean;
  setShowAnimations: (value: boolean) => void;
  showMotivation: boolean;
  setShowMotivation: (value: boolean) => void;
}

const ControlPanel = ({
  filterCompleted,
  setFilterCompleted,
  viewMode,
  setViewMode,
  showAnimations,
  setShowAnimations,
  showMotivation,
  setShowMotivation
}: ControlPanelProps) => {
  return (
    <div className="mb-12 sm:mb-16 animate-slide-up">
      <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl hover-lift">
        <CardContent className="p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-gray-300" />
                <select 
                  value={filterCompleted} 
                  onChange={(e) => setFilterCompleted(e.target.value as any)}
                  className="bg-gray-700/80 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm backdrop-blur-sm"
                >
                  <option value="all">Tümü</option>
                  <option value="completed">Tamamlanan</option>
                  <option value="pending">Bekleyen</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="flex items-center gap-3 bg-blue-600/80 hover:bg-blue-500/80 text-white px-4 py-3 rounded-xl transition-colors border border-blue-500/50 shadow-sm backdrop-blur-sm"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>{viewMode === 'grid' ? 'Liste' : 'Grid'}</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowAnimations(!showAnimations)}
                className="flex items-center gap-3 bg-purple-600/80 hover:bg-purple-500/80 text-white px-4 py-3 rounded-xl transition-colors border border-purple-500/50 shadow-sm w-full sm:w-auto justify-center sm:justify-start backdrop-blur-sm"
              >
                {showAnimations ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                <span>Animasyonlar</span>
              </button>
              <button
                onClick={() => setShowMotivation(!showMotivation)}
                className="flex items-center gap-3 bg-emerald-600/80 hover:bg-emerald-500/80 text-white px-4 py-3 rounded-xl transition-colors border border-emerald-500/50 shadow-sm w-full sm:w-auto justify-center sm:justify-start backdrop-blur-sm"
              >
                <Star className="h-5 w-5" />
                <span>Motivasyon</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;
