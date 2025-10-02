CREATE TABLE [V7].[PersonsInCharge] (
    [PersonsInChargeID]         INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT                NOT NULL,
    [UserID]                    INT                NOT NULL,
    [ResponsibilityLevel]       NVARCHAR (100)     NOT NULL,
    [ResponsibilityDescription] NVARCHAR (500)     NULL,
    [IsActive]                  BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]           INT                NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT                NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PersonsInChargeID] ASC),
    CONSTRAINT [FK_PersonsInCharge_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PersonsInCharge_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

