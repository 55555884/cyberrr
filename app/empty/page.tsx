export default function Empty() {
  return (
    <div style={{backgroundColor: '#ECECEC', minHeight: '100vh', paddingBottom: '80px'}}>

      {/* ヘッダー */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 16px 12px'}}>
        <img src="/logo.png" alt="CYBERRR" style={{width: '240px', height: '48px', objectFit: 'contain'}} />
        <div style={{display: 'flex', gap: '12px'}}>
          <span style={{fontSize: '20px'}}>🔔</span>
          <span style={{fontSize: '20px'}}>👤</span>
        </div>
      </div>

      {/* タイトル */}
      <div style={{padding: '0 16px 16px'}}>
        <h2 style={{fontSize: '22px', fontWeight: 'bold', color: '#111111', margin: 0}}>AVAILABLE TASKS</h2>
      </div>

      {/* ソートタブ */}
      <div style={{padding: '0 16px 16px', display: 'flex', gap: '8px'}}>
        {['Highest Paying', 'Best Match', 'Recent'].map((tab, i) => (
          <button key={tab} style={{
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            background: i === 0 ? 'linear-gradient(135deg, #06C755, #04a344)' : '#E0E0E0',
            color: i === 0 ? '#FFFFFF' : '#888888'
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* 空状態 */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px', textAlign: 'center'}}>
        <div style={{fontSize: '48px', marginBottom: '16px'}}>📭</div>
        <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#111111', marginBottom: '8px'}}>No tasks available</h3>
        <p style={{fontSize: '13px', color: '#888888', marginBottom: '24px', lineHeight: 1.6}}>新しいタスクが追加されると<br/>ここに表示されます。</p>
        <button style={{
          padding: '12px 28px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #06C755, #04a344)',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer'
        }}>
          更新する
        </button>
      </div>

      {/* エラー状態（参考用・下に配置） */}
      <div style={{padding: '0 16px'}}>
        <div style={{backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 30px rgba(17,17,17,0.06)', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div style={{fontSize: '36px', marginBottom: '12px'}}>⚠️</div>
          <h3 style={{fontSize: '16px', fontWeight: 'bold', color: '#111111', marginBottom: '6px'}}>Something went wrong</h3>
          <p style={{fontSize: '12px', color: '#888888', marginBottom: '16px'}}>接続に問題が発生しました。<br/>もう一度お試しください。</p>
          <button style={{
            padding: '10px 24px',
            borderRadius: '999px',
            backgroundColor: '#FF3B30',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}>
            再試行する
          </button>
        </div>
      </div>

      {/* ボトムナビ */}
      <div style={{position: 'fixed', bottom: '16px', left: '16px', right: '16px', backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '12px 24px', display: 'flex', justifyContent: 'space-around', boxShadow: '0 2px 12px rgba(0,0,0,0.1)'}}>
        {[{icon: '⊞', label: 'Tasks'}, {icon: '🔍', label: 'Search'}, {icon: '📋', label: 'History'}, {icon: '👤', label: 'Profile'}].map((item) => (
          <button key={item.label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer'}}>
            <span style={{fontSize: '18px'}}>{item.icon}</span>
            <span style={{fontSize: '10px', color: '#888888'}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}