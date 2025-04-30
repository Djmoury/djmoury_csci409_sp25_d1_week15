// app/alert/[alert_id]/page.tsx

async function fetchAlertDetail(alert_id: string) {
    const username = 'admin';
    const password = 'secret';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/alert/${alert_id}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Alert ${alert_id} not found`);
    return res.json();
  }
  
  export default async function AlertDetailPage({ params }: { params: { alert_id: string } }) {
    const alert = await fetchAlertDetail(params.alert_id);
    return (
      <div style={{
        backgroundColor: alert.severity === 'high' ? '#ffebee' : '#fff3e0',
        color: alert.text_color,
        padding: '2rem',
        borderRadius: '10px',
      }}>
        <h1>{alert.message}</h1>
        <p><strong>ID:</strong> {alert.id}</p>
        <p><strong>Description:</strong> {alert.description}</p>
        <a href="/alert" style={{ color: alert.text_color }}>Back to Alert List</a>
      </div>
    );
  }
  