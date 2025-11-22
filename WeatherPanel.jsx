import React from 'react'
export default function WeatherPanel({data}){
  if(!data) return <div className="card">Loading weather...</div>
  const cur = data.current || {}
  const pop = Math.round((cur.pop||0)*100)
  const popAvg = data.popAvg ?? pop
  const aqi = data.aqi ?? { idx:50, category:'Moderate' }
  return (
    <div style={{display:'flex',gap:12,alignItems:'center'}}>
      <div style={{flex:1}}>
        <h2 style={{margin:0}}>{Math.round(cur.temp||0)}°C — {cur.weather?.[0]?.main || 'N/A'}</h2>
        <div className="small">{cur.weather?.[0]?.description || ''}</div>
        <div style={{marginTop:8}} className="muted">POP (next 3h avg): {popAvg}% · AQI: {aqi.idx} ({aqi.category})</div>
        <div style={{marginTop:10}}><strong>Microclimate note:</strong> {popAvg>40 ? 'Higher chance of short localized showers' : 'No short localized shower alert'}</div>
      </div>
      <div style={{width:220,textAlign:'right'}}>
        <div className="card" style={{padding:10}}>
          <div className="small">Feels like</div>
          <div style={{fontSize:26,fontWeight:700}}>{Math.round(cur.feels_like||cur.temp||0)}°</div>
          <div className="small" style={{marginTop:8}}>Wind: {data.current.wind_speed ?? 0} m/s</div>
        </div>
      </div>
    </div>
  )
}
