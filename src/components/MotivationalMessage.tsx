
import React from 'react';

interface MotivationalMessageProps {
  message: string;
  show: boolean;
}

const MotivationalMessage = ({ message, show }: MotivationalMessageProps) => {
  if (!show) return null;

  return (
    <div className="mb-12 sm:mb-16 animate-bounce-in px-4 sm:px-0">
      <div className="bg-gradient-to-r from-amber-600 via-orange-700 to-red-700 text-white p-8 rounded-2xl shadow-2xl text-center border border-orange-600/50 mx-auto max-w-4xl backdrop-blur-sm">
        <p className="font-semibold text-lg sm:text-xl">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MotivationalMessage;
