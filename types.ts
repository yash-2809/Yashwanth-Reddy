
export enum Planet {
  NOVA = 'NOVA',
  ORBIT = 'ORBIT',
  LUNAR = 'LUNAR',
  COSMOS = 'COSMOS'
}

export interface Mission {
  title: string;
  description: string;
  objective: string;
  sampleInput: string;
  sampleOutput: string;
  planet: Planet;
}

export interface UserState {
  hasSpun: boolean;
  landedPlanet: Planet | null;
  mission: Mission | null;
  status: 'idle' | 'spinning' | 'loading_mission' | 'ready';
}
