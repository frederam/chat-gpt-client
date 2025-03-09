import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    maxTokens: 1024,
    toolChoice: "auto",
    tools: {
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          try {
            const geoResponse = await fetch(
              `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                location
              )}&count=1&language=en&format=json`
            );
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.lenght === 0) {
              throw new Error("Location not found");
            }

            const { latitude, longitude } = geoData.results[0];

            const weatherResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
            );

            const weatherData = await weatherResponse.json();

            return {
              location,
              temperature: weatherData.current.temperature_2m,
            };
          } catch (error) {
            return { error: error.message };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
