import React, {useState,useEffect} from 'react'
export default function DiaryPanel(){
  const key='weathering_diary_v1'
  const [entries,setEntries]=useState([])
  const [note,setNote]=useState('')
  useEffect(()=>{ const raw=localStorage.getItem(key); if(raw) setEntries(JSON.parse(raw)) },[])
  function save(e){ e.preventDefault(); const entry={id:Date.now(),ts:new Date().toISOString(),text:note}; const next=[entry,...entries]; setEntries(next); localStorage.setItem(key,JSON.stringify(next)); setNote('') }
  function remove(id){ const next=entries.filter(x=>x.id!==id); setEntries(next); localStorage.setItem(key,JSON.stringify(next)) }
  return (
    <div className="card" style={{padding:12}}>
      <h3 style={{margin:0}}>Weather Diary</h3>
      <form onSubmit={save} style={{marginTop:8,display:'grid',gap:8}}>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Write a short note about today's weather" rows={3}></textarea>
        <div style={{display:'flex',gap:8}}><button className="btn">Save</button><button type="button" onClick={()=>setNote('')} style={{padding:8,borderRadius:8}}>Clear</button></div>
      </form>
      <div style={{marginTop:12}}>
        {entries.length===0 ? <div className="muted">No diary entries yet</div> : (
          <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>{entries.map(e=> <li key={e.id} style={{padding:8,border:'1px solid #eef2ff',borderRadius:8}}><div className="small">{new Date(e.ts).toLocaleString()}</div><div style={{marginTop:6}}>{e.text}</div><div style={{marginTop:8}}><button onClick={()=>remove(e.id)} style={{padding:6,borderRadius:6,background:'#f87171',color:'white',border:'none'}}>Delete</button></div></li>)}</ul>
        )}
      </div>
    </div>
  )
}
