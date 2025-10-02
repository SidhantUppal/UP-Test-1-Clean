CREATE TABLE [V7].[DocumentRequirement] (
    [RequirementID]    INT            IDENTITY (1, 1) NOT NULL,
    [RequirementSetID] INT            NOT NULL,
    [Name]             NVARCHAR (255) NOT NULL,
    [Description]      NVARCHAR (MAX) NULL,
    [DocumentType]     NVARCHAR (100) NULL,
    [IsRequired]       BIT            DEFAULT ((1)) NOT NULL,
    [ExpectedFormat]   NVARCHAR (50)  NULL,
    [MaxFileSize]      BIGINT         NULL,
    [ValidityDays]     INT            NULL,
    [OrderIndex]       INT            DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_DocumentRequirement] PRIMARY KEY CLUSTERED ([RequirementID] ASC),
    CONSTRAINT [FK_DocumentRequirement_RequirementSet] FOREIGN KEY ([RequirementSetID]) REFERENCES [V7].[DocumentRequirementSet] ([RequirementSetID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRequirement_RequirementSetID]
    ON [V7].[DocumentRequirement]([RequirementSetID] ASC);

