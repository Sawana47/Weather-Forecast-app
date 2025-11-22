import React, {useEffect,useState} from 'react'
import { getReports, postReport } from '../utils/api'
export default function ReportsPanel(){
  const [reports,setReports]=useState([])
  const [form,setForm]=useState({location:'',type:'rain',note:''})
  useEffect(()=>{ fetch() },[])
  async function fetch(){ const r= await getReports(); setReports(r || []) }
  async function submit(e){ e.preventDefault(); await postReport(form); setForm({location:'',type:'rain',note:''}); fetch() }
  return (
    <div className="card">
      <h3 style={{margin:0}}>Crowdsourced Reports</h3>
      <form onSubmit={submit} style={{marginTop:8,display:'grid',gap:8}}>
        <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Location (street or area)" />
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="rain">Rain</option><option value="fog">Fog</option><option value="hazard">Hazard</option><option value="other">Other</option></select>
        <textarea value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Note (optional)" rows={3}></textarea>
        <button className="btn">Submit report</button>
      </form>
      <div style={{marginTop:12}}>
        {reports.length===0 ? <div className="muted">No reports yet</div> : (
          <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
            {reports.map(r=> <li key={r.id} style={{padding:8,border:'1px solid #eef2ff',borderRadius:8}}><div className="small">{new Date(r.ts).toLocaleString()}</div><div style={{fontWeight:600}}>{r.type} — {r.location}</div><div style={{marginTop:6}}>{r.note}</div></li>)}
          </ul>
        )}
      </div>
    </div>
  )
}
