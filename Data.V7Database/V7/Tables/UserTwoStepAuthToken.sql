CREATE TABLE [V7].[UserTwoStepAuthToken] (
    [UserTwoStepAuthTokenID] INT           IDENTITY (1, 1) NOT NULL,
    [UserID]                 INT           NOT NULL,
    [UserAreaID]             INT           NOT NULL,
    [AuthToken]              NVARCHAR (14) NOT NULL,
    [SessionID]              NVARCHAR (36) NULL,
    [ExpiryDate]             DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserTwoStepAuthTokenID] ASC),
    CONSTRAINT [FK_UserTwoStepAuthToken_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserTwoStepAuthToken_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserTwoStepAuthToken_Token]
    ON [V7].[UserTwoStepAuthToken]([UserID] ASC, [UserAreaID] ASC)
    INCLUDE([AuthToken], [SessionID], [ExpiryDate]);

