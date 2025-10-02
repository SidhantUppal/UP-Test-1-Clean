CREATE TABLE [V7].[RecruitmentTypeVacancy] (
    [RecruitmentTypeVacancyID] INT IDENTITY (1, 1) NOT NULL,
    [RecruitmentTypeID]        INT NOT NULL,
    [RecruitmentVacancyID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([RecruitmentTypeVacancyID] ASC),
    CONSTRAINT [FK_RecruitmentTypeVacancy_RecruitmentType] FOREIGN KEY ([RecruitmentTypeID]) REFERENCES [V7].[RecruitmentType] ([RecruitmentTypeID]),
    CONSTRAINT [FK_RecruitmentTypeVacancy_RecruitmentVacancy] FOREIGN KEY ([RecruitmentVacancyID]) REFERENCES [V7].[RecruitmentVacancy] ([RecruitmentVacancyID]),
    CONSTRAINT [CK_RecruitmentTypeVacancy_Unique] UNIQUE NONCLUSTERED ([RecruitmentTypeID] ASC, [RecruitmentVacancyID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_RecruitmentTypeVacancy_RecruitmentVacancyID_includes]
    ON [V7].[RecruitmentTypeVacancy]([RecruitmentVacancyID] ASC)
    INCLUDE([RecruitmentTypeVacancyID], [RecruitmentTypeID]);

