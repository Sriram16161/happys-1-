export type Persona = {
  id: string;
  name: string;
  createdTime: string;
  isShared: boolean;
  isZoomInfo: boolean;
  departments: string[];
  seniority: string[];
  includeTitles: string[];
  excludeTitles: string[];
};

export type NewPersona = Omit<Persona, 'id' | 'createdTime'>;

export type PersonaDictionary = {
  departments: string[];
  seniorityLevels: string[];
};

export const createPersona = (): NewPersona => ({
  name: '',
  isShared: false,
  isZoomInfo: false,
  departments: [],
  seniority: [],
  includeTitles: [],
  excludeTitles: [],
});

export const isExistingPersona = (persona: Persona | NewPersona): persona is Persona => !!(persona as Persona).id;
