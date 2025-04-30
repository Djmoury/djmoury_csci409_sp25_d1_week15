# Add to your existing imports
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
import secrets

app = FastAPI()
security = HTTPBasic()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication logic
def get_current_user(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "admin")
    correct_password = secrets.compare_digest(credentials.password, "secret")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# --- Sample Data ---
ROUTES = [
    {
        "id": "1",
        "name": "Blue Line",
        "description": "Runs from North to South",
        "color": "#007BFF",
        "text_color": "#FFFFFF"
    },
    {
        "id": "2",
        "name": "Red Line",
        "description": "Runs from East to West",
        "color": "#DC3545",
        "text_color": "#FFFFFF"
    }
]

LINES = [
    {"id": "L1", "name": "Line 1", "route_id": "1"},
    {"id": "L2", "name": "Line 2", "route_id": "2"},
]

VEHICLES = [
    {"id": "V1", "type": "Bus", "line_id": "L1", "status": "Active"},
    {"id": "V2", "type": "Tram", "line_id": "L2", "status": "Inactive"},
]

ALERTS = [
    {"id": "A1", "message": "Delay on Blue Line", "severity": "high"},
    {"id": "A2", "message": "Maintenance on Red Line", "severity": "medium"},
]

# --- Route Endpoints ---
@app.get("/route")
def list_routes(username: str = Depends(get_current_user)):
    return ROUTES

@app.get("/route/{route_id}")
def get_route(route_id: str, username: str = Depends(get_current_user)):
    for route in ROUTES:
        if route["id"] == route_id:
            return route
    raise HTTPException(status_code=404, detail="Route not found")

# --- Line Endpoints ---
@app.get("/line")
def list_lines(username: str = Depends(get_current_user)):
    return LINES

@app.get("/line/{line_id}")
def get_line(line_id: str, username: str = Depends(get_current_user)):
    for line in LINES:
        if line["id"] == line_id:
            return line
    raise HTTPException(status_code=404, detail="Line not found")

# --- Vehicle Endpoints ---
@app.get("/vehicle")
def list_vehicles(username: str = Depends(get_current_user)):
    return VEHICLES

@app.get("/vehicle/{vehicle_id}")
def get_vehicle(vehicle_id: str, username: str = Depends(get_current_user)):
    for vehicle in VEHICLES:
        if vehicle["id"] == vehicle_id:
            return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

# --- Alert Endpoints ---
@app.get("/alert")
def list_alerts(username: str = Depends(get_current_user)):
    return ALERTS

@app.get("/alert/{alert_id}")
def get_alert(alert_id: str, username: str = Depends(get_current_user)):
    for alert in ALERTS:
        if alert["id"] == alert_id:
            return alert
    raise HTTPException(status_code=404, detail="Alert not found")
