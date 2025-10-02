CREATE TABLE [V7].[ExposuresEmployee] (
    [ExposuresEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [ExposureTypeID]      INT NULL,
    [EmployeeID]          INT NULL,
    [UserAreaID]          INT NULL,
    PRIMARY KEY CLUSTERED ([ExposuresEmployeeID] ASC),
    CONSTRAINT [FK_ExposuresEmployee_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_ExposuresEmployee_Exposure] FOREIGN KEY ([ExposureTypeID]) REFERENCES [V7].[ExposureType] ([ExposureTypeID]),
    CONSTRAINT [FK_ExposuresEmployee_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ExposuresEmployee_ExposureTypeID]
    ON [V7].[ExposuresEmployee]([ExposureTypeID] ASC)
    INCLUDE([ExposuresEmployeeID], [EmployeeID]);


GO
CREATE NONCLUSTERED INDEX [IX_ExposuresEmployee_ExposureTypeIDEmployeeID]
    ON [V7].[ExposuresEmployee]([ExposureTypeID] ASC, [EmployeeID] ASC);

