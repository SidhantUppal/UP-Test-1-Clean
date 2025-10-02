CREATE TABLE [V7].[AssetInspectionChecklist] (
    [AssetInspectionChecklistID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT            NOT NULL,
    [ChecklistID]                INT            NOT NULL,
    [QuestionnaireID]            INT            NOT NULL,
    [QuestionnaireResponseID]    INT            NULL,
    [AssetCategoryID]            INT            NULL,
    [AssetID]                    INT            NULL,
    [MultiAssetIDs]              NVARCHAR (MAX) NULL,
    [CreatedByUserID]            INT            NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) NOT NULL,
    [TaskID]                     INT            NULL,
    [AssetInspectionMode]        INT            NULL,
    PRIMARY KEY CLUSTERED ([AssetInspectionChecklistID] ASC)
);

