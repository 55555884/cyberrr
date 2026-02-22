"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SurveyPage() {
  const router = useRouter();
  const [surveyUrl, setSurveyUrl] = useState('');

  useEffect(() => {
    fetch('/api/theorem-url?userId=user_cyberrr_001')
      .then(res => res.json())
      .then(data => setSurveyUrl(data.url));
  }, []);

  return (
    <div style={{backgroundColor: '#ECECEC', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', alignItems: 'center', padding: '16px', gap: '12px'}}>
        <button onClick={() => router.back()} style={{border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer'}}>←</button>
        <Image src="/logo.png" alt="CYBERRR" width={160} height={32} style={{objectFit: 'contain'}} />
      </div>
      {surveyUrl ? (
        <iframe src={surveyUrl} width="100%" style={{border: 'none', flex: 1, minHeight: '80vh'}} />
      ) : (
        <div style={{textAlign: 'center', padding: '40px', color: '#888'}}>Loading...</div>
      )}
    </div>
  );
}