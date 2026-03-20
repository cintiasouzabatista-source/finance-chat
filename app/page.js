"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase.js"; // ✅ AQUI EM CIMA

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function send() {
    if (!input) return;

    // salva no banco
    await supabase.from("transacoes").insert([
      {
        texto: input,
        quantia: 0,
        tipo: "entrada"
      }
    ]);

    setMessages([...messages, input]);
    setInput("");
  }

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{padding:10,fontWeight:"bold"}}>Finance Chat</div>

      <div style={{flex:1,overflowY:"auto",padding:10}}>
        {messages.map((m,i)=>(
          <div key={i} style={{
            background:"#DCF8C6",
            padding:10,
            borderRadius:10,
            marginBottom:8,
            maxWidth:"70%"
          }}>
            {m}
          </div>
        ))}
      </div>

      <div style={{display:"flex",padding:10,gap:8}}>
        <input
          style={{flex:1,padding:10}}
          value={input}
          onChange={e=>setInput(e.target.value)}
        />
        <button onClick={send}>Enviar</button>
      </div>
    </div>
  );
}
