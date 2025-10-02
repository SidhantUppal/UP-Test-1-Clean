CREATE TABLE [V7].[UserAreaTag] (
    [UserAreaTagID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]    INT            NOT NULL,
    [TagTypeID]     INT            NOT NULL,
    [IsEnabled]     BIT            DEFAULT ((0)) NOT NULL,
    [Comments]      NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaTagID] ASC),
    CONSTRAINT [FK_UserAreaTag_TagType] FOREIGN KEY ([TagTypeID]) REFERENCES [V7].[TagType] ([TagTypeID]),
    CONSTRAINT [FK_UserAreaTag_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

