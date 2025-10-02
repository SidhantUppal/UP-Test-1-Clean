CREATE TABLE [V7].[AlertTypeEmployeeLocation] (
    [AlertTypeEmployeeLocationID] INT IDENTITY (1, 1) NOT NULL,
    [AlertTypeEmployeeID]         INT NOT NULL,
    [LocationID]                  INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AlertTypeEmployeeLocationID] ASC),
    CONSTRAINT [FK_AlertTypeEmployeeLocation_AlertTypeEmployee] FOREIGN KEY ([AlertTypeEmployeeID]) REFERENCES [V7].[AlertTypeEmployee] ([AlertTypeEmployeeID]),
    CONSTRAINT [FK_AlertTypeEmployeeLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AlertTypeEmployeeLocation_AlertTypeEmployee]
    ON [V7].[AlertTypeEmployeeLocation]([AlertTypeEmployeeID] ASC)
    INCLUDE([AlertTypeEmployeeLocationID], [LocationID]);

