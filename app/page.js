"use client";
import { useState } from "react";
useEffect(() => {
  loadMessages();
}, []);

async function loadMessages() {
  const { data } = await supabase
    .from("transações")
    .select("*")
    .order("criado_em", { ascending: true });

  if (data) {
    setMessages(data.map((item) => item.texto));
  }
}

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  import { supabase } from "../lib/supabase";

async function send() {
  if (!input) return;

  await supabase.from("transações").insert([
    {
      texto: input,
      quantia: 0,
      tipo: "outro"
    }
  ]);

  setMessages([...messages, input]);
  setInput("");
}

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#111"
    }}>
      
      {/* topo */}
      <div style={{
        padding: 15,
        background: "#075E54",
        color: "#fff",
        fontWeight: "bold"
      }}>
        💰 Finance Chat
      </div>

      {/* mensagens */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 10
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            background: "#DCF8C6",
            padding: 10,
            borderRadius: 10,
            marginBottom: 8,
            maxWidth: "70%",
            alignSelf: "flex-end"
          }}>
            {m}
          </div>
        ))}
      </div>

      {/* input */}
      <div style={{
        display: "flex",
        padding: 10,
        background: "#222"
      }}>
        <input
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            border: "none"
          }}
          placeholder="Digite um gasto..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={send} style={{
          marginLeft: 10,
          padding: "10px 15px",
          borderRadius: 20,
          border: "none",
          background: "#25D366",
          color: "#fff"
        }}>
          Enviar
        </button>
      </div>

    </div>
  );
}
