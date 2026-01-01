
import { GoogleGenAI, Type } from "@google/genai";
import { Planet, Mission } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateMission(planet: Planet): Promise<Mission> {
    const prompt = `You are the Galactic Overseer of the Interstellar Coding League. 
    A coder has just landed on the planet ${planet}. 
    Create a unique, immersive coding challenge themed around this planet. 
    
    Thematic guidelines:
    - NEBULON X: Volatile core, focus on performance or concurrency.
    - ASTRA NOVA: Advanced civilization, focus on algorithms or data structures.
    - COSMICA-7: Ocean world, focus on signal processing or string manipulation.
    - ORION PRIME: Jungle planet, focus on recursion or graph theory.
    
    The mission should be fun, slightly challenging, and professional.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            objective: { type: Type.STRING },
            sampleInput: { type: Type.STRING },
            sampleOutput: { type: Type.STRING }
          },
          required: ["title", "description", "objective", "sampleInput", "sampleOutput"]
        }
      }
    });

    const missionData = JSON.parse(response.text || '{}');
    return {
      ...missionData,
      planet
    };
  }
}

export const geminiService = new GeminiService();
