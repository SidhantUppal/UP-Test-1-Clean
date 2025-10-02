CREATE TABLE [V7].[BankHolidayType] (
    [BankHolidayTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [RegionTypeID]      INT           NOT NULL,
    [BankHolDate]       DATETIMEOFFSET (7) NOT NULL,
    [BankHolNote]       VARCHAR (255) NOT NULL,
    [CreatedByUserID]               INT           NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]              INT           NULL,
    [ModifiedDate]                  DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT           NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([BankHolidayTypeID] ASC),
    CONSTRAINT [FK_BankHolidayType_Region] FOREIGN KEY ([RegionTypeID]) REFERENCES [V7].[RegionType] ([RegionTypeID])
,
    CONSTRAINT [FK_BankHolidayType_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BankHolidayType_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BankHolidayType_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_BankHolidayType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


