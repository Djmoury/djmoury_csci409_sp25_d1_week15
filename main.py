from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import secrets

app = FastAPI()
security = HTTPBasic()

# Allow CORS for Next.js (adjust for production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data
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

# Endpoint to list all routes
@app.get("/route")
def list_routes(username: str = Depends(get_current_user)):
    return ROUTES

# Endpoint to get route details
@app.get("/route/{route_id}")
def get_route(route_id: str, username: str = Depends(get_current_user)):
    for route in ROUTES:
        if route["id"] == route_id:
            return route
    raise HTTPException(status_code=404, detail="Route not found")
