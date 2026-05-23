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
# Resend Email Service
# ============================================
RESEND_API_KEY: str = os.environ.get("RESEND_API_KEY", "")
RESEND_FROM_EMAIL: str = os.environ.get("RESEND_FROM_EMAIL", "onboarding@resend.dev")
NOTIFICATION_EMAIL: str = os.environ.get("NOTIFICATION_EMAIL", "")

# ============================================
# Telegram Bot for Notifications
# ============================================
TELEGRAM_BOT_TOKEN: str = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID: str = os.environ.get("TELEGRAM_CHAT_ID", "")



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
    
# Warnings (don't crash — just log) for optional services
if not RESEND_API_KEY:
    print("Warning: RESEND_API_KEY not set. Email notifications will be skipped.")

if not NOTIFICATION_EMAIL:
    print("Warning: NOTIFICATION_EMAIL not set. Email notifications will be skipped.")
    
if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
    print("⚠️  Warning: Telegram not configured. Telegram notifications will be skipped.")