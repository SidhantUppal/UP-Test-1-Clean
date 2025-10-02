
      CREATE FUNCTION NVQ.udfGetInspectorEvidenceCount
      (
          @AssessorId INT,
          @StartDate DATETIMEOFFSET (7),
          @EndDate DATETIMEOFFSET (7)
      )
      RETURNS INT
      AS
      BEGIN
          DECLARE @EvidenceCount INT

          SELECT
              @EvidenceCount = COUNT(*)
          FROM
              NVQ.tblEvidence e
          INNER JOIN
              NVQ.tblPortfolio p ON p.PortfolioId = e.PortfolioId
          WHERE
              p.AssessorId = @AssessorId
              AND (@StartDate IS NULL OR e.CreatedDate >= @StartDate)
              AND (@EndDate IS NULL OR e.CreatedDate <= @EndDate)

          RETURN @EvidenceCount
      END