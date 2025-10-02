CREATE TABLE [V7].[HRCaseSupporter] (
    [HRCaseSupporterID]                INT            IDENTITY (1, 1) NOT NULL,
    [HRCaseID]                         INT            NOT NULL,
    [HRCaseStatusTypeID]               INT            NOT NULL,
    [IsForNapthensPeopleProjectTeam]   BIT            DEFAULT ((0)) NOT NULL,
    [IsExternalSupportOfficerRequired] BIT            DEFAULT ((0)) NOT NULL,
    [ExternalSupportOfficerName]       NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([HRCaseSupporterID] ASC),
    CONSTRAINT [FK_HRCaseSupporter_HRCase] FOREIGN KEY ([HRCaseID]) REFERENCES [V7].[HRCase] ([HRCaseID]),
    CONSTRAINT [FK_HRCaseSupporter_HRCaseStatusType] FOREIGN KEY ([HRCaseStatusTypeID]) REFERENCES [V7].[HRCaseStatusType] ([HRCaseStatusTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_HRCaseSupporter_HRCaseID_includes]
    ON [V7].[HRCaseSupporter]([HRCaseID] ASC, [HRCaseStatusTypeID] ASC)
    INCLUDE([HRCaseSupporterID], [IsForNapthensPeopleProjectTeam], [IsExternalSupportOfficerRequired], [ExternalSupportOfficerName]);

