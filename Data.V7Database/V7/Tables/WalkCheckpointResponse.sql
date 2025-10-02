CREATE TABLE [V7].[WalkCheckpointResponse] (
    [WalkCheckpointResponseID] INT            IDENTITY (1, 1) NOT NULL,
    [WalkResponseID]           INT            NOT NULL,
    [WalkCheckpointID]         INT            NOT NULL,
    [StartCheckedTime]         DATETIMEOFFSET (7) NULL,
    [EndCheckedTime]           DATETIMEOFFSET (7) NULL,
    [CheckedStatus]            BIT            DEFAULT ((0)) NOT NULL,
    [ConfirmationTypeID]       INT            NOT NULL,
    [ConfirmationComment]      NVARCHAR (500) NOT NULL,
    [ResponseText]             NVARCHAR (100) NULL,
    [AttachmentID]             INT            NULL,
    [GPSCoordinates]           NVARCHAR (MAX) NULL,
    [CreatedByUserID]          INT            NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) NOT NULL,
    [ArchivedByUserID]         INT            NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([WalkCheckpointResponseID] ASC),
    CONSTRAINT [FK_WalkCheckpointResponse_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_WalkCheckpointResponse_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_WalkCheckpointResponse_WalkCheckpointID] FOREIGN KEY ([WalkCheckpointID]) REFERENCES [V7].[WalkCheckpoint] ([WalkCheckpointID]),
    CONSTRAINT [FK_WalkCheckpointResponse_WalkResponseID] FOREIGN KEY ([WalkResponseID]) REFERENCES [V7].[WalkResponse] ([WalkResponseID])
);

