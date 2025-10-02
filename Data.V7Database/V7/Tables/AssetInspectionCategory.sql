CREATE TABLE [V7].[AssetInspectionCategory] (
    [AssetInspectionCategoryID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT           NULL,
    [UserAreaDivisionID]        INT           NULL,
    [Title]                     NVARCHAR (255) NOT NULL,
    [Reference]                 NVARCHAR (50) NULL,
    [CreatedByUserID]           INT           NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]      INT           NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT           NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionCategoryID] ASC)
);

