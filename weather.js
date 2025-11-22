const fetch = require('node-fetch');
module.exports = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });
  const OWM_KEY = process.env.OWM_KEY || '';
  if (!OWM_KEY) {
    return res.json({
      current: { temp: 26, feels_like:26, weather:[{main:'Clouds',description:'broken clouds'}], pop:0.05, wind_speed:1.5 },
      hourly: [], popAvg: 5, aqi: { idx: 42, category: 'Good' }
    });
  }
  try{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${OWM_KEY}`;
    const r = await fetch(url); const json = await r.json();
    const hourly = json.hourly || [];
    let sum=0,cnt=0; for(let i=0;i<3 && i<hourly.length;i++){ sum += (hourly[i].pop||0); cnt++ }
    const popAvg = cnt>0 ? Math.round((sum/cnt)*100) : 0;
    return res.json({...json, popAvg, aqi:{idx:42,category:'Good'}});
  }catch(e){ res.status(500).json({error:e.message}) }
}
