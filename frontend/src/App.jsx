import React, { useEffect, useState } from "react";
import axios from "axios";

function TemplateList({ templates }) {
  return (
    <div>
      <h2>Approved Templates</h2>
      <ul>
        {templates.map(tpl => (
          <li key={tpl.id}>
            <b>{tpl.name}</b> ({tpl.language}): {tpl.components?.[0]?.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TemplateForm({ onSubmitted }) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("TRANSACTIONAL");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post("/templates/submit", {
        name, language, category, body
      });
      setMsg("Submitted for approval!");
      setName(""); setLanguage("en"); setCategory("TRANSACTIONAL"); setBody("");
      onSubmitted();
    } catch (e) {
      setMsg(e.response?.data?.detail?.error?.message || "Error");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submit}>
      <h2>Submit New Template</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
      <input value={language} onChange={e=>setLanguage(e.target.value)} placeholder="Language" required />
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="TRANSACTIONAL">TRANSACTIONAL</option>
        <option value="MARKETING">MARKETING</option>
        <option value="OTP">OTP</option>
      </select>
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" required />
      <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      <div style={{marginTop:8}}>{msg}</div>
    </form>
  );
}

export default function App() {
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {
    const { data } = await axios.get("/templates/approved");
    setTemplates(data.approved_templates);
  };

  useEffect(() => { fetchTemplates(); }, []);

  return (
    <div style={{display: "flex", gap: "50px"}}>
      <div>
        <TemplateForm onSubmitted={fetchTemplates} />
      </div>
      <div>
        <TemplateList templates={templates}/>
      </div>
    </div>
  );
}