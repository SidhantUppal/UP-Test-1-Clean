
      CREATE PROCEDURE NVQ.uspCreatePortfolio
          @LearnerId INT,
          @QualificationId INT,
          @AssessorId INT = NULL,
          @StartDate DATETIMEOFFSET (7) = NULL,
          @TargetEndDate DATETIMEOFFSET (7) = NULL,
          @CreatedBy INT,
          @PortfolioId INT OUTPUT
      AS
      BEGIN
          SET NOCOUNT ON;
          
          BEGIN TRY
              BEGIN TRANSACTION
              
              IF @StartDate IS NULL
                  SET @StartDate = sysdatetimeoffset()
              
              INSERT INTO NVQ.tblPortfolio (
                  LearnerId,
                  QualificationId,
                  AssessorId,
                  PortfolioStatusId,
                  StartDate,
                  TargetEndDate,
                  ProgressPercentage,
                  IsActive,
                  CreatedBy,
                  CreatedDate
              )
              VALUES (
                  @LearnerId,
                  @QualificationId,
                  @AssessorId,
                  1,
                  @StartDate,
                  @TargetEndDate,
                  0,
                  1,
                  @CreatedBy,
                  sysdatetimeoffset()
              )
              
              SET @PortfolioId = SCOPE_IDENTITY()
              
              INSERT INTO NVQ.tblAssessmentDiary (
                  PortfolioId,
                  LogTypeId,
                  ActivityDate,
                  ActivityDescription,
                  AssessorId,
                  LearnerId,
                  CreatedBy,
                  CreatedDate
              )
              VALUES (
                  @PortfolioId,
                  1,
                  @StartDate,
                  'Portfolio created and initial assessment scheduled',
                  @AssessorId,
                  @LearnerId,
                  @CreatedBy,
                  sysdatetimeoffset()
              )
              
              COMMIT TRANSACTION
          END TRY
          BEGIN CATCH
              ROLLBACK TRANSACTION
              THROW
          END CATCH
      END