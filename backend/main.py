"""
FastAPI Application Entry Point

This file is what Uvicorn loads when starting the server.
It creates the FastAPI instance, sets up CORS, registers
routes, and manages the database connection lifecycle.

Run locally with:
    uvicorn main:app --reload
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database lifecycle functions
from app.database.mongodb import connect_to_mongo, close_mongo_connection


# ============================================
# Lifespan handler - manages startup/shutdown
# ============================================
# This replaces the old @app.on_event("startup") pattern.
# It's the modern FastAPI way to run code when the server
# starts and stops.
@asynccontextmanager
async def lifespan(app: FastAPI):
    # === Startup ===
    print("🚀 Starting Portfolio API...")
    await connect_to_mongo()
    yield  # <-- app runs here, between startup and shutdown
    # === Shutdown ===
    print("🛑 Shutting down Portfolio API...")
    await close_mongo_connection()


# ============================================
# Create the FastAPI app instance
# ============================================
app = FastAPI(
    title="Portfolio API",
    version="0.1.0",
    description="Backend API for Marni Jayaram's portfolio website.",
    lifespan=lifespan,  # ← attach the lifespan handler
)


# ============================================
# CORS configuration
# ============================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",                       # local Vite dev server
        "https://marnijayaram-portfolio.vercel.app",   # production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# (lifespan code...)
# (app = FastAPI(...))
# (CORS middleware...)

# ============================================
# Register API routers
# ============================================
from app.routes.contact import router as contact_router

app.include_router(contact_router)


# ============================================
# Endpoints
# ============================================
@app.get("/")
def root():
    """Root endpoint - confirms the API is up."""
    return {
        "message": "Portfolio API is running",
        "status": "ok",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    """Health check endpoint used by hosting platforms."""
    return {
        "status": "healthy",
        "service": "portfolio-api",
    }