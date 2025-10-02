CREATE TABLE [V7].[CourseBundleFilter] (
    [CourseBundleFilterID] INT      IDENTITY (1, 1) NOT NULL,
    [CourseBundleID]       INT      NOT NULL,
    [OrgGroupID]           INT      NULL,
    [JobRoleID]            INT      NULL,
    [CreatedByUserID]      INT      NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]     INT      NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT      NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    [LocationID]           INT      NULL,
    PRIMARY KEY CLUSTERED ([CourseBundleFilterID] ASC),
    CONSTRAINT [FK_CourseBundleFilter_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseBundleFilter_CourseBundle] FOREIGN KEY ([CourseBundleID]) REFERENCES [V7].[CourseBundle] ([CourseBundleID]),
    CONSTRAINT [FK_CourseBundleFilter_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseBundleFilter_JobRole] FOREIGN KEY ([JobRoleID]) REFERENCES [V7].[JobRole] ([JobRoleID]),
    CONSTRAINT [FK_CourseBundleFilter_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_CourseBundleFilter_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseBundleFilter_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID])
);

