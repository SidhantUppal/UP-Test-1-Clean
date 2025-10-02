CREATE TABLE [V7].[Lead] (
    [LeadID]      INT             IDENTITY (1, 1) NOT NULL,
    [FullName]    NVARCHAR (100)  NULL,
    [Email]       NVARCHAR (100)  NULL,
    [Phone]       NVARCHAR (40)   NULL,
    [CompanyName] NVARCHAR (100)  NULL,
    [JobTitle]    NVARCHAR (100)  NULL,
    [Comments]    NVARCHAR (1000) NULL,
    [SessionID]   VARCHAR (255)   NOT NULL,
    [DateTime]    DATETIMEOFFSET (7) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([LeadID] ASC),
    CONSTRAINT [FK_Lead_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Lead_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Lead_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

