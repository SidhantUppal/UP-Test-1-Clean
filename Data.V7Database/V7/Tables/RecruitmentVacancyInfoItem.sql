CREATE TABLE [V7].[RecruitmentVacancyInfoItem] (
    [RecruitmentVacancyInfoItemID] INT            IDENTITY (1, 1) NOT NULL,
    [RecruitmentVacancyID]         INT            NOT NULL,
    [Title]                        NVARCHAR (100) NOT NULL,
    [Details]                      NVARCHAR (MAX) NOT NULL,
    PRIMARY KEY CLUSTERED ([RecruitmentVacancyInfoItemID] ASC),
    CONSTRAINT [FK_RecruitmentVacancyInfoItem_RecruitmentVacancy] FOREIGN KEY ([RecruitmentVacancyID]) REFERENCES [V7].[RecruitmentVacancy] ([RecruitmentVacancyID])
);

