#!/bin/bash

echo "Testing Documents API through Next.js proxy..."
echo "=========================================="

# Test 1: GET documents list
echo -e "\n1. Testing GET /api/documents (list documents):"
curl -X GET http://localhost:3000/api/documents?pageSize=5 \
  -H "x-user-id: 1" \
  -H "x-user-area-id: 1" \
  -s | jq '.' || echo "Failed to get documents"

# Test 2: Create a document (JSON)
echo -e "\n\n2. Testing POST /api/documents (create document):"
curl -X POST http://localhost:3000/api/documents \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -H "x-user-area-id: 1" \
  -d '{
    "originalFileName": "test-document.pdf",
    "displayName": "Test Document via API",
    "privacyLevel": "Public",
    "documentType": "Document"
  }' \
  -s | jq '.' || echo "Failed to create document"

# Test 3: Get specific document (replace ID as needed)
echo -e "\n\n3. Testing GET /api/documents/1 (get specific document):"
curl -X GET http://localhost:3000/api/documents/1 \
  -H "x-user-id: 1" \
  -H "x-user-area-id: 1" \
  -s | jq '.' || echo "Failed to get specific document"

# Test 4: Test tags endpoint (should still work)
echo -e "\n\n4. Testing GET /api/documents/tags (get template tags):"
curl -X GET http://localhost:3000/api/documents/tags \
  -H "x-user-id: 1" \
  -H "x-user-area-id: 1" \
  -s | jq '.tags[0]' || echo "Failed to get tags"

echo -e "\n\nTest complete!"