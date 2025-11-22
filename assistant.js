module.exports = async (req, res) => {
  const OPENAI_KEY = process.env.OPENAI_KEY || '';
  const q = (req.body && req.body.q) || '';
  if (!OPENAI_KEY) {
    return res.json({ reply: `Assistant (mock): I can't call OpenAI here. Short-term POP suggests checking precipitation. Q: ${q}` });
  }
  try{
    const fetch = require('node-fetch');
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{ 'Content-Type':'application/json','Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({ model:'gpt-4o-mini', messages:[{role:'user',content:q}], max_tokens:150 })
    });
    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content || JSON.stringify(j);
    return res.json({ reply });
  }catch(e){ return res.json({ reply: 'Assistant error: ' + e.message }) }
}
