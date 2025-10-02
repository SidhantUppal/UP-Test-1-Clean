CREATE TABLE [V7].[FrequencyType] (
    [FrequencyTypeID] INT            NOT NULL,
    [UserAreaID]      INT            NULL,
    [Title]           NVARCHAR (100) NOT NULL,
    [Description]     NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([FrequencyTypeID] ASC),
    CONSTRAINT [FK_FrequencyType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

