import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string with SSL fix for serverless environments
const MONGODB_URI = 'mongodb+srv://vara:gIgTLx38uTC78SLx@freelancer.8rdh8ih.mongodb.net/?retryWrites=true&w=majority&appName=Freelancer&ssl=true&tlsAllowInvalidCertificates=true';
const DATABASE_NAME = 'portfolio';
const COLLECTION_NAME = 'contacts';

let client: MongoClient | null = null;

async function connectToDatabase() {
  try {
    if (!client) {
      console.log('Creating new MongoDB client...');
      client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        connectTimeoutMS: 10000, // Give up initial connection after 10s
        maxPoolSize: 10, // Maintain up to 10 socket connections
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
      });
      await client.connect();
      console.log('Connected to MongoDB successfully');
    }
    return client.db(DATABASE_NAME);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    client = null; // Reset client on error
    throw error;
  }
}

export async function POST(request: NextRequest) {
  console.log('Contact form API called');
  
  try {
    const body = await request.json();
    console.log('Request body received:', { ...body, email: body.email ? '[REDACTED]' : undefined });
    
    const { name, email, mobile, description, timestamp } = body;

    // Validate required fields
    if (!name || !email || !description) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and description are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Attempting to connect to database...');
    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);
    console.log('Database connection successful');

    // Prepare document to insert
    const contactDocument = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile ? mobile.trim() : null,
      description: description.trim(),
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date(),
      status: 'new',
      source: 'portfolio-website'
    };

    console.log('Inserting document into collection...');
    // Insert document
    const result = await collection.insertOne(contactDocument);
    console.log('Insert result:', { acknowledged: result.acknowledged, insertedId: result.insertedId });

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
    
    // More specific error messages
    let errorMessage = 'Failed to submit contact form. Please try again later.';
    if (error instanceof Error) {
      if (error.message.includes('MongoServerError') || error.message.includes('connection')) {
        errorMessage = 'Database connection failed. Please try again later.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    // Test the connection by counting documents
    const count = await collection.countDocuments();
    console.log('MongoDB connection test successful, document count:', count);
    
    return NextResponse.json(
      { 
        message: 'Contact API endpoint is working',
        mongodb: 'Connected successfully',
        collection: COLLECTION_NAME,
        documentCount: count
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json(
      { 
        message: 'Contact API endpoint is working',
        mongodb: 'Connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 200 }
    );
  }
}
