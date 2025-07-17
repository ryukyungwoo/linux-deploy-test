"use client";
import { useEffect, useState } from "react";

type Lang = "kr" | "en" | "jp";

export default function ClientGreeting() {
  const [lang, setLang] = useState<Lang>("kr");
  const [hello, setHello] = useState<string | undefined>();

  useEffect(() => {
    hi();
  }, []);

  useEffect(() => {
    getGreet();
  }, [lang]);

  async function getGreet() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/greeting?lang=${lang}`
    );
    if (!res.ok) throw new Error(res.statusText);
    setHello(await res.text());
  }

  async function hi() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    if (!res.ok) throw new Error(res.statusText);
  }

  return (
    <div>
      <h1>현재 선택된 언어: {lang}</h1>

      <select
        name="lang"
        id="lang"
        onChange={(e) => setLang(e.target.value as Lang)}
        value={lang}
      >
        <option value="kr">한국어</option>
        <option value="en">English</option>
        <option value="jp">日本語</option>
      </select>
      {hello !== undefined ? <div>{hello}</div> : <div>loading...</div>}
    </div>
  );
}
