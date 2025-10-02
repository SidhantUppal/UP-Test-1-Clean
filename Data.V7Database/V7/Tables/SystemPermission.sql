CREATE TABLE [V7].[SystemPermission] (
    [PermissionID] INT            IDENTITY (1, 1) NOT NULL,
    [Name]         NVARCHAR (100) NOT NULL,
    [DisplayName]  NVARCHAR (255) NOT NULL,
    [Layer]        NVARCHAR (20)  NULL,
    [Module]       NVARCHAR (50)  NOT NULL,
    [Description]  NVARCHAR (500) NULL,
    PRIMARY KEY CLUSTERED ([PermissionID] ASC),
    CONSTRAINT [CK_System_Permission_Name] UNIQUE NONCLUSTERED ([Name] ASC)
);

