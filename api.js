import axios from 'axios'
export async function getWeather(lat, lon){
  const r = await axios.get('/api/weather', { params: { lat, lon } })
  return r.data
}
export async function getReports(){ const r = await axios.get('/api/reports'); return r.data }
export async function postReport(body){ const r = await axios.post('/api/reports', body); return r.data }
export async function askAssistant(q){ const r = await axios.post('/api/assistant', { q }); return r.data }
