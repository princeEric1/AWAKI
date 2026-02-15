export enum ParticipationType {
  PLAYER = 'Joueur',
  VISITOR = 'Visiteur',
}

export enum FormatType {
  SOLO = 'Solo',
  DUO = 'Duo',
}

export enum CategoryType {
  JUNIOR = 'Junior (-18)',
  PRO = 'Pro (+18)',
}

export enum AccessType {
  SIMPLE = 'Entrée simple',
  PREMIUM = 'Entrée + Consommation',
}

export interface RegistrationData {
  participationType: ParticipationType | null;
  format: FormatType | null;
  category: CategoryType | null;
  
  // Dynamic fields
  pseudo: string;         // For Player Solo
  teamName: string;       // For Player Duo
  companionName: string;  // For Visitor Duo
  
  // Personal Info
  fullName: string;
  age: string;
  contact: string;
  
  accessType: AccessType | null;
}

export const INITIAL_DATA: RegistrationData = {
  participationType: null,
  format: null,
  category: null,
  pseudo: '',
  teamName: '',
  companionName: '',
  fullName: '',
  age: '',
  contact: '',
  accessType: null,
};