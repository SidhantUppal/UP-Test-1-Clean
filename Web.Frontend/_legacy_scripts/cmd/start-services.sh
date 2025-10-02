#!/bin/bash

echo "Starting T100 Services..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    netstat -an | grep -q ":$1 " && echo "true" || echo "false"
}

# Function to wait for service
wait_for_service() {
    local port=$1
    local service=$2
    local max_attempts=30
    local attempt=0
    
    echo -e "${YELLOW}Waiting for $service on port $port...${NC}"
    while [ $attempt -lt $max_attempts ]; do
        if curl -s http://localhost:$port/health > /dev/null 2>&1; then
            echo -e "${GREEN}✓ $service is ready on port $port${NC}"
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    echo -e "${RED}✗ $service failed to start on port $port${NC}"
    return 1
}

# Start checklists service
echo -e "${YELLOW}Starting Checklists Service...${NC}"
cd apps/services/checklists-service
npm run dev > checklists.log 2>&1 &
CHECKLIST_PID=$!
echo "Checklists service PID: $CHECKLIST_PID"

# Wait for checklists service
wait_for_service 3004 "Checklists Service"

# Start other services if needed
# cd ../documents-service && npm run dev &
# wait_for_service 3006 "Documents Service"

echo -e "${GREEN}All services started!${NC}"
echo ""
echo "Service URLs:"
echo "- Checklists: http://localhost:3004"
echo "- Frontend: http://localhost:3000"
echo ""
echo "To stop services, run: kill $CHECKLIST_PID"