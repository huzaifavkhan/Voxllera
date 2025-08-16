import React, { useState, useEffect } from 'react';
import { PhoneCall, PhoneOff, Loader2, Volume2, Mic } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';
import '../index.css';
import '../styles.css';
import logo from '../logo.png';

const Dashboard = () => {
  const ELEVENLABS_AGENT_ID = "agent_01k0nzstjne8htam1e6dwybagg";
  const ELEVENLABS_API_KEY = "sk_5c0f3c3e054ab9119772043749e2efa2cece87d8105803ba";

  const [isMicGranted, setIsMicGranted] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const { startSession, endSession, status } = useConversation({
    apiKey: ELEVENLABS_API_KEY,
    agentId: ELEVENLABS_AGENT_ID,
    onError: () => {},
    onStartSpeaking: () => setSpeaking(true),
    onStopSpeaking: () => setSpeaking(false),
  });

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicGranted(true);
        stream.getTracks().forEach(t => t.stop());
      } catch {
        setIsMicGranted(false);
      }
    })();
  }, []);

  const toggleCall = async () => {
    if (!isMicGranted) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicGranted(true);
        s.getTracks().forEach(t => t.stop());
      } catch {
        return;
      }
    }
    if (status === 'connected') await endSession();
    else await startSession({ connectionType: 'webrtc' });
  };

  const isBusy = status === 'connecting' || status === 'disconnecting';
  const isConnected = status === 'connected';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-red-100 text-slate-800 font-sans flex flex-col items-center px-4 pt-32 pb-4">
      <header className="absolute top-0 left-0 p-6 flex items-center gap-3">
        <img src={logo} alt="Voxllera" className="h-12 w-auto object-contain" />
        <span className="text-2xl font-bold text-slate-600 leading-tight">VOXLLERA</span>
      </header>

      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Orb Container */}
        <div className="relative w-64 h-64 rounded-full shadow-2xl animate-pulse-slow flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-radial-glow" />
          <div className="relative z-10 w-48 h-48 rounded-full bg-white bg-opacity-30 backdrop-blur-md flex flex-col items-center justify-center border border-white border-opacity-50 shadow-inner">
            {isBusy ? (
              <Loader2 className="animate-spin text-white" size={40} />
            ) : (
              <>
                {isConnected ? (
                  <PhoneOff className="text-white" size={36} />
                ) : (
                  <PhoneCall className="text-white" size={36} />
                )}
                {speaking ? (
                  <Volume2 className="text-white mt-2 animate-bounce" size={20} />
                ) : isConnected ? (
                  <div className="flex items-center gap-1 justify-center mt-4">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-teal-400 to-teal-300 rounded-full animate-waveform"
                        style={{ height: `${[20, 35, 25, 40, 15, 30, 25][i]}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4 max-w-2xl mt-6">
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-slate-800 leading-tight px-4 text-center">
            Speak with your
            <span className="bg-gradient-to-r from-sky-800 via-teal-800 to-rose-800 bg-clip-text text-transparent block">
              AI Receptionist
            </span>
          </h1>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mb-12 space-y-9 w-full max-w-md flex flex-col items-center">
        {isConnected && (
          speaking ? (
            <div className="flex items-center justify-center gap-3 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              <Volume2 size={20} className="animate-bounce" />
              <span className="font-medium">Agent Speaking...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-teal-600 bg-teal-50 px-4 py-2 sm:mt-4 mt-3 rounded-full">
              <Mic size={20} className="animate-pulse" />
              <span className="font-medium">Listening...</span>
            </div>
          )
        )}
        {!isMicGranted && status === 'disconnected' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 sm:mt-4 mt-3.5 rounded-full text-sm text-center">
            🎤 Microphone access is required to proceed
          </div>
        )}
      </div>

      {/* Call Button - Centered */}
      <div className="w-full max-w-md -mt-4 flex justify-center">
        <button
          onClick={toggleCall}
          disabled={isBusy}
          className={`sm:mb-4 px-6 sm:px-10 py-3 sm:py-4 text-[clamp(1rem,2.5vw,1.25rem)] font-semibold rounded-2xl transition-all duration-300 shadow-lg ${
            isConnected
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
              : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white'
          } ${isBusy ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-xl'}`}
        >
          {status === 'connecting'
            ? 'Connecting...'
            : status === 'disconnecting'
            ? 'Ending Call...'
            : isConnected
            ? 'End Call'
            : 'Call Voxllera'}
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-sm text-slate-600 text-center">
        <span className="text-slate-500 font-medium">Voxllera Healthcare AI</span>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes waveform {
          0%,100% { transform: scaleY(0.3); opacity:0.7; }
          50% { transform: scaleY(1); opacity:1; }
        }

        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 60px rgba(14, 165, 233, 0.4), 0 0 100px rgba(99, 102, 241, 0.3);
          }
          50% {
            box-shadow: 0 0 90px rgba(236, 72, 153, 0.4), 0 0 130px rgba(20, 184, 166, 0.35);
          }
        }

        @keyframes move-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-waveform {
          animation: waveform 1.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .bg-radial-glow {
          background: radial-gradient(circle at center, rgba(34,211,238,0.8), rgba(139,92,246,0.4), rgba(255,255,255,0.1));
          background-size: 200% 200%;
          animation: move-bg 8s ease infinite;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
