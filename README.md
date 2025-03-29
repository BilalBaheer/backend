# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

This repository contains the backend API for the NegotiateAI application, which provides real-time negotiation suggestions and analysis.

## Features

- User authentication
- Email analysis
- Negotiation suggestions
- Integration with OpenAI API

## Technologies

- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/BilalBaheer/backend.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5002
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the server
   ```
   npm start
   ```

## API Endpoints

- `/api/auth` - Authentication endpoints
- `/api/analysis` - Text analysis endpoints
- `/api/suggestions` - Negotiation suggestion endpoints

## Deployment

The API is deployed at https://negotiateai-api.onrender.com
