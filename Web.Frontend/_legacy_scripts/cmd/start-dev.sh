#!/bin/bash

echo "🚀 Starting V7 Portal development services..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap Ctrl+C and cleanup
trap cleanup SIGINT SIGTERM

# Start incident service
echo "📋 Starting incident service on port 3014..."
cd apps/services/incident-manager
npm start &
INCIDENT_PID=$!

# Wait a moment for the service to start
sleep 3

# Go back to Web.Frontend root and start frontend
cd ../../..
echo "🌐 Starting frontend on port 3000..."
cd apps/frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ All services started!"
echo "📋 Incident Service: http://localhost:3014"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait