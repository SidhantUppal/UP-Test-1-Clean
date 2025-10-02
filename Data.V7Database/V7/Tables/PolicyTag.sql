CREATE TABLE [V7].[PolicyTag] (
    [PolicyTagID]          INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [TagName]              NVARCHAR (100)     NOT NULL,
    [TagDescription]       NVARCHAR (500)     NULL,
    [TagColor]             NVARCHAR (7)       NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyTagID] ASC),
    CONSTRAINT [FK_PolicyTag_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

