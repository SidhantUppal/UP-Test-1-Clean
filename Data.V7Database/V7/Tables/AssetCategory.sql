CREATE TABLE [V7].[AssetCategory] (
    [AssetCategoryID]                      INT            IDENTITY (1, 1) NOT NULL,
    [ParentAssetCategoryID]                INT            NULL,
    [UserAreaID]                           INT            NULL,
    [UserAreaDivisionID]                   INT            NULL,
    [OrgGroupID]                           INT            NULL,
    [Title]                                NVARCHAR (255) NOT NULL,
    [Reference]                            NVARCHAR (100) NULL,
    [CreatedByUserID]                      INT            NOT NULL,
    [CreatedDate]                          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]                     INT            NULL,
    [ModifiedDate]                         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]                     INT            NULL,
    [ArchivedDate]                         DATETIMEOFFSET (7) NULL,
    [RelatedAssetInspectionCategoryIDList] VARCHAR (100)  NULL,
    [IsForDSE]                             BIT            NOT NULL,
    PRIMARY KEY CLUSTERED ([AssetCategoryID] ASC)
);

