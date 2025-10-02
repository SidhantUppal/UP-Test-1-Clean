CREATE TABLE [V7].[RecruitmentVacancyInterview] (
    [RecruitmentVacancyInterviewID] INT            IDENTITY (1, 1) NOT NULL,
    [RecruitmentVacancyApplicantID] INT            NOT NULL,
    [InterviewDateTime]             DATETIMEOFFSET (7) NOT NULL,
    [InvitationText]                NVARCHAR (MAX) NULL,
    [InterviewNotes]                NVARCHAR (MAX) NULL,
    [HasAttended]                   BIT            NULL,
    [CreatedByUserID]               INT            NOT NULL,
    [CreatedDate]                   DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]          INT            NULL,
    [ModifiedDate]              DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]              INT            NULL,
    [ArchivedDate]                  DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([RecruitmentVacancyInterviewID] ASC),
    CONSTRAINT [FK_RecruitmentVacancyInterview_ArchivedBy] FOREIGN KEY ([ArchivedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RecruitmentVacancyInterview_CreatedBy] FOREIGN KEY ([CreatedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RecruitmentVacancyInterview_ModifiedBy] FOREIGN KEY ([ModifiedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_RecruitmentVacancyInterview_RecruitmentVacancyApplicant] FOREIGN KEY ([RecruitmentVacancyApplicantID]) REFERENCES [V7].[RecruitmentVacancyApplicant] ([RecruitmentVacancyApplicantID])
);

