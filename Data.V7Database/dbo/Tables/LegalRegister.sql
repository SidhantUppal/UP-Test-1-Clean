CREATE TABLE [dbo].[LegalRegister] (
    [LegalRegisterID]     INT             IDENTITY (1, 1) NOT NULL,
    [Name]                NVARCHAR (500)  NOT NULL,
    [Link]                NVARCHAR (1000) NULL,
    [LatestUpdate]        DATETIMEOFFSET (7)        NULL,
    [RiskLevel]           NVARCHAR (50)   NULL,
    [ComplianceStatus]    NVARCHAR (50)   NULL,
    [Notes]               NVARCHAR (MAX)  NULL,
    [IndustryName]        NVARCHAR (200)  NULL,
    [LegislationType]     NVARCHAR (100)  NULL,
    [CreatedDate]         DATETIMEOFFSET (7)        NULL,
    [ModifiedDate]        DATETIMEOFFSET (7)        NULL,
    [CreatedBy]           NVARCHAR (100)  NULL,
    [ModifiedBy]          NVARCHAR (100)  NULL,
    [LastViewedDate]      DATETIME2 (7)   NULL,
    [OrgGroupID]          INT             NULL,
    [LocationID]          INT             NULL,
    [ResponsiblePersonId] INT             NULL,
    [EntryType]           NVARCHAR (20)   DEFAULT ('Government') NOT NULL,
    [UserDocumentType]    NVARCHAR (50)   NULL,
    CONSTRAINT [PK_LegalRegister] PRIMARY KEY CLUSTERED ([LegalRegisterID] ASC),
    CONSTRAINT [CK_LegalRegister_EntryType] CHECK ([EntryType]='User' OR [EntryType]='Government'),
    CONSTRAINT [CK_LegalRegister_UserDocumentType] CHECK ([UserDocumentType]='Other' OR [UserDocumentType]='Certificate' OR [UserDocumentType]='Template' OR [UserDocumentType]='Form' OR [UserDocumentType]='Instruction' OR [UserDocumentType]='Guideline' OR [UserDocumentType]='Standard' OR [UserDocumentType]='Procedure' OR [UserDocumentType]='Policy' OR [UserDocumentType] IS NULL)
);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegister_Name]
    ON [dbo].[LegalRegister]([Name] ASC);

