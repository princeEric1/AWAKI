import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import KonamiCode from './components/KonamiCode';

const App: React.FC = () => {
  const [konamiActive, setKonamiActive] = useState(false);

  // Easter Egg Trigger
  const handleKonami = () => {
    setKonamiActive(true);
    alert('🎮 MODE TRICHE ACTIVÉ : Just kidding, good luck! 🎮');
  };

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-500 ${konamiActive ? 'hue-rotate-90' : ''}`}>
      <ParticlesBackground />
      
      {/* Easter Egg Listener */}
      <KonamiCode onActivate={handleKonami} />

      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <Features />
        
        <div id="inscription" className="w-full max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-4">
              REJOINS L'ARÈNE
            </h2>
            <p className="text-gray-400 font-subheading text-xl">
              Les places sont limitées. Sécurise ton slot maintenant.
            </p>
          </div>
          
          <RegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;