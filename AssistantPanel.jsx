import React, {useState} from 'react'
import { askAssistant } from '../utils/api'
export default function AssistantPanel(){
  const [q,setQ]=useState('')
  const [reply,setReply]=useState(null)
  async function ask(e){ e.preventDefault(); const r= await askAssistant(q); setReply(r.reply || 'No answer'); }
  return (
    <div className="card">
      <h3 style={{margin:0}}>AI Assistant</h3>
      <form onSubmit={ask} style={{marginTop:8,display:'grid',gap:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about rain, wind or safety" />
        <button className="btn">Ask</button>
      </form>
      {reply && <div style={{marginTop:8,background:'#f1f5f9',padding:8,borderRadius:8}}>{reply}</div>}
    </div>
  )
}
