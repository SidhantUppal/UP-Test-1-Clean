CREATE PROCEDURE NVQ.uspGeneratePortfolioReport
    @PortfolioId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Portfolio Header Information
    SELECT 
        'Portfolio Summary' as ReportSection,
        p.PortfolioId,
        p.LearnerId,
        p.StartDate,
        p.TargetEndDate,
        ps.StatusName as CurrentStatus,
        q.QualificationTitle,
        q.QualificationCode,
        q.Level,
        q.AwardingBody,
        p.ProgressPercentage
    FROM NVQ.tblPortfolio p
    LEFT JOIN NVQ.tblPortfolioStatus ps ON p.PortfolioStatusId = ps.PortfolioStatusId
    LEFT JOIN NVQ.tblQualification q ON p.QualificationId = q.QualificationId
    WHERE p.PortfolioId = @PortfolioId
    
    -- Evidence Summary
    SELECT 
        'Evidence Summary' as ReportSection,
        et.TypeName,
        COUNT(*) as EvidenceCount,
        MIN(e.EvidenceDate) as EarliestEvidence,
        MAX(e.EvidenceDate) as LatestEvidence
    FROM NVQ.tblEvidence e
    LEFT JOIN NVQ.tblEvidenceType et ON e.EvidenceTypeId = et.EvidenceTypeId
    WHERE e.PortfolioId = @PortfolioId
    GROUP BY et.TypeName
    
    -- Assessment Activity Summary
    SELECT 
        'Assessment Activity' as ReportSection,
        lt.LogTypeName,
        COUNT(*) as ActivityCount,
        SUM(ad.Duration) as TotalMinutes,
        MAX(ad.ActivityDate) as LastActivity
    FROM NVQ.tblAssessmentDiary ad
    LEFT JOIN NVQ.tblAssessmentDiaryLogType lt ON ad.LogTypeId = lt.LogTypeId
    WHERE ad.PortfolioId = @PortfolioId
    GROUP BY lt.LogTypeName
    
    -- Unit Progress
    EXEC NVQ.uspGetQualificationProgress @PortfolioId
END