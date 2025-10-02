CREATE TABLE [V7].[PersonsAtRisk] (
    [PersonsAtRiskID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [CategoryName]          NVARCHAR (100)     NOT NULL,
    [CategoryDescription]   NVARCHAR (500)     NULL,
    [VulnerabilityLevel]    NVARCHAR (50)      NULL,
    [SpecialConsiderations] NVARCHAR (MAX)     NULL,
    [IsActive]              BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PersonsAtRiskID] ASC),
    CONSTRAINT [FK_PersonsAtRisk_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

