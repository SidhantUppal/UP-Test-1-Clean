CREATE TABLE [V7].[PolicyReview] (
    [PolicyReviewID]       INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [PolicyID]             INT                NOT NULL,
    [ReviewerUserID]       INT                NOT NULL,
    [ReviewDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ReviewType]           NVARCHAR (50)      NOT NULL,
    [ReviewStatus]         NVARCHAR (50)      NOT NULL,
    [ReviewNotes]          NVARCHAR (MAX)     NULL,
    [RecommendedChanges]   NVARCHAR (MAX)     NULL,
    [ComplianceCheck]      NVARCHAR (MAX)     NULL,
    [RegulatoryCheck]      NVARCHAR (MAX)     NULL,
    [ReviewOutcome]        NVARCHAR (50)      NULL,
    [NextReviewDate]       DATETIMEOFFSET (7) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyReviewID] ASC),
    CONSTRAINT [FK_PolicyReview_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyReview_Reviewer] FOREIGN KEY ([ReviewerUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyReview_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyReview_PolicyID]
    ON [V7].[PolicyReview]([PolicyID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyReview_ReviewerUserID]
    ON [V7].[PolicyReview]([ReviewerUserID] ASC);

