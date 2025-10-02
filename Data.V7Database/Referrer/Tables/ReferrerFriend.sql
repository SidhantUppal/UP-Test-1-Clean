CREATE TABLE [Referrer].[ReferrerFriend] (
    [ReferrerFriendID]     INT            IDENTITY (1, 1) NOT NULL,
    [ReferrerUserID]       INT            NOT NULL,
    [ReferrerStatusTypeID] INT            NOT NULL,
    [Name]                 NVARCHAR (150) NOT NULL,
    [Email]                NVARCHAR (150) NULL,
    [Phone1]               NVARCHAR (15)  NULL,
    [Phone2]               NVARCHAR (15)  NULL,
    [Notes]                NVARCHAR (MAX) NULL,
    [IsOKToCall]           BIT            DEFAULT ((0)) NOT NULL,
    [IsOKToEmail]          BIT            DEFAULT ((0)) NOT NULL,
    [WaitForMeToContact]   BIT            DEFAULT ((0)) NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedDate]     DATETIMEOFFSET (7)       NULL,
    [ArchivedDate]         DATETIMEOFFSET (7)       NULL,
    PRIMARY KEY CLUSTERED ([ReferrerFriendID] ASC),
    CONSTRAINT [FK_ReferrerFriend_ReferrerStatusType] FOREIGN KEY ([ReferrerStatusTypeID]) REFERENCES [Referrer].[ReferrerStatusType] ([ReferrerStatusTypeID]),
    CONSTRAINT [FK_ReferrerFriend_ReferrerUser] FOREIGN KEY ([ReferrerUserID]) REFERENCES [Referrer].[ReferrerUser] ([ReferrerUserID])
);

