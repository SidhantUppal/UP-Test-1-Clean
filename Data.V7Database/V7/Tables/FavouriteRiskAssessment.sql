CREATE TABLE [V7].[FavouriteRiskAssessment] (
    [FavouriteRiskAssessmentID] INT      IDENTITY (1, 1) NOT NULL,
    [OriginalRiskAssessmentID]  INT      NOT NULL,
    [UserAreaID]                INT      NOT NULL,
    [IsForMobile]               BIT      DEFAULT ((1)) NOT NULL,
    [CreatedByUserID]           INT      NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]      INT      NULL,
    [ModifiedDate]          DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]          INT      NULL,
    [ArchivedDate]              DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([FavouriteRiskAssessmentID] ASC),
    CONSTRAINT [FK_FavouriteRiskAssessment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteRiskAssessment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteRiskAssessment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_FavouriteRiskAssessment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

