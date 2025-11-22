import React, {useEffect, useState} from 'react'
import WeatherPanel from './components/WeatherPanel'
import ReportsPanel from './components/ReportsPanel'
import AssistantPanel from './components/AssistantPanel'
import DiaryPanel from './components/DiaryPanel'
import { getWeather } from './utils/api'

export default function App(){
  const [pos, setPos] = useState({lat:28.6139, lon:77.2090})
  const [weather, setWeather] = useState(null)
  useEffect(()=>{
    async function load(){
      try{
        const w = await getWeather(pos.lat, pos.lon)
        setWeather(w)
      }catch(e){
        console.error(e)
      }
    }
    load()
  },[pos])

  return (
    <div className="container">
      <header>
        <div>
          <h1>Weathering — Hyperlocal Forecasts</h1>
          <div className="muted">Microclimates · Crowdsourced reports · Activity-aware suggestions</div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="btn" onClick={()=>navigator.geolocation && navigator.geolocation.getCurrentPosition(p=>setPos({lat:p.coords.latitude, lon:p.coords.longitude}))}>Use my location</button>
        </div>
      </header>

      <main className="grid" style={{marginTop:12}}>
        <div className="card grid" style={{padding:14}}>
          <WeatherPanel data={weather} />
          <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:12,marginTop:12}} className="two">
            <ReportsPanel />
            <AssistantPanel />
          </div>
        </div>
        <DiaryPanel />
      </main>
    </div>
  )
}
