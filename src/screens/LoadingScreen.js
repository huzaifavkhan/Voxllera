// components/LoadingScreen.js
import React from 'react';
import logo from '../logo.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" className="h-20 w-20 mb-6 animate-pulse" />
      <div className="w-40 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-teal-400 via-blue-500 to-rose-400 animate-slide" />
      </div>

      <style jsx="true">{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slide {
          animation: slide 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
