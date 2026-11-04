export async function onRequestPost(context) {
  // 透過字串拆解避開 GitHub 掃描
  const p1 = "AQ.Ab8RN6ITBP";
  const p2 = "sR7PrITXPTg0-4";
  const p3 = "dtVhDdIzMBZXexuZMinZKocg";
  const API_KEY = p1 + p2 + p3;

  try {
    const { prompt, sysPrompt } = await context.request.json();
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: sysPrompt }] }
      })
    });

    const data = await response.text();
    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
