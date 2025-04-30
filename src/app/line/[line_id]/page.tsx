// app/line/[line_id]/page.tsx

async function fetchLineDetail(line_id: string) {
  const username = 'admin';
  const password = 'secret';
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const res = await fetch(`http://localhost:8000/line/${line_id}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Line ${line_id} not found`);
  return res.json();
}

export default async function LineDetailPage({ params }: { params: { line_id: string } }) {
  const line = await fetchLineDetail(params.line_id);
  return (
    <div style={{
      backgroundColor: line.color,
      color: line.text_color,
      padding: '2rem',
      borderRadius: '10px',
    }}>
      <h1>{line.name}</h1>
      <p><strong>ID:</strong> {line.id}</p>
      <p><strong>Description:</strong> {line.description}</p>
      <a href="/line" style={{ color: line.text_color }}>Back to Line List</a>
    </div>
  );
}
