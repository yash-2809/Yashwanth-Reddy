
import { Planet } from './types';

export const PLANET_COLORS: Record<Planet, string> = {
  [Planet.NOVA]: 'from-purple-900/80 to-black',
  [Planet.ORBIT]: 'from-blue-900/80 to-black',
  [Planet.LUNAR]: 'from-gray-800/80 to-black',
  [Planet.COSMOS]: 'from-emerald-900/80 to-black',
};

export const NEON_COLORS: Record<Planet, string> = {
  [Planet.NOVA]: '#ff00c8', // Neon Pink
  [Planet.ORBIT]: '#00f2ff', // Neon Cyan
  [Planet.LUNAR]: '#ffffff', // White
  [Planet.COSMOS]: '#4dff88', // Planet Green
};

export const HACKERRANK_URLS: Record<Planet, string> = {
  [Planet.NOVA]: 'https://www.hackerrank.com/contests/nova-challenge',
  [Planet.ORBIT]: 'https://www.hackerrank.com/contests/orbit-challenge',
  [Planet.LUNAR]: 'https://www.hackerrank.com/contests/lunar-challenge',
  [Planet.COSMOS]: 'https://www.hackerrank.com/contests/cosmos-challenge',
};

export const STORAGE_KEY = 'galaxy_spin_challenge_v2';
