CREATE TABLE [V7].[UserAreaMonitoringReportComment] (
    [UserAreaMonitoringReportCommentID]          INT            IDENTITY (1, 1) NOT NULL,
    [V5UAMRType]                                 INT            NULL,
    [UserAreaMonitoringSectionID]                INT            NULL,
    [Description]                                NVARCHAR (255) NULL,
    [UserAreaMonitoringReportCommentsCriteriaID] INT            NOT NULL,
    [LanguageTypeID]                             INT            NOT NULL,
    [RegionTypeID]                               INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaMonitoringReportCommentID] ASC),
    CONSTRAINT [FK_UserAreaMonitoringReportComment_LanguageType] FOREIGN KEY ([LanguageTypeID]) REFERENCES [V7].[LanguageType] ([LanguageTypeID]),
    CONSTRAINT [FK_UserAreaMonitoringReportComment_RegionType] FOREIGN KEY ([RegionTypeID]) REFERENCES [V7].[RegionType] ([RegionTypeID]),
    CONSTRAINT [FK_UserAreaMonitoringReportComment_UserAreaMonitoringSection] FOREIGN KEY ([UserAreaMonitoringSectionID]) REFERENCES [V7].[UserAreaMonitoringSection] ([UserAreaMonitoringSectionID]),
    CONSTRAINT [FK_UserAreaMonitoringReportCommentsCriteria_UserAreaMonitoringReportCommentsCriteria] FOREIGN KEY ([UserAreaMonitoringReportCommentsCriteriaID]) REFERENCES [V7].[UserAreaMonitoringReportCommentsCriteria] ([UserAreaMonitoringReportCommentsCriteriaID])
);

