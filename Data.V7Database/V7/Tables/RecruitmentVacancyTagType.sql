CREATE TABLE [V7].[RecruitmentVacancyTagType] (
    [RecruitmentVacancyTagTypeID] INT IDENTITY (1, 1) NOT NULL,
    [RecruitmentVacancyID]        INT NOT NULL,
    [TagTypeID]                   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([RecruitmentVacancyTagTypeID] ASC),
    CONSTRAINT [FK_RecruitmentVacancyTagType_RecruitmentVacancy] FOREIGN KEY ([RecruitmentVacancyID]) REFERENCES [V7].[RecruitmentVacancy] ([RecruitmentVacancyID]),
    CONSTRAINT [FK_RecruitmentVacancyTagType_TagType] FOREIGN KEY ([TagTypeID]) REFERENCES [V7].[TagType] ([TagTypeID]),
    CONSTRAINT [CK_RecruitmentVacancyTagType_Unique] UNIQUE NONCLUSTERED ([RecruitmentVacancyID] ASC, [TagTypeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_RecruitmentVacancyTagType_RecruitmentVacancy_includes]
    ON [V7].[RecruitmentVacancyTagType]([RecruitmentVacancyID] ASC)
    INCLUDE([RecruitmentVacancyTagTypeID], [TagTypeID]);


GO
CREATE NONCLUSTERED INDEX [IX_RecruitmentVacancyTagType_TagType_includes]
    ON [V7].[RecruitmentVacancyTagType]([TagTypeID] ASC)
    INCLUDE([RecruitmentVacancyTagTypeID], [RecruitmentVacancyID]);

