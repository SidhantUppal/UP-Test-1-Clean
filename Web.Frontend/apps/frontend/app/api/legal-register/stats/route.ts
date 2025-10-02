import { NextRequest, NextResponse } from 'next/server';
import * as sql from 'mssql';

// Database configuration - using SQL Authentication for Azure
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || 'YOUR_DATABASE_SERVER.database.windows.net',
  database: process.env.DB_NAME || 'V7-Dev',
  user: process.env.DB_USER || 'YOUR_DB_USER',
  password: process.env.DB_PASSWORD || 'YOUR_DB_PASSWORD',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || true, // Set to true for Azure
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' || false, // For Azure SQL Server
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export async function GET(request: NextRequest) {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    // Connect to database
    pool = await sql.connect(dbConfig);
    
    // Get total statistics
    const totalStats = await pool.request().query(`
      SELECT 
        COUNT(*) as TotalLegislation,
        SUM(CASE WHEN ComplianceStatus = 'Approved' THEN 1 ELSE 0 END) as ApprovedCount,
        SUM(CASE WHEN ComplianceStatus = 'Under Review' THEN 1 ELSE 0 END) as UnderReviewCount,
        SUM(CASE WHEN ComplianceStatus = 'Not Applicable' THEN 1 ELSE 0 END) as NotApplicableCount,
        SUM(CASE WHEN DATEDIFF(day, LatestUpdate, sysdatetimeoffset()) <= 90 THEN 1 ELSE 0 END) as RecentUpdatesCount
      FROM [dbo].[LegalRegister]
    `);
    
    // Get risk level distribution
    const riskStats = await pool.request().query(`
      SELECT 
        RiskLevel,
        COUNT(*) as Count
      FROM [dbo].[LegalRegister]
      GROUP BY RiskLevel
    `);
    
    // Get industry breakdown
    const industryStats = await pool.request().query(`
      SELECT 
        IndustryName,
        COUNT(*) as Total,
        SUM(CASE WHEN ComplianceStatus = 'Approved' THEN 1 ELSE 0 END) as Approved,
        SUM(CASE WHEN ComplianceStatus = 'Under Review' THEN 1 ELSE 0 END) as UnderReview,
        SUM(CASE WHEN ComplianceStatus = 'Not Applicable' THEN 1 ELSE 0 END) as NotApplicable
      FROM [dbo].[LegalRegister]
      GROUP BY IndustryName
    `);
    
    const totalData = totalStats.recordset[0];
    
    // Format risk distribution
    const riskDistribution: Record<string, number> = {};
    riskStats.recordset.forEach((row: any) => {
      riskDistribution[row.RiskLevel?.toLowerCase() || 'unknown'] = row.Count;
    });
    
    // Format industry data
    const byIndustry: Record<string, any> = {};
    industryStats.recordset.forEach((row: any) => {
      byIndustry[row.IndustryName] = {
        total: row.Total,
        compliant: row.Approved,
        nonCompliant: row.UnderReview,
        partiallyCompliant: row.NotApplicable
      };
    });
    
    // Calculate compliance rate
    const complianceRate = totalData.TotalLegislation > 0 
      ? Math.round((totalData.ApprovedCount / totalData.TotalLegislation) * 100) 
      : 0;
    
    const stats = {
      TotalLegislation: totalData.TotalLegislation,
      ApprovedCount: totalData.ApprovedCount,
      UnderReviewCount: totalData.UnderReviewCount,
      NotApplicableCount: totalData.NotApplicableCount,
      RecentUpdatesCount: totalData.RecentUpdatesCount,
      total: totalData.TotalLegislation,
      compliant: totalData.ApprovedCount,
      partiallyCompliant: totalData.NotApplicableCount,
      nonCompliant: totalData.UnderReviewCount,
      complianceRate: complianceRate,
      riskDistribution: {
        high: riskDistribution['high'] || 0,
        medium: riskDistribution['medium'] || 0,
        low: riskDistribution['low'] || 0
      },
      byIndustry: byIndustry,
      recentUpdates: totalData.RecentUpdatesCount,
      overdueReviews: 0, // TODO: Calculate based on review dates
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database operation failed:', errorMessage);
    
    // Fallback to mock data if database fails
    const mockStats = {
      TotalLegislation: 0,
      ApprovedCount: 0,
      UnderReviewCount: 0,
      NotApplicableCount: 0,
      RecentUpdatesCount: 0,
      total: 0,
      compliant: 0,
      partiallyCompliant: 0,
      nonCompliant: 0,
      complianceRate: 0,
      riskDistribution: {
        high: 0,
        medium: 0,
        low: 0
      },
      byIndustry: {},
      recentUpdates: 0,
      overdueReviews: 0,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockStats,
      message: 'Using mock data - database connection failed'
    });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}