
      CREATE FUNCTION NVQ.udfGetTotalAssessmentMinutes
      (
          @PortfolioId INT
      )
      RETURNS INT
      AS
      BEGIN
          DECLARE @TotalMinutes INT

          SELECT
              @TotalMinutes = ISNULL(SUM(Duration), 0)
          FROM
              NVQ.tblAssessmentDiary
          WHERE
              PortfolioId = @PortfolioId

          RETURN @TotalMinutes
      END