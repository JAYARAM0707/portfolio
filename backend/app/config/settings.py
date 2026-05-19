"""
Application Settings
─────────────────────
Loads environment variables from .env and exposes them
as Python constants the rest of the app can import.

Why this file exists:
- Centralizes all configuration in one place
- Provides type hints (so IDE knows what type each value is)
- Validates that required values are set
- Makes it easy to change settings without hunting through code
"""

import os
from dotenv import load_dotenv

# Load .env file from the project root
# This call reads .env and populates os.environ
load_dotenv()


# ============================================
# MongoDB Configuration
# ============================================
MONGO_URI: str = os.environ.get("MONGO_URI", "")
MONGO_DB_NAME: str = os.environ.get("MONGO_DB_NAME", "portfolio_db")


# ============================================
# Environment
# ============================================
ENVIRONMENT: str = os.environ.get("ENVIRONMENT", "development")
IS_DEVELOPMENT: bool = ENVIRONMENT == "development"
IS_PRODUCTION: bool = ENVIRONMENT == "production"


# ============================================
# Validation
# ============================================
# Crash early if critical settings are missing.
# Better to fail at startup than discover during a user request.
if not MONGO_URI:
    raise ValueError(
        "MONGO_URI is not set. "
        "Check that .env exists in the backend/ folder "
        "and contains the MONGO_URI line."
    )