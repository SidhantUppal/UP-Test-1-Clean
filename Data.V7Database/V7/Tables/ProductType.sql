CREATE TABLE [V7].[ProductType] (
    [ProductTypeID]     INT            IDENTITY (1, 1) NOT NULL,
    [Controller]        NVARCHAR (50)  NULL,
    [Action]            NVARCHAR (50)  NULL,
    [Notes]             NVARCHAR (MAX) NULL,
    [ResourceStringKey] NVARCHAR (500) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [CreatedDate] DATETIMEOFFSET (7) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__ProductT__A1312F4E323D968B] PRIMARY KEY CLUSTERED ([ProductTypeID] ASC)
);

