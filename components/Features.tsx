import React from 'react';
import { Trophy, Users, MonitorPlay, Target, Gift, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "La Compétition",
      desc: "Format à élimination directe. Solo ou Duo. Prouve que tu es le roi du terrain virtuel.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Catégories",
      desc: "Junior (-18 ans) pour les espoirs, Pro (+18 ans) pour les vétérans. Chacun sa ligue.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Récompenses",
      desc: "Cash prizes importants, trophées exclusifs AWAKI et goodies gaming pour les podiums.",
    },
  ];

  const experience = [
    {
      icon: <MonitorPlay className="w-6 h-6 text-secondary" />,
      text: "Setup Pro PS5/Xbox Series X sur écrans 4K"
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary" />,
      text: "Ambiance Esports avec scènes et lumières"
    },
    {
      icon: <Gift className="w-6 h-6 text-secondary" />,
      text: "Zone chill & goodies pour les visiteurs"
    }
  ];

  return (
    <section className="relative w-full py-20 px-4 bg-darker border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Cards */}
          <div className="grid gap-6">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-black/40 group-hover:scale-110 transition-transform duration-300">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-body">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Experience */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Trophy className="w-48 h-48 text-white rotate-12" />
               </div>
               
               <h3 className="text-3xl font-heading font-bold text-white mb-6">L'EXPÉRIENCE ULTIME</h3>
               <p className="text-gray-300 mb-8 text-lg">
                 AWAKI n'est pas juste un tournoi, c'est une célébration du football virtuel. 
                 Viens vivre l'adrénaline des grands soirs.
               </p>

               <ul className="space-y-4">
                 {experience.map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-gray-200">
                     <span className="p-1 rounded-full bg-secondary/20">{item.icon}</span>
                     <span className="font-medium">{item.text}</span>
                   </li>
                 ))}
               </ul>

               <div className="mt-8 pt-8 border-t border-white/10">
                 <div className="flex items-center gap-4">
                   <div className="text-4xl font-black font-heading text-white">100+</div>
                   <div className="text-sm text-gray-400 uppercase tracking-widest">Joueurs<br/>Attendus</div>
                   <div className="h-10 w-px bg-white/20 mx-4"></div>
                   <div className="text-4xl font-black font-heading text-white">500k</div>
                   <div className="text-sm text-gray-400 uppercase tracking-widest">FCFA<br/>Cashprize</div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;