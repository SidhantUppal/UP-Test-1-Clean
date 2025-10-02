CREATE TABLE [V7].[RecruitmentVacancyApplicant] (
    [RecruitmentVacancyApplicantID] INT      IDENTITY (1, 1) NOT NULL,
    [ContactID]                     INT      NOT NULL,
    [RecruitmentVacancyID]          INT      NOT NULL,
    [ApplicationStatusTypeID]       INT      NOT NULL,
    [ApplicationDate]               DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([RecruitmentVacancyApplicantID] ASC),
    CONSTRAINT [FK_RecruitmentVacancyApplicant_ApplicationStatusType] FOREIGN KEY ([ApplicationStatusTypeID]) REFERENCES [V7].[ApplicationStatusType] ([ApplicationStatusTypeID]),
    CONSTRAINT [FK_RecruitmentVacancyApplicant_Contact] FOREIGN KEY ([ContactID]) REFERENCES [V7].[Contact] ([ContactID]),
    CONSTRAINT [FK_RecruitmentVacancyApplicant_RecruitmentVacancy] FOREIGN KEY ([RecruitmentVacancyID]) REFERENCES [V7].[RecruitmentVacancy] ([RecruitmentVacancyID])
);

