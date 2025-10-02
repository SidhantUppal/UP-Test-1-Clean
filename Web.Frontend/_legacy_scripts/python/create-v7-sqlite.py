#!/usr/bin/env python3
"""
Create V7 SQLite database from the extracted Azure schema
This script creates a complete SQLite database with all 38 V7 tables
"""

import sqlite3
import json
from datetime import datetime

def create_database():
    # Connect to SQLite database (creates it if it doesn't exist)
    conn = sqlite3.connect('v7-schema.db')
    cursor = conn.cursor()
    
    # Enable foreign keys
    cursor.execute("PRAGMA foreign_keys = ON")
    
    # Read the SQL schema file
    with open('v7-complete-schema.sql', 'r') as f:
        schema_sql = f.read()
    
    # Split by semicolons to execute each statement separately
    statements = [stmt.strip() for stmt in schema_sql.split(';') if stmt.strip()]
    
    # Execute each statement
    for i, statement in enumerate(statements):
        try:
            # Skip GO statements (SQL Server specific)
            if statement.upper().strip() == 'GO':
                continue
                
            # Skip SET statements (SQL Server specific)
            if statement.upper().startswith('SET '):
                continue
                
            cursor.execute(statement)
            print(f"Executed statement {i+1}/{len(statements)}")
        except sqlite3.Error as e:
            print(f"Error executing statement {i+1}: {e}")
            print(f"Statement: {statement[:100]}...")
    
    # Commit changes
    conn.commit()
    
    # Verify tables were created
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = cursor.fetchall()
    
    print(f"\nCreated {len(tables)} tables:")
    for table in tables:
        cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
        count = cursor.fetchone()[0]
        print(f"  - {table[0]}: {count} rows")
    
    # Close connection
    conn.close()
    print("\nDatabase created successfully: v7-schema.db")

if __name__ == "__main__":
    create_database()