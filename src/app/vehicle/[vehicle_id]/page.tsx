// app/vehicle/[vehicle_id]/page.tsx

async function fetchVehicleDetail(vehicle_id: string) {
    const username = 'admin';
    const password = 'secret';
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    const res = await fetch(`http://localhost:8000/vehicle/${vehicle_id}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Vehicle ${vehicle_id} not found`);
    return res.json();
  }
  
  export default async function VehicleDetailPage({ params }: { params: { vehicle_id: string } }) {
    const vehicle = await fetchVehicleDetail(params.vehicle_id);
    return (
      <div style={{
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '2rem',
        borderRadius: '10px',
      }}>
        <h1>{vehicle.type}</h1>
        <p><strong>ID:</strong> {vehicle.id}</p>
        <p><strong>Line ID:</strong> {vehicle.line_id}</p>
        <p><strong>Status:</strong> {vehicle.status}</p>
        <a href="/vehicle" style={{ color: '#007bff' }}>Back to Vehicle List</a>
      </div>
    );
  }
  