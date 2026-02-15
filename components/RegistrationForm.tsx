import React, { useState, useEffect } from 'react';
import { INITIAL_DATA, RegistrationData, ParticipationType, FormatType, CategoryType, AccessType } from '../types';
import { User, Users, Gamepad, Ticket, CheckCircle2, AlertCircle, Banknote, Utensils, Sparkles } from 'lucide-react';
import WhatsAppModal from './WhatsAppModal';

const RegistrationForm: React.FC = () => {
  const [data, setData] = useState<RegistrationData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState(0);

  // Calculate progress, price and auto-validate basic logic
  useEffect(() => {
    let steps = 0;
    if (data.participationType) steps++;
    if (data.format) steps++;
    if (data.fullName.length > 2) steps++;
    if (data.accessType) steps++;
    
    // Max roughly 4 steps for visuals
    setProgress((steps / 4) * 100);

    // Logic: Clear irrelevant fields
    if (data.participationType === ParticipationType.VISITOR) {
      if (data.category) setData(prev => ({ ...prev, category: null }));
    }
    if (data.format === FormatType.SOLO) {
        if (data.teamName) setData(prev => ({ ...prev, teamName: '' }));
        if (data.companionName) setData(prev => ({ ...prev, companionName: '' }));
    }

    // --- PRICING LOGIC ---
    let calculatedPrice = 0;
    const { participationType, format, category, accessType } = data;
    const isPremium = accessType === AccessType.PREMIUM;

    if (participationType && format && accessType) {
        if (participationType === ParticipationType.VISITOR) {
             if (format === FormatType.SOLO) calculatedPrice = isPremium ? 1000 : 500;
             if (format === FormatType.DUO) calculatedPrice = isPremium ? 1500 : 1000;
        } else if (participationType === ParticipationType.PLAYER && category) {
             if (category === CategoryType.JUNIOR) {
                 if (format === FormatType.SOLO) calculatedPrice = isPremium ? 2000 : 1000;
                 if (format === FormatType.DUO) calculatedPrice = isPremium ? 3000 : 1500;
             } else if (category === CategoryType.PRO) {
                 if (format === FormatType.SOLO) calculatedPrice = isPremium ? 3000 : 2000;
                 if (format === FormatType.DUO) calculatedPrice = isPremium ? 3500 : 3000;
             }
        }
    }
    setPrice(calculatedPrice);

  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof RegistrationData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};
    let isValid = true;

    if (!data.participationType) { newErrors.participationType = "Choisis ton camp !"; isValid = false; }
    if (!data.format) { newErrors.format = "Solo ou Duo ?"; isValid = false; }
    
    if (data.participationType === ParticipationType.PLAYER) {
      if (!data.category) { newErrors.category = "Catégorie requise"; isValid = false; }
      if (data.format === FormatType.SOLO && !data.pseudo) { newErrors.pseudo = "Ton pseudo de gamer est requis"; isValid = false; }
      if (data.format === FormatType.DUO && !data.teamName) { newErrors.teamName = "Nom de team requis"; isValid = false; }
    }

    if (data.participationType === ParticipationType.VISITOR) {
        if (data.format === FormatType.DUO && !data.companionName) { newErrors.companionName = "Qui t'accompagne ?"; isValid = false; }
    }

    if (!data.fullName || data.fullName.length < 3) { newErrors.fullName = "Nom trop court"; isValid = false; }
    if (!data.age) { newErrors.age = "Âge requis"; isValid = false; }
    if (!data.accessType) { newErrors.accessType = "Choisis ton billet"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    } else {
        // Shake animation logic could go here via a class trigger
        const firstErrorField = document.querySelector('.border-error');
        firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // UI Components helpers
  const OptionCard = ({ 
    selected, 
    onClick, 
    icon, 
    title, 
    subtitle 
  }: { selected: boolean; onClick: () => void; icon: React.ReactNode; title: string; subtitle?: string }) => (
    <div 
      onClick={onClick}
      className={`cursor-pointer relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-200 
        ${selected 
          ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
        }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${selected ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>
          {icon}
        </div>
        <div className="text-left">
          <h4 className={`font-heading font-bold ${selected ? 'text-white' : 'text-gray-300'}`}>{title}</h4>
          {subtitle && <p className="text-xs text-gray-500 font-body">{subtitle}</p>}
        </div>
      </div>
      {selected && <div className="absolute top-2 right-2 text-primary"><CheckCircle2 size={16} /></div>}
    </div>
  );

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="absolute -top-4 left-0 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="bg-darker/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
        
        {/* SECTION 1: ROLE */}
        <div className="space-y-4">
          <label className="text-sm text-gray-400 uppercase tracking-widest font-bold">1. Type de participation</label>
          <div className="grid grid-cols-2 gap-4">
            <OptionCard 
              selected={data.participationType === ParticipationType.PLAYER}
              onClick={() => setData(prev => ({ ...prev, participationType: ParticipationType.PLAYER }))}
              icon={<Gamepad size={20} />}
              title="Joueur"
              subtitle="Je veux la victoire"
            />
            <OptionCard 
              selected={data.participationType === ParticipationType.VISITOR}
              onClick={() => setData(prev => ({ ...prev, participationType: ParticipationType.VISITOR }))}
              icon={<Ticket size={20} />}
              title="Visiteur"
              subtitle="Je viens supporter"
            />
          </div>
          {errors.participationType && <p className="text-error text-sm flex items-center gap-1"><AlertCircle size={12}/> {errors.participationType}</p>}
        </div>

        {/* SECTION 2: FORMAT */}
        <div className={`space-y-4 transition-all duration-500 ${!data.participationType ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
          <label className="text-sm text-gray-400 uppercase tracking-widest font-bold">2. Format</label>
          <div className="grid grid-cols-2 gap-4">
            <OptionCard 
              selected={data.format === FormatType.SOLO}
              onClick={() => setData(prev => ({ ...prev, format: FormatType.SOLO }))}
              icon={<User size={20} />}
              title="Solo"
              subtitle={data.participationType === ParticipationType.PLAYER ? "Loup solitaire" : "Je viens seul"}
            />
            <OptionCard 
              selected={data.format === FormatType.DUO}
              onClick={() => setData(prev => ({ ...prev, format: FormatType.DUO }))}
              icon={<Users size={20} />}
              title="Duo"
              subtitle={data.participationType === ParticipationType.PLAYER ? "En équipe (2v2)" : "Avec un pote"}
            />
          </div>
          {errors.format && <p className="text-error text-sm flex items-center gap-1"><AlertCircle size={12}/> {errors.format}</p>}
        </div>

        {/* CONDITIONAL FIELDS */}
        {data.format && (
          <div className="animate-fade-in-up space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
            {/* Player + Solo = Pseudo */}
            {data.participationType === ParticipationType.PLAYER && data.format === FormatType.SOLO && (
              <div className="space-y-2">
                <label className="text-white font-heading font-bold">Ton Pseudo Gamer *</label>
                <input 
                  type="text" name="pseudo" value={data.pseudo} onChange={handleInputChange} 
                  placeholder="Ex: TheKing_228"
                  className={`w-full bg-darker border ${errors.pseudo ? 'border-error' : 'border-white/10 focus:border-primary'} rounded-lg p-3 text-white outline-none transition-all placeholder:text-gray-600`}
                />
                {errors.pseudo && <p className="text-error text-sm">{errors.pseudo}</p>}
              </div>
            )}

            {/* Player + Duo = Team Name */}
            {data.participationType === ParticipationType.PLAYER && data.format === FormatType.DUO && (
              <div className="space-y-2">
                <label className="text-white font-heading font-bold">Nom de l'équipe *</label>
                <input 
                  type="text" name="teamName" value={data.teamName} onChange={handleInputChange} 
                  placeholder="Ex: Les Invincibles"
                  className={`w-full bg-darker border ${errors.teamName ? 'border-error' : 'border-white/10 focus:border-primary'} rounded-lg p-3 text-white outline-none transition-all placeholder:text-gray-600`}
                />
                <p className="text-xs text-secondary">Choisissez un nom stylé pour votre team 🔥</p>
                {errors.teamName && <p className="text-error text-sm">{errors.teamName}</p>}
              </div>
            )}

            {/* Visitor + Duo = Companion */}
            {data.participationType === ParticipationType.VISITOR && data.format === FormatType.DUO && (
              <div className="space-y-2">
                <label className="text-white font-heading font-bold">Nom de l'accompagnant *</label>
                <input 
                  type="text" name="companionName" value={data.companionName} onChange={handleInputChange} 
                  placeholder="Prénom de ton pote"
                  className={`w-full bg-darker border ${errors.companionName ? 'border-error' : 'border-white/10 focus:border-primary'} rounded-lg p-3 text-white outline-none transition-all placeholder:text-gray-600`}
                />
                <p className="text-xs text-success">Vous serez 2, encore mieux ! 🎉</p>
                {errors.companionName && <p className="text-error text-sm">{errors.companionName}</p>}
              </div>
            )}

             {/* Visitor + Solo Message */}
             {data.participationType === ParticipationType.VISITOR && data.format === FormatType.SOLO && (
               <div className="p-4 bg-success/10 border border-success/30 rounded-lg text-center">
                 <p className="text-success font-bold">Super ! On te réserve une place 👍</p>
               </div>
             )}
          </div>
        )}

        {/* SECTION 3: CATEGORY (Player Only) */}
        {data.participationType === ParticipationType.PLAYER && (
          <div className="space-y-4 animate-fade-in-up">
             <label className="text-sm text-gray-400 uppercase tracking-widest font-bold">3. Catégorie</label>
             <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setData(prev => ({ ...prev, category: CategoryType.JUNIOR }))}
                  className={`p-4 rounded-xl border-2 font-heading font-bold transition-all ${data.category === CategoryType.JUNIOR ? 'border-accent bg-accent/20 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                >
                  JUNIOR <span className="block text-xs font-body opacity-70 font-normal">-18 ans</span>
                </button>
                <button
                  type="button"
                  onClick={() => setData(prev => ({ ...prev, category: CategoryType.PRO }))}
                  className={`p-4 rounded-xl border-2 font-heading font-bold transition-all ${data.category === CategoryType.PRO ? 'border-accent bg-accent/20 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                >
                  PRO <span className="block text-xs font-body opacity-70 font-normal">+18 ans</span>
                </button>
             </div>
             {errors.category && <p className="text-error text-sm">{errors.category}</p>}
          </div>
        )}

        {/* SECTION 4: PERSONAL INFO */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <label className="text-sm text-gray-400 uppercase tracking-widest font-bold">Informations Personnelles</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input 
                type="text" name="fullName" value={data.fullName} onChange={handleInputChange} 
                placeholder="Nom complet *"
                className={`w-full bg-darker border ${errors.fullName ? 'border-error' : 'border-white/10 focus:border-secondary'} rounded-lg p-3 text-white outline-none`}
              />
              {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <input 
                type="number" name="age" value={data.age} onChange={handleInputChange} 
                placeholder="Âge *"
                className={`w-full bg-darker border ${errors.age ? 'border-error' : 'border-white/10 focus:border-secondary'} rounded-lg p-3 text-white outline-none`}
              />
               {errors.age && <p className="text-error text-xs mt-1">{errors.age}</p>}
            </div>
            <div className="md:col-span-3">
              <input 
                type="text" name="contact" value={data.contact} onChange={handleInputChange} 
                placeholder="Contact / WhatsApp (Optionnel)"
                className="w-full bg-darker border border-white/10 focus:border-secondary rounded-lg p-3 text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: ACCESS TYPE */}
        <div className="space-y-4">
          <label className="text-sm text-gray-400 uppercase tracking-widest font-bold">5. Type d'accès</label>
          <div className="flex flex-col gap-3">
            {[AccessType.SIMPLE, AccessType.PREMIUM].map((type) => (
              <label key={type} className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${data.accessType === type ? 'border-success bg-success/10' : 'border-white/10 hover:bg-white/5'}`}>
                <input 
                  type="radio" 
                  name="accessType" 
                  value={type} 
                  checked={data.accessType === type}
                  onChange={() => setData(prev => ({...prev, accessType: type as AccessType}))}
                  className="w-5 h-5 accent-success mr-4"
                />
                <div className="flex-1">
                  <span className={`font-heading ${data.accessType === type ? 'text-white' : 'text-gray-400'}`}>{type}</span>
                  {type === AccessType.PREMIUM && (
                      <span className="block text-xs text-accent mt-1 flex items-center gap-1">
                        <Utensils size={12} /> Sandwich + Boisson inclus
                      </span>
                  )}
                </div>
              </label>
            ))}
          </div>
          {errors.accessType && <p className="text-error text-sm">{errors.accessType}</p>}
        </div>

        {/* PRICE CARD - ANIMATED */}
        {price > 0 && (
          <div className="animate-fade-in-up bg-darker border border-primary/50 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 animate-pulse-fast"></div>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary rounded-xl text-white shadow-lg shadow-primary/30">
                  <Banknote size={32} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total à payer</p>
                  <p className="text-4xl font-heading font-black text-white drop-shadow-md">
                    {price.toLocaleString('fr-FR')} <span className="text-lg text-primary">FCFA</span>
                  </p>
                </div>
              </div>
              
              {data.accessType === AccessType.PREMIUM && (
                 <div className="hidden md:flex flex-col items-end text-accent">
                    <Sparkles size={24} className="animate-spin-slow mb-1" />
                    <span className="text-xs font-bold uppercase tracking-widest">Pack Premium</span>
                 </div>
              )}
            </div>
          </div>
        )}

        {/* SUBMIT */}
        <button 
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-heading font-bold text-xl rounded-xl shadow-lg hover:shadow-primary/50 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {price > 0 ? 'PROCÉDER AU PAIEMENT' : 'VALIDER MON INSCRIPTION'}
        </button>

      </form>

      {/* MODAL */}
      {showModal && (
        <WhatsAppModal data={data} price={price} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default RegistrationForm;