
      CREATE FUNCTION NVQ.udfGetInspectorDiaryTimeByType
      (
          @AssessorId INT,
          @StartDate DATETIMEOFFSET (7),
          @EndDate DATETIMEOFFSET (7),
          @LogTypeId INT
      )
      RETURNS INT
      AS
      BEGIN
          DECLARE @TotalMinutes INT

          SELECT
              @TotalMinutes = ISNULL(SUM(ad.Duration), 0)
          FROM
              NVQ.tblAssessmentDiary ad
          INNER JOIN
              NVQ.tblPortfolio p ON p.PortfolioId = ad.PortfolioId
          WHERE
              ad.AssessorId = @AssessorId
              AND ad.LogTypeId = @LogTypeId
              AND (@StartDate IS NULL OR ad.ActivityDate >= @StartDate)
              AND (@EndDate IS NULL OR ad.ActivityDate <= @EndDate)
              AND p.IsActive = 1

          RETURN @TotalMinutes
      END