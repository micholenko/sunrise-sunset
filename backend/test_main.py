import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, mock_open
from main import app

client = TestClient(app)

class TestAPI:
    def test_root_endpoint(self):
        """Test the root endpoint returns the expected message."""
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Sunrise Sunset API Proxy"}


if __name__ == "__main__":
    pytest.main([__file__])
