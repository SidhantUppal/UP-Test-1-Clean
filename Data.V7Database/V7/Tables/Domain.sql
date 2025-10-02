CREATE TABLE [V7].[Domain] (
    [DomainID]             INT            IDENTITY (1, 1) NOT NULL,
    [Title]                NVARCHAR (100) NULL,
    [Description]          NVARCHAR (MAX) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([DomainID] ASC)
);

