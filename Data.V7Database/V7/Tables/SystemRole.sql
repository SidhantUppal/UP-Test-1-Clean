CREATE TABLE [V7].[SystemRole] (
    [RoleID]       INT            IDENTITY (1, 1) NOT NULL,
    [Name]         NVARCHAR (100) NOT NULL,
    [DisplayName]  NVARCHAR (255) NOT NULL,
    [Category]     NVARCHAR (50)  NOT NULL,
    [IsSystemRole] BIT            DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([RoleID] ASC),
    CONSTRAINT [CK_SystemRole_Name] UNIQUE NONCLUSTERED ([Name] ASC)
);

