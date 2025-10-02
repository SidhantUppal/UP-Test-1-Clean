CREATE TABLE [V7].[UserFavouriteRiskAssessment] (
    [UserFavouriteRiskAssessmentID] INT      IDENTITY (1, 1) NOT NULL,
    [FavouriteRiskAssessmentID]     INT      NOT NULL,
    [EmployeeID]                    INT      NOT NULL,
    [UserAreaID]                    INT      NOT NULL,
    [CreatedByUserID]               INT      NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT      NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT      NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([UserFavouriteRiskAssessmentID] ASC),
    CONSTRAINT [FK_UserFavouriteRiskAssessment_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFavouriteRiskAssessment_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFavouriteRiskAssessment_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [V7].[Employee] ([EmployeeID]),
    CONSTRAINT [FK_UserFavouriteRiskAssessment_FavouriteRiskAssessment] FOREIGN KEY ([FavouriteRiskAssessmentID]) REFERENCES [V7].[FavouriteRiskAssessment] ([FavouriteRiskAssessmentID]),
    CONSTRAINT [FK_UserFavouriteRiskAssessment_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_UserFavouriteRiskAssessment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

