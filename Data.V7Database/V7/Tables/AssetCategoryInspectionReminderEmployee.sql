CREATE TABLE [V7].[AssetCategoryInspectionReminderEmployee] (
    [AssetCategoryInspectionReminderEmployeeID] INT IDENTITY (1, 1) NOT NULL,
    [AssetCategoryInspectionReminderID]         INT NOT NULL,
    [EmployeeID]                                INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetCategoryInspectionReminderEmployeeID] ASC)
);

