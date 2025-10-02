CREATE TABLE [V7].[SCORMPackageUserArea] (
    [SCORMPackageUserAreaID] INT IDENTITY (1, 1) NOT NULL,
    [SCORMPackageID]         INT NOT NULL,
    [UserAreaID]             INT NOT NULL,
    PRIMARY KEY CLUSTERED ([SCORMPackageUserAreaID] ASC),
    CONSTRAINT [FK_SCORMPackageUserArea_SCORMPackage] FOREIGN KEY ([SCORMPackageID]) REFERENCES [V7].[SCORMPackage] ([SCORMPackageID]),
    CONSTRAINT [FK_SCORMPackageUserArea_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_SCORMPackageUserArea_UserAreaID_includes]
    ON [V7].[SCORMPackageUserArea]([UserAreaID] ASC)
    INCLUDE([SCORMPackageUserAreaID], [SCORMPackageID]);

