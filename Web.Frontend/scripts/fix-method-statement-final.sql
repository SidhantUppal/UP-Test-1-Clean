-- Create MethodStatement table
USE [V7-Dev];
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[T100].[MethodStatement]') AND type in (N'U'))
BEGIN
    CREATE TABLE [T100].[MethodStatement](
        [MethodStatementID] [int] IDENTITY(1,1) NOT NULL,
        [UserAreaID] [int] NOT NULL,
        [SSOWDocumentTypeID] [int] NOT NULL,
        [SSOWStatusTypeID] [int] NOT NULL,
        [DocumentNumber] [nvarchar](50) NOT NULL,
        [DocumentTitle] [nvarchar](255) NOT NULL,
        [DocumentVersion] [nvarchar](20) NULL DEFAULT ('1.0'),
        [PreviousVersionID] [int] NULL,
        [IsCurrentVersion] [bit] NULL DEFAULT (1),
        [WorkDescription] [nvarchar](max) NOT NULL,
        [Location] [nvarchar](500) NULL,
        [Equipment] [nvarchar](max) NULL,
        [Materials] [nvarchar](max) NULL,
        [MinimumPersonnel] [int] NULL DEFAULT (1),
        [MaximumPersonnel] [int] NULL,
        [RequiredCompetencies] [nvarchar](max) NULL,
        [TrainingRequirements] [nvarchar](max) NULL,
        [SSOWRiskCategoryID] [int] NULL,
        [MainHazards] [nvarchar](max) NULL,
        [RiskAssessmentID] [int] NULL,
        [AuthorUserID] [int] NOT NULL,
        [ReviewerUserID] [int] NULL,
        [ApproverUserID] [int] NULL,
        [ReviewDate] [datetimeoffset](7) NULL,
        [ApprovalDate] [datetimeoffset](7) NULL,
        [NextReviewDate] [datetimeoffset](7) NULL,
        [PublishedDate] [datetimeoffset](7) NULL,
        [PublishedByUserID] [int] NULL,
        [EffectiveDate] [datetimeoffset](7) NULL,
        [ExpiryDate] [datetimeoffset](7) NULL,
        [EmergencyProcedures] [nvarchar](max) NULL,
        [EmergencyContacts] [nvarchar](max) NULL,
        [LegalRequirements] [nvarchar](max) NULL,
        [References] [nvarchar](max) NULL,
        [AdditionalNotes] [nvarchar](max) NULL,
        [IsActive] [bit] NULL DEFAULT (1),
        [CreatedByUserID] [int] NOT NULL,
        [CreatedDate] [datetimeoffset](7) NOT NULL DEFAULT (sysdatetimeoffset()),
        [ModifiedByUserID] [int] NULL,
        [ModifiedDate] [datetimeoffset](7) NULL,
        [ArchivedByUserID] [int] NULL,
        [ArchivedDate] [datetimeoffset](7) NULL,
     CONSTRAINT [PK_MethodStatement] PRIMARY KEY CLUSTERED 
    (
        [MethodStatementID] ASC
    )
    );
    PRINT 'Created T100.MethodStatement table';
END
ELSE
BEGIN
    PRINT 'T100.MethodStatement table already exists';
END
GO