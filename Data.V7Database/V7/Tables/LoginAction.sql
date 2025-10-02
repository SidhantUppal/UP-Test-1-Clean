CREATE TABLE [V7].[LoginAction] (
    [LoginActionID]     INT            IDENTITY (1, 1) NOT NULL,
    [LoginActionTypeID] INT            NOT NULL,
    [UserAreaID]        INT            NOT NULL,
    [UserID]            INT            NOT NULL,
    [DateTime]          DATETIMEOFFSET (7) NOT NULL,
    [Note]              NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([LoginActionID] ASC),
    CONSTRAINT [FK_Login_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_LoginAction_LoginActionType] FOREIGN KEY ([LoginActionTypeID]) REFERENCES [V7].[LoginActionType] ([LoginActionTypeID]),
    CONSTRAINT [FK_LoginAction_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

