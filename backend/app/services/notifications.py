"""
Notifications Service
─────────────────────
Sends notifications when events happen in the app.

Currently supports:
- Email via Resend

To add later:
- Telegram via Bot API
"""
import httpx
import resend
from app.config.settings import (
    RESEND_API_KEY,
    RESEND_FROM_EMAIL,
    NOTIFICATION_EMAIL,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
)

# Configure Resend SDK with API key
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


async def send_contact_notification_email(
    name: str,
    email: str,
    subject: str | None,
    message: str,
) -> bool:
    """
    Send an email notification when a new contact form submission arrives.

    Returns:
        True if email sent successfully
        False if email failed (logged but doesn't crash the app)
    """
    # Skip silently if Resend isn't configured
    if not RESEND_API_KEY or not NOTIFICATION_EMAIL:
        print("📭 Skipping email — Resend not fully configured.")
        return False

    # Subject line
    email_subject = f"🎉 New portfolio message from {name}"
    if subject:
        email_subject += f" — {subject}"

    # HTML version (renders nicely in Gmail)
    html_body = f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">

      <div style="background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: white; font-size: 22px;">🎉 New Portfolio Message</h1>
      </div>

      <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">From:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;"><strong>{name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:{email}" style="color: #0284c7; text-decoration: none;">{email}</a></td>
          </tr>
          {f'<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subject:</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">{subject}</td></tr>' if subject else ''}
        </table>

        <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; margin: 16px 0; border-radius: 4px;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message</div>
          <div style="color: #1a1a1a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">{message}</div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent from your portfolio at marnijayaram-portfolio.vercel.app
        </div>

      </div>
    </div>
    """

    # Plain-text fallback (in case email client doesn't render HTML)
    text_body = f"""
New Portfolio Message
━━━━━━━━━━━━━━━━━━━━

From:    {name}
Email:   {email}
{f"Subject: {subject}" if subject else ""}

Message:
{message}

━━━━━━━━━━━━━━━━━━━━
Sent from marnijayaram-portfolio.vercel.app
    """.strip()

    try:
        result = resend.Emails.send({
            "from": f"Portfolio Notifications <{RESEND_FROM_EMAIL}>",
            "to": NOTIFICATION_EMAIL,
            "reply_to": email,  # allows you to reply directly to the sender from Gmail
            "subject": email_subject,
            "html": html_body,
            "text": text_body,
        })
        print(f"📧 Email notification sent! Resend ID: {result.get('id')}")
        return True

    except Exception as e:
        print(f"❌ Email notification failed: {e}")
        return False
    

# ============================================
# Telegram Notification
# ============================================
async def send_contact_notification_telegram(
    name: str,
    email: str,
    subject: str | None,
    message: str,
) -> bool:
    """
    Send a Telegram message when a new contact form submission arrives.

    Returns:
        True if message sent successfully
        False if failed (logged but doesn't crash the app)
    """
    # Skip silently if Telegram isn't configured
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("📭 Skipping Telegram — bot not configured.")
        return False

    # Build the message text with Telegram's MarkdownV2 formatting
    # Note: certain chars need escaping in MarkdownV2 (we use plain HTML mode for simplicity)
    text = f"""🎉 <b>New Portfolio Message!</b>

👤 <b>From:</b> {name}
📧 <b>Email:</b> {email}"""

    if subject:
        text += f"\n📌 <b>Subject:</b> {subject}"

    text += f"""

💬 <b>Message:</b>
{message}"""

    # Telegram Bot API endpoint
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url,
                json={
                    "chat_id": TELEGRAM_CHAT_ID,
                    "text": text,
                    "parse_mode": "HTML",
                    "disable_web_page_preview": True,
                },
            )

        if response.status_code == 200:
            print("📱 Telegram notification sent!")
            return True
        else:
            print(f"❌ Telegram failed: HTTP {response.status_code} — {response.text}")
            return False

    except Exception as e:
        print(f"❌ Telegram notification failed: {e}")
        return False