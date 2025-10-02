CREATE TABLE [V7].[SafeSystemOfWorkLocation] (
    [SafeSystemOfWorkLocationID] INT IDENTITY (1, 1) NOT NULL,
    [SafeSystemOfWorkID]         INT NOT NULL,
    [LocationID]                 INT NOT NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkLocationID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_SafeSystemOfWorkLocation_SafeSystemOfWork] FOREIGN KEY ([SafeSystemOfWorkID]) REFERENCES [V7].[SafeSystemOfWork] ([SafeSystemOfWorkID]),
    CONSTRAINT [CK_SafeSystemOfWorkLocation_Unique] UNIQUE NONCLUSTERED ([SafeSystemOfWorkID] ASC, [LocationID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_SafeSystemOfWorkLocation_SafeSystemOfWorkID_includes]
    ON [V7].[SafeSystemOfWorkLocation]([SafeSystemOfWorkID] ASC)
    INCLUDE([SafeSystemOfWorkLocationID], [LocationID]);

