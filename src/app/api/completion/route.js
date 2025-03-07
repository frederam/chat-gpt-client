import { Configuration, OpenAIApi } from "openai-edge";
import { openAiStream, StreamingTextResponse } from "ai";

export async function GET(req) {
  return new Response(
    JSON.stringify({
      message: "First AI app",
    }),
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
}
