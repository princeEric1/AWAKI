import React from 'react';
import { ArrowDownCircle, Gamepad2, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 pt-20 pb-10">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none animate-pulse-fast"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[96px] pointer-events-none"></div>

      <div className="z-20 text-center max-w-6xl mx-auto space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-accent text-sm font-mono tracking-wider mb-2 animate-float">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
          INSCRIPTIONS OUVERTES
        </div>

        {/* Logo Section - INTEGRATED SVG (No external file needed) */}
        <div className="relative w-full max-w-4xl mx-auto px-4 my-8 flex justify-center items-center">
           {/* Ambient light behind logo */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-r from-success/20 via-primary/20 to-accent/20 blur-[80px] rounded-full pointer-events-none"></div>
           
           <svg viewBox="0 0 600 200" className="w-full h-auto max-w-[600px] drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500">
             <defs>
               <linearGradient id="textGrad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#FFFFFF" />
                 <stop offset="100%" stopColor="#E2E8F0" />
               </linearGradient>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>

             {/* Main Text AWAKI */}
             <text 
               x="50%" 
               y="130" 
               textAnchor="middle" 
               fontFamily="'Orbitron', sans-serif" 
               fontWeight="900" 
               fontSize="130" 
               fill="url(#textGrad)"
               stroke="#8B5CF6"
               strokeWidth="2"
               filter="url(#glow)"
               className="tracking-tighter"
               style={{ textShadow: '0 0 30px rgba(139,92,246,0.6)' }}
             >
               AWAKI
             </text>

             {/* Subtitle Badge Background */}
             <path d="M120 145 H480 L470 175 H110 Z" fill="#10B981" />

             {/* Subtitle Text */}
             <text 
               x="295" 
               y="166" 
               textAnchor="middle" 
               fontFamily="'Orbitron', sans-serif" 
               fontWeight="700" 
               fontSize="20" 
               fill="#020617" 
               letterSpacing="2"
             >
               KARA PES BEST GAMER
             </text>
             
             {/* Decorative Controller Icon Left */}
             <path d="M70 140 C70 140 50 120 70 100 C90 80 110 100 110 100" stroke="#3B82F6" strokeWidth="4" fill="none" opacity="0.5" />
             {/* Decorative Controller Icon Right */}
             <path d="M530 140 C530 140 550 120 530 100 C510 80 490 100 490 100" stroke="#3B82F6" strokeWidth="4" fill="none" opacity="0.5" />
           </svg>
        </div>

        <p className="text-gray-300 font-subheading text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mt-4">
          Le tournoi qui révèle les <span className="text-primary font-bold">légendes</span> du gaming togolais.
          Affronte les meilleurs, repars avec la gloire.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8 w-full md:w-auto">
          <button 
            onClick={scrollToForm}
            className="group relative px-8 py-4 bg-primary hover:bg-violet-600 text-white font-heading font-bold text-lg rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] w-full md:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <span className="flex items-center justify-center gap-3">
              <Gamepad2 className="w-6 h-6" />
              JE M'INSCRIS MAINTENANT
            </span>
          </button>

          <a 
            href="https://chat.whatsapp.com/GWRLRtn2vDJIaBTe2yC55v"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-heading font-bold text-lg rounded-sm transition-all duration-300 hover:scale-105 w-full md:w-auto overflow-hidden flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
            REJOINDRE LE GROUPE
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDownCircle className="w-10 h-10 text-white" />
      </div>
    </section>
  );
};

export default Hero;