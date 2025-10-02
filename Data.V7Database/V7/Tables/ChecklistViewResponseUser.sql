CREATE TABLE [V7].[ChecklistViewResponseUser] (
    [ChecklistViewResponseUserID] INT IDENTITY (1, 1) NOT NULL,
    [ChecklistID]                 INT NOT NULL,
    [UserAreaID]                  INT NOT NULL,
    [UserID]                      INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ChecklistViewResponseUserID] ASC),
    CONSTRAINT [FK_ChecklistViewResponseUser_Checklist] FOREIGN KEY ([ChecklistID]) REFERENCES [V7].[Checklist] ([ChecklistID]),
    CONSTRAINT [FK_ChecklistViewResponseUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ChecklistViewResponseUser_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

