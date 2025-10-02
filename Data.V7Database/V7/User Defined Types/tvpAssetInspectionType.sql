CREATE TYPE [V7].[tvpAssetInspectionType] AS TABLE (
    [AssetInspectionCategoryID] INT            NULL,
    [AssetID]                   INT            NULL,
    [UserAreaID]                INT            NULL,
    [UserAreaDivisionID]        INT            NULL,
    [Reference]                 NVARCHAR (50)  NULL,
    [InspectionDate]            DATETIMEOFFSET (7)       NULL,
    [InspectorName]             NVARCHAR (255) NULL,
    [InspectorCompanyName]      NVARCHAR (255) NULL,
    [Notes]                     NVARCHAR (MAX) NULL,
    [CreatedByUserID]           INT            NULL,
    [CreatedDate]               DATETIMEOFFSET (7)       NULL,
    [RowIndex]                  INT            NULL);

