CREATE TABLE [V7].[LegalRegister] (
    [LegalRegisterID]      INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [Name]                 NVARCHAR (500)     NOT NULL,
    [Link]                 NVARCHAR (1000)    NOT NULL,
    [IndustryName]         NVARCHAR (100)     NOT NULL,
    [RiskLevel]            NVARCHAR (50)      NOT NULL,
    [ComplianceStatus]     NVARCHAR (50)      DEFAULT ('Under Review') NOT NULL,
    [Notes]                NVARCHAR (MAX)     NULL,
    [LatestUpdate]         DATETIMEOFFSET (7) NOT NULL,
    [IsRecent]             BIT                DEFAULT ((0)) NOT NULL,
    [LegislationURI]       NVARCHAR (500)     NULL,
    [LegislationType]      NVARCHAR (100)     NULL,
    [LegislationYear]      INT                NULL,
    [APILastSync]          DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_LegalRegister] PRIMARY KEY CLUSTERED ([LegalRegisterID] ASC),
    CONSTRAINT [FK_LegalRegister_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegister_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegister_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LegalRegister_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegister_ComplianceStatus]
    ON [V7].[LegalRegister]([UserAreaID] ASC, [ComplianceStatus] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegister_IndustryName]
    ON [V7].[LegalRegister]([UserAreaID] ASC, [IndustryName] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegister_IsRecent]
    ON [V7].[LegalRegister]([UserAreaID] ASC, [IsRecent] ASC) WHERE ([ArchivedDate] IS NULL);


GO
CREATE NONCLUSTERED INDEX [IX_LegalRegister_UserAreaID]
    ON [V7].[LegalRegister]([UserAreaID] ASC) WHERE ([ArchivedDate] IS NULL);

