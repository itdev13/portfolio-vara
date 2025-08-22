# MongoDB Setup Instructions

## ✅ Configuration Complete

Your MongoDB connection is now configured and ready to use!

**Database**: `Freelancer` cluster on MongoDB Atlas
**Connection**: Configured in `/src/app/api/contact/route.ts`
**Collections**: Will auto-create `portfolio.contacts` collection

## Environment Variables (Optional)

For additional security, you can create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://vara:gIgTLx38uTC78SLx@freelancer.8rdh8ih.mongodb.net/?retryWrites=true&w=majority&appName=Freelancer
DATABASE_NAME=portfolio
COLLECTION_NAME=contacts
```

## MongoDB Connection String Examples

### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

### Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/
```

### MongoDB with Authentication
```
MONGODB_URI=mongodb://username:password@host:port/database
```

## Required Dependencies

Install the MongoDB driver:
```bash
npm install mongodb
```

## Database Schema

The contact form will create documents with the following structure:

```json
{
  "_id": "ObjectId",
  "name": "Full Name",
  "email": "email@example.com",
  "mobile": "phone number (optional)",
  "description": "Project description",
  "timestamp": "ISO timestamp",
  "createdAt": "Date object",
  "status": "new",
  "source": "portfolio-website"
}
```

## Testing the API

You can test the API endpoint at: `POST /api/contact`

Example request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+1234567890",
  "description": "I need help with a React project"
}
```
