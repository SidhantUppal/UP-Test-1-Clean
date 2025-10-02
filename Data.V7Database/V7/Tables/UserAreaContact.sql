CREATE TABLE [V7].[UserAreaContact] (
    [UserAreaContactID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]        INT NOT NULL,
    [ContactID]         INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaContactID] ASC),
    CONSTRAINT [FK_UserAreaContact_Contact] FOREIGN KEY ([ContactID]) REFERENCES [V7].[Contact] ([ContactID]),
    CONSTRAINT [FK_UserAreaContact_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaContact_UserAreaID_includes]
    ON [V7].[UserAreaContact]([UserAreaID] ASC)
    INCLUDE([UserAreaContactID], [ContactID]);

