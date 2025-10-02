CREATE TABLE [V7].[DrivingLicenseType] (
    [DrivingLicenseTypeID] INT          NOT NULL,
    [Reference]            VARCHAR (20) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([DrivingLicenseTypeID] ASC)
);

