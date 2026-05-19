"""
Contact Form Routes
────────────────────
Defines the POST /api/contact endpoint.

When the frontend submits the contact form:
1. FastAPI validates the data using ContactCreate schema
2. We save it to the MongoDB 'contacts' collection
3. We return a confirmation with the new document's ID

Future enhancements (later steps):
- Send email notification to Marni
- Rate limiting to prevent spam
- Maybe a captcha
"""

from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from app.schemas.contact import ContactCreate, ContactResponse
from app.database.mongodb import get_database


# Create a "router" — a mini-app that groups related endpoints.
# All endpoints defined here will be prefixed with /api/contact.
# We'll attach this router to the main FastAPI app in main.py.
router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"],  # Groups endpoints in the Swagger UI for nice organization
)


@router.post(
    "",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form message",
    description="Receives a contact form submission, saves it to MongoDB, "
                "and returns a confirmation with the new document's ID.",
)
async def create_contact(payload: ContactCreate):
    """
    Save a new contact form submission to the database.

    The 'payload' parameter is automatically:
    - Read from the JSON request body
    - Validated against ContactCreate (rejects bad data with 422 error)
    - Converted to a Python object
    """
    try:
        # Get the database instance (set up during FastAPI startup)
        db = get_database()

        # Build the document to insert.
        # We use .model_dump() to convert the Pydantic object to a dict.
        # We add created_at because the schema didn't include it (server-generated).
        document = payload.model_dump()
        document["created_at"] = datetime.now(timezone.utc)
        document["status"] = "new"  # could be 'new', 'read', 'replied' later

        # Insert into MongoDB.
        # db.contacts refers to the 'contacts' collection inside portfolio_db.
        # If the collection doesn't exist yet, MongoDB creates it automatically.
        result = await db.contacts.insert_one(document)

        # result.inserted_id is the unique ID MongoDB generated for the new doc
        print(f"📩 New contact saved: {result.inserted_id} from {payload.email}")

        # Build the response
        return ContactResponse(
            success=True,
            message="Thanks! Your message has been received.",
            id=str(result.inserted_id),  # convert ObjectId to string for JSON
            created_at=document["created_at"],
        )

    except Exception as e:
        # If anything goes wrong (DB down, network issue, etc.),
        # return a clean 500 error instead of crashing.
        print(f"❌ Failed to save contact: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save your message. Please try again later.",
        )