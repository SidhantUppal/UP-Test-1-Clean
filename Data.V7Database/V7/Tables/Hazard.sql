CREATE TABLE [V7].[Hazard] (
    [HazardID]             INT                IDENTITY (1, 1) NOT NULL,
    [Title]                NVARCHAR (255)     NOT NULL,
    [Reference]            NVARCHAR (50)      NULL,
    [Description]          NVARCHAR (MAX)     NULL,
    [UserAreaID]           INT                NOT NULL,
    [HazardCategoryTypeID] INT                NULL,
    [HazardSeverityTypeID] INT                NULL,
    [InherentLikelihood]   INT                NULL,
    [InherentConsequence]  INT                NULL,
    [InherentRiskScore]    INT                NULL,
    [LegalRequirements]    NVARCHAR (MAX)     NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [LocationID]           INT                NULL,
    [LocationName]         NVARCHAR (255)     NULL,
    [AssignedToUserID]     INT                NULL,
    [AssignedToRoleID]     INT                NULL,
    [AssignedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([HazardID] ASC),
    CONSTRAINT [FK_Hazard_AssignedUser] FOREIGN KEY ([AssignedToUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Hazard_CategoryType] FOREIGN KEY ([HazardCategoryTypeID]) REFERENCES [V7].[HazardCategoryType] ([HazardCategoryTypeID]),
    CONSTRAINT [FK_Hazard_HazardSeverityType] FOREIGN KEY ([HazardSeverityTypeID]) REFERENCES [V7].[HazardSeverityType] ([HazardSeverityTypeID]),
    CONSTRAINT [FK_Hazard_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_Hazard_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_Hazard_CategoryType]
    ON [V7].[Hazard]([HazardCategoryTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Hazard_UserAreaID]
    ON [V7].[Hazard]([UserAreaID] ASC);

