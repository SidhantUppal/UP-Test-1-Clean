CREATE TABLE [V7].[BCARMError] (
    [BCARMErrorID]            INT           IDENTITY (1, 1) NOT NULL,
    [BCARMUserInternalID]     INT           NULL,
    [BCARMUserAreaInternalID] INT           NULL,
    [PersonalMessage]         VARCHAR (MAX) NOT NULL,
    [ExceptionType]           VARCHAR (MAX) NOT NULL,
    [ExceptionMessage]        VARCHAR (MAX) NOT NULL,
    [Exception]               VARCHAR (MAX) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_BCARMErrorID] PRIMARY KEY CLUSTERED ([BCARMErrorID] ASC),
    CONSTRAINT [FK_BCARMError_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BCARMError_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BCARMError_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID])
);

