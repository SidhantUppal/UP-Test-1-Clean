CREATE TABLE [V7].[UpdateType] (
    [UpdateTypeID]         INT            IDENTITY (1, 1) NOT NULL,
    [Title]                NVARCHAR (255) NULL,
    [Description]          NVARCHAR (255) NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ModifiedByUserID] INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    PRIMARY KEY CLUSTERED ([UpdateTypeID] ASC)
);

