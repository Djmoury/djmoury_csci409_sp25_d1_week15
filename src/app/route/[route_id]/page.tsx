// app/route/[route_id]/page.tsx
async function fetchRouteDetail(route_id: string) {
    const username = 'admin';
    const password = 'secret';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/route/${route_id}`, {
    headers: {
    Authorization: `Basic ${auth}`,
    },
    cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Route ${route_id} not found`);
    return res.json();
   }
   export default async function RouteDetailPage({ params }: { params: {
   route_id: string } }) {
    const route = await fetchRouteDetail(params.route_id);
    return (
    <div style={{
    backgroundColor: route.color,
    color: route.text_color,
    padding: '2rem',
    borderRadius: '10px'
    }}>
    <h1>{route.name}</h1>
    <p><strong>ID:</strong> {route.id}</p>
    <p><strong>Description:</strong> {route.description}</p>
    <a href="/route" style={{ color: route.text_color }}>Back to Route
   List</a>
    </div>
    );
   }