"""
MongoDB Connection Manager
───────────────────────────
Handles opening and closing the connection to MongoDB Atlas.

Uses Motor — the async MongoDB driver — so database operations
don't block other requests while waiting for the database.

Pattern:
- One client instance, reused across all routes
- Connection opens on FastAPI startup
- Connection closes on FastAPI shutdown
"""
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import MONGO_URI, MONGO_DB_NAME


# ============================================
# Module-level connection state
# ============================================
# These variables hold the active client and database instance.
# They start as None and get populated when connect_to_mongo() runs.
client: AsyncIOMotorClient = None
database = None


# ============================================
# Connection lifecycle functions
# ============================================
async def connect_to_mongo():
    """
    Open a connection to MongoDB Atlas.
    Called once when FastAPI starts up.
    """
    global client, database

    print("🔌 Connecting to MongoDB...")
    try:
        # Create the async MongoDB client
        client = AsyncIOMotorClient(
            MONGO_URI,
            tls=True,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=30000,
        )

        # Ping the server to verify the connection actually works.
        # If credentials are wrong or network is blocked, this raises.
        await client.admin.command("ping")

        # Select the specific database we'll use
        database = client[MONGO_DB_NAME]

        print(f"✅ Connected to MongoDB! Database: {MONGO_DB_NAME}")

    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise  # re-raise so FastAPI startup fails loudly


async def close_mongo_connection():
    """
    Close the MongoDB connection cleanly.
    Called once when FastAPI shuts down.
    """
    global client
    if client is not None:
        client.close()
        print("👋 MongoDB connection closed.")


# ============================================
# Helper to get the database instance
# ============================================
def get_database():
    """
    Get the active database instance.
    Routes will call this to access collections.

    Example usage in a route file:
        db = get_database()
        await db.contacts.insert_one({...})
    """
    if database is None:
        raise RuntimeError(
            "Database not initialized. "
            "Did connect_to_mongo() run on startup?"
        )
    return database