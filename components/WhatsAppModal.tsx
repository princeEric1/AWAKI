import React from 'react';
import { RegistrationData, ParticipationType, FormatType, AccessType } from '../types';
import { MessageCircle, X, Copy, Check, Camera, AlertTriangle, Users } from 'lucide-react';

interface Props {
  data: RegistrationData;
  price: number;
  onClose: () => void;
}

const WhatsAppModal: React.FC<Props> = ({ data, price, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  // Dynamic Message Construction
  const buildMessage = () => {
    let msg = `Bonjour AWAKI ! 🎮\n\nJe confirme mon inscription KARA PES BEST GAMER :\n\n`;
    
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 PAIEMENT\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `Montant : ${price} FCFA\n`;
    msg += `Via : T-Money / Flooz\n`;
    msg += `(Preuve de paiement ci-jointe 📸)\n\n`;

    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 DÉTAILS JOUEUR\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 Type : ${data.participationType}\n`;
    msg += `🎯 Format : ${data.format}\n`;

    if (data.participationType === ParticipationType.PLAYER) {
      if (data.format === FormatType.SOLO) msg += `🏷️ Pseudo : ${data.pseudo}\n`;
      if (data.format === FormatType.DUO) msg += `👥 Équipe : ${data.teamName}\n`;
      msg += `🏆 Catégorie : ${data.category}\n`;
    }

    if (data.participationType === ParticipationType.VISITOR && data.format === FormatType.DUO) {
      msg += `🤝 Accompagnant : ${data.companionName}\n`;
    }

    msg += `\n🆔 Nom : ${data.fullName}\n`;
    msg += `🎟️ Formule : ${data.accessType}\n`;
    if (data.accessType === AccessType.PREMIUM) msg += `🍔 Repas inclus\n`;
    
    msg += `\nMerci ! 🔥`;

    return msg;
  };

  const message = buildMessage();
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/22871178491?text=${encodedMessage}`;
  const groupUrl = "https://chat.whatsapp.com/GWRLRtn2vDJIaBTe2yC55v";

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappUrl)}&color=8B5CF6&bgcolor=020617`;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-darker border border-primary/30 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-slide-up my-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-5 flex justify-between items-center">
          <h3 className="font-heading font-bold text-white flex items-center gap-2 text-lg">
            <Camera className="text-white" /> PAIEMENT REQUIS
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Payment Alert */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex gap-3 items-start">
             <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={20} />
             <div className="text-sm text-yellow-200/80">
               <strong className="text-yellow-500 block mb-1">IMPORTANT</strong>
               Ton inscription ne sera validée qu'après réception de la capture d'écran du paiement.
             </div>
          </div>

          {/* Amount Display */}
          <div className="text-center space-y-1 py-2">
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Montant à payer</p>
            <p className="text-5xl font-heading font-black text-white">{price} <span className="text-xl text-primary">FCFA</span></p>
          </div>

          {/* Payment Numbers */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center space-y-2">
             <p className="text-gray-300 font-medium">Envoyez via T-Money ou Flooz au :</p>
             <div className="text-2xl font-mono font-bold text-success tracking-wider select-all bg-black/30 py-2 rounded-lg border border-white/5">
               +228 71 17 84 91
             </div>
             <p className="text-xs text-gray-500">Nom : AWAKI TOURNAMENT</p>
          </div>

          <div className="h-px bg-white/10 w-full"></div>

          <p className="text-gray-300 text-sm text-center">
            Une fois le paiement effectué, clique ci-dessous pour envoyer la preuve sur WhatsApp.
          </p>

          {/* QR Code and Message Preview */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
             <div className="p-2 bg-white rounded-xl shrink-0">
                <img src={qrCodeUrl} alt="QR Code WhatsApp" className="w-24 h-24 mix-blend-multiply" />
             </div>
             <div className="bg-white/5 rounded-lg p-3 border border-white/10 relative group w-full text-left">
                <div className="absolute top-2 right-2">
                  <button onClick={handleCopy} className="text-gray-400 hover:text-white transition">
                      {copied ? <Check size={16} className="text-success"/> : <Copy size={16}/>}
                  </button>
                </div>
                <div className="text-[10px] uppercase text-gray-500 mb-1 font-bold">Message généré :</div>
                <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono h-24 overflow-y-auto custom-scrollbar">
                  {message}
                </pre>
             </div>
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg text-center rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 group"
          >
            <Camera className="group-hover:animate-pulse" />
            J'AI PAYÉ - ENVOYER CAPTURE 📸
          </a>

          {/* Group Link Secondary Action */}
          <div className="text-center pt-2">
            <a href={groupUrl} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors">
              <Users size={14} />
              Pas encore dans le groupe ? <span className="underline decoration-secondary">Rejoindre la communauté</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatsAppModal;