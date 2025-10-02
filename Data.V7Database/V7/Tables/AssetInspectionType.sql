CREATE TABLE [V7].[AssetInspectionType] (
    [AssetInspectionTypeID] INT            IDENTITY (1, 1) NOT NULL,
    [Title]                 NVARCHAR (255) NOT NULL,
    [UserAreaID]            INT            NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) NOT NULL,
    [CreatedByUserID]       INT            NOT NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ModifiedByUserID]  INT            NULL,
    CONSTRAINT [PK_AssetInspectionType] PRIMARY KEY CLUSTERED ([AssetInspectionTypeID] ASC)
);

