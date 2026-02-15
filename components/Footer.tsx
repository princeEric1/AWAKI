import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full py-8 bg-black/50 backdrop-blur-md border-t border-white/5 text-center">
      <p className="font-heading font-bold text-white text-lg">AWAKI TOURNAMENT</p>
      <p className="text-gray-500 text-sm mt-2">© 2024 Kara PES Best Gamer. All rights reserved.</p>
      <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600 font-mono">
        <span>#GamingTogo</span>
        <span>#Esports228</span>
        <span>#Kara</span>
      </div>
    </footer>
  );
};

export default Footer;