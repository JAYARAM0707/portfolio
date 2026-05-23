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
                "and sends an email notification.",
)
async def create_contact(payload: ContactCreate):
    """
    Save a new contact form submission to the database
    and notify the owner via email.

    Email failure does NOT fail the request — submission is still saved.
    """
    db = get_database()

    # ============================================
    # STEP 1: Save to MongoDB (critical — fail if this fails)
    # ============================================
    try:
        document = payload.model_dump()
        document["created_at"] = datetime.now(timezone.utc)
        document["status"] = "new"

        result = await db.contacts.insert_one(document)
        print(f"📩 New contact saved: {result.inserted_id} from {payload.email}")

    except Exception as e:
        print(f"❌ Failed to save contact to MongoDB: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save your message. Please try again later.",
        )

    # ============================================
    # STEP 2: Send notifications (best-effort — don't fail request)
    # ============================================
    from app.services.notifications import (
        send_contact_notification_email,
        send_contact_notification_telegram,
    )

    # Email notification
    try:
        await send_contact_notification_email(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
        )
    except Exception as e:
        print(f"⚠️  Email notification failed (but submission is saved): {e}")

    # Telegram notification
    try:
        await send_contact_notification_telegram(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
        )
    except Exception as e:
        print(f"⚠️  Telegram notification failed (but submission is saved): {e}")

    # ============================================
    # STEP 3: Return success
    # ============================================
    return ContactResponse(
        success=True,
        message="Thanks! Your message has been received.",
        id=str(result.inserted_id),
        created_at=document["created_at"],
    )