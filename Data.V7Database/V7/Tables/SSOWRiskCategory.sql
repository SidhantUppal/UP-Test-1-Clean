CREATE TABLE [V7].[SSOWRiskCategory] (
    [SSOWRiskCategoryID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CategoryName]         NVARCHAR (100)     NOT NULL,
    [CategoryDescription]  NVARCHAR (500)     NULL,
    [RiskLevel]            NVARCHAR (50)      DEFAULT ('Medium') NULL,
    [ColorCode]            NVARCHAR (7)       NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SSOWRiskCategoryID] ASC),
    CONSTRAINT [FK_SSOWRiskCategory_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

