
      CREATE PROCEDURE NVQ.uspGetPortfolioDetails
          @PortfolioId INT
      AS
      BEGIN
          SET NOCOUNT ON;

          SELECT 
              p.*,
              ps.StatusName,
              ps.StatusDescription,
              q.QualificationTitle,
              q.QualificationCode,
              q.Level as QualificationLevel,
              NVQ.udfGetPortfolioProgress(p.PortfolioId) as CalculatedProgress,
              NVQ.udfGetTotalAssessmentMinutes(p.PortfolioId) as TotalAssessmentTime
          FROM NVQ.tblPortfolio p
          LEFT JOIN NVQ.tblPortfolioStatus ps ON p.PortfolioStatusId = ps.PortfolioStatusId
          LEFT JOIN NVQ.tblQualification q ON p.QualificationId = q.QualificationId
          WHERE p.PortfolioId = @PortfolioId
      END