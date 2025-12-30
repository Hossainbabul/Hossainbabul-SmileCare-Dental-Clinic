import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `
You are 'SmileBot', a friendly and professional AI dental assistant for SmileCare Dental Clinic.
Your goal is to answer general questions about dental health, explain our procedures, and reassure anxious patients.
Keep answers concise (under 3 sentences where possible) and warm.
If a user asks about pricing, refer to the "starting at" prices but mention it depends on the individual case.
IMPORTANT: Do not provide specific medical diagnoses. Always recommend booking an appointment for pain or specific medical concerns.
Our services include: Checkups, Cleaning, Whitening, Invisalign, Root Canals, Implants, and Pediatric care.
`;

// Initialize the client securely. 
// Note: In a real prod environment, this might be proxied, but for this demo, we use the env var directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    // We use the flash model for speed in a chat interface
    const modelId = 'gemini-3-flash-preview';

    // Format history for the API
    // The API expects roles 'user' or 'model'
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I'm sorry, I couldn't generate a response at the moment.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Unable to connect to the dental assistant.");
  }
};