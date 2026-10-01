from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "HomeBuild Operations Platform API is running"}
import uuid


def test_register_and_login():
    unique_email = f"test_{uuid.uuid4()}@example.com"

    register_response = client.post("/register", json={
        "name": "Test User",
        "email": unique_email,
        "password": "testpass123",
        "role": "manager",
    })
    assert register_response.status_code == 200
    assert register_response.json()["email"] == unique_email

    login_response = client.post(f"/login?email={unique_email}&password=testpass123")
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()
def test_cannot_complete_property_with_open_issue():
    unique_email = f"test_{uuid.uuid4()}@example.com"
    client.post("/register", json={
        "name": "Test Manager",
        "email": unique_email,
        "password": "testpass123",
        "role": "manager",
    })
    login_response = client.post(f"/login?email={unique_email}&password=testpass123")
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    community = client.post("/communities", json={"name": "Test Community", "location": "Testville"}).json()

    property_ = client.post("/properties", json={
        "name": "Test Property",
        "address": "1 Test St",
        "status": "in_progress",
        "community_id": community["id"],
    }).json()

    stage = client.post("/construction-stages", json={
        "name": "Test Stage",
        "order": 1,
        "status": "in_progress",
        "property_id": property_["id"],
    }).json()

    inspection = client.post("/inspections", json={
        "inspector_name": "Test Inspector",
        "result": "failed",
        "stage_id": stage["id"],
    }).json()

    client.post("/issues", json={
        "title": "Test Issue",
        "priority": "high",
        "status": "open",
        "inspection_id": inspection["id"],
    })

    response = client.patch(
        f"/properties/{property_['id']}/status",
        json={"status": "completed"},
        headers=headers,
    )
    assert response.status_code == 400
