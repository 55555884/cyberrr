"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileGuard from "@/components/ProfileGuard";

export default function TaskDetail() {
  const router = useRouter();

  return (
    <ProfileGuard>
    <div style={{backgroundColor: '#ECECEC', minHeight: '100vh', paddingBottom: '100px'}}>

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 16px 12px'}}>
        <button onClick={() => router.back()} style={{border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer'}}>←</button>
        <Image src="/logo.png" alt="CYBERRR" width={240} height={48} style={{objectFit: 'contain'}} />
        <div style={{width: '20px'}}></div>
      </div>

      <div style={{padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        <div style={{backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 8px 30px rgba(17,17,17,0.06)', border: '1px solid rgba(0,0,0,0.06)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <span style={{fontSize: '11px', fontWeight: '600', color: '#06C755', border: '1px solid #06C755', borderRadius: '999px', padding: '3px 10px'}}>SURVEY</span>
            <span style={{fontSize: '18px', fontWeight: 'bold', color: '#06C755'}}>$0.50</span>
          </div>
          <div style={{height: '16px', backgroundColor: '#EDEDED', borderRadius: '6px', marginBottom: '8px', width: '70%'}}></div>
          <div style={{height: '12px', backgroundColor: '#EDEDED', borderRadius: '6px', width: '90%'}}></div>
        </div>

        <div style={{backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 8px 30px rgba(17,17,17,0.06)', border: '1px solid rgba(0,0,0,0.06)'}}>
          <h3 style={{fontSize: '14px', fontWeight: 'bold', color: '#111111', marginBottom: '12px'}}>Task Details</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {[
              {label: 'Estimated Time', value: '5 min'},
              {label: 'Reward', value: '$0.50 USDC'},
              {label: 'Status', value: 'Available'},
            ].map((item) => (
              <div key={item.label} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '13px', color: '#666666'}}>{item.label}</span>
                <span style={{fontSize: '13px', fontWeight: '600', color: item.label === 'Reward' ? '#06C755' : '#111111'}}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 8px 30px rgba(17,17,17,0.06)', border: '1px solid rgba(0,0,0,0.06)'}}>
          <h3 style={{fontSize: '14px', fontWeight: 'bold', color: '#111111', marginBottom: '12px'}}>Description</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            <div style={{height: '12px', backgroundColor: '#EDEDED', borderRadius: '6px', width: '100%'}}></div>
            <div style={{height: '12px', backgroundColor: '#EDEDED', borderRadius: '6px', width: '85%'}}></div>
            <div style={{height: '12px', backgroundColor: '#EDEDED', borderRadius: '6px', width: '90%'}}></div>
          </div>
        </div>

        <p style={{fontSize: '11px', color: '#888888', textAlign: 'center', margin: '0 8px'}}>
          審査中は金額が変動する場合があります。審査元の承認後に即時送金されます。
        </p>
      </div>

      <div style={{position: 'fixed', bottom: '16px', left: '16px', right: '16px'}}>
        <button onClick={() => router.push('/tasks')} style={{width: '100%', padding: '16px', borderRadius: '999px', background: 'linear-gradient(135deg, #06C755, #04a344)', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer'}}>
          APPLY
        </button>
      </div>
    </div>
    </ProfileGuard>
  );
}