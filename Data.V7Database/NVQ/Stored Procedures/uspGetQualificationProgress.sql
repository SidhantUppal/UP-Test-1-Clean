CREATE PROCEDURE NVQ.uspGetQualificationProgress
    @PortfolioId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        u.UnitId,
        u.UnitCode,
        u.UnitTitle,
        u.Credits,
        qu.IsMandatory,
        COUNT(DISTINCT pc.CriteriaId) as TotalCriteria,
        COUNT(DISTINCT epc.CriteriaId) as MetCriteria,
        CASE 
            WHEN COUNT(DISTINCT pc.CriteriaId) > 0 
            THEN (CAST(COUNT(DISTINCT epc.CriteriaId) AS FLOAT) / COUNT(DISTINCT pc.CriteriaId)) * 100
            ELSE 0 
        END as UnitProgress
    FROM NVQ.tblPortfolio p
    INNER JOIN NVQ.tblQualificationUnit qu ON qu.QualificationId = p.QualificationId
    INNER JOIN NVQ.tblUnit u ON u.UnitId = qu.UnitId
    LEFT JOIN NVQ.tblElement e ON e.UnitId = u.UnitId
    LEFT JOIN NVQ.tblPerformanceCriteria pc ON pc.ElementId = e.ElementId
    LEFT JOIN NVQ.tblEvidencePerformanceCriteria epc 
        ON epc.CriteriaId = pc.CriteriaId 
        AND epc.IsMet = 1
        AND EXISTS (
            SELECT 1 FROM NVQ.tblEvidence ev 
            WHERE ev.EvidenceId = epc.EvidenceId 
            AND ev.PortfolioId = @PortfolioId
        )
    WHERE p.PortfolioId = @PortfolioId
    GROUP BY u.UnitId, u.UnitCode, u.UnitTitle, u.Credits, qu.IsMandatory
    ORDER BY qu.IsMandatory DESC, u.UnitCode
END