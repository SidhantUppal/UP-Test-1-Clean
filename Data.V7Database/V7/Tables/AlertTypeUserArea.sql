CREATE TABLE [V7].[AlertTypeUserArea] (
    [AlertTypeUserAreaID] INT IDENTITY (1, 1) NOT NULL,
    [AlertTypeID]         INT NOT NULL,
    [UserAreaID]          INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AlertTypeUserAreaID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_AlertTypeUserArea_AlertType]
    ON [V7].[AlertTypeUserArea]([AlertTypeID] ASC)
    INCLUDE([AlertTypeUserAreaID], [UserAreaID]);


GO
CREATE NONCLUSTERED INDEX [IX_AlertTypeUserArea_UserArea]
    ON [V7].[AlertTypeUserArea]([UserAreaID] ASC)
    INCLUDE([AlertTypeUserAreaID], [AlertTypeID]);

