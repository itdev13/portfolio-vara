import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vara:gIgTLx38uTC78SLx@freelancer.8rdh8ih.mongodb.net/?retryWrites=true&w=majority&appName=Freelancer';
const DATABASE_NAME = process.env.DATABASE_NAME || 'portfolio';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'contacts';

let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db(DATABASE_NAME);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, description, timestamp } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    // Prepare document to insert
    const contactDocument = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile ? mobile.trim() : null,
      description: description.trim(),
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date(),
      status: 'new', // You can use this to track if you've responded
      source: 'portfolio-website'
    };

    // Insert document
    const result = await collection.insertOne(contactDocument);

    if (result.acknowledged) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully',
          id: result.insertedId 
        },
        { status: 200 }
      );
    } else {
      throw new Error('Failed to insert document');
    }

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to submit contact form. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
}
