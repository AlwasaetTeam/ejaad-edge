import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

interface reqPayload {
  name?: string;  // Make `name` optional
}

console.log('hello-world started');

serve(async (req: Request) => {
  let name = "Guest";  // Default value if `name` is not provided
  try {
    // Check if the request has a body
    if (req.body) {
      const { name: receivedName } : reqPayload = await req.json();
      if (receivedName) {
        name = receivedName;
      }
    } else {
      console.log("No body provided in the request");
    }
  } catch (err) {
    console.error("Failed to parse JSON:", err);
  }

  const data = {
    message: `Hello ${name} from Supabase Edge Functions!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json", "Connection": "keep-alive" } },
  )
}, { port: 9005 })
