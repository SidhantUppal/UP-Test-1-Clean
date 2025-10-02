CREATE TABLE [V7].[RecruitmentVacancyAttachment] (
    [RecruitmentVacancyAttachmentID]     INT IDENTITY (1, 1) NOT NULL,
    [RecruitmentVacancyAttachmentTypeID] INT NOT NULL,
    [AttachmentID]                       INT NOT NULL,
    [RecruitmentVacancyID]               INT NULL,
    [RecruitmentVacancyApplicantID]      INT NULL,
    [ContactID]                          INT NULL,
    PRIMARY KEY CLUSTERED ([RecruitmentVacancyAttachmentID] ASC),
    CONSTRAINT [FK_RecruitmentVacancyAttachment_Attachment] FOREIGN KEY ([AttachmentID]) REFERENCES [V7].[Attachment] ([AttachmentID]),
    CONSTRAINT [FK_RecruitmentVacancyAttachment_Contact] FOREIGN KEY ([ContactID]) REFERENCES [V7].[Contact] ([ContactID]),
    CONSTRAINT [FK_RecruitmentVacancyAttachment_RecruitmentVacancy] FOREIGN KEY ([RecruitmentVacancyID]) REFERENCES [V7].[RecruitmentVacancy] ([RecruitmentVacancyID]),
    CONSTRAINT [FK_RecruitmentVacancyAttachment_RecruitmentVacancyApplicant] FOREIGN KEY ([RecruitmentVacancyApplicantID]) REFERENCES [V7].[RecruitmentVacancyApplicant] ([RecruitmentVacancyApplicantID]),
    CONSTRAINT [FK_RecruitmentVacancyAttachment_RecruitmentVacancyAttachmentType] FOREIGN KEY ([RecruitmentVacancyAttachmentTypeID]) REFERENCES [V7].[RecruitmentVacancyAttachmentType] ([RecruitmentVacancyAttachmentTypeID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RecruitmentVacancyAttachment_ContactID_includes]
    ON [V7].[RecruitmentVacancyAttachment]([ContactID] ASC)
    INCLUDE([RecruitmentVacancyAttachmentID], [RecruitmentVacancyAttachmentTypeID], [AttachmentID], [RecruitmentVacancyID], [RecruitmentVacancyApplicantID]);


GO
CREATE NONCLUSTERED INDEX [IX_RecruitmentVacancyAttachment_RecruitmentVacancyApplicantID_includes]
    ON [V7].[RecruitmentVacancyAttachment]([RecruitmentVacancyApplicantID] ASC)
    INCLUDE([RecruitmentVacancyAttachmentID], [RecruitmentVacancyAttachmentTypeID], [AttachmentID], [RecruitmentVacancyID], [ContactID]);


GO
CREATE NONCLUSTERED INDEX [IX_RecruitmentVacancyAttachment_RecruitmentVacancyID_includes]
    ON [V7].[RecruitmentVacancyAttachment]([RecruitmentVacancyID] ASC)
    INCLUDE([RecruitmentVacancyAttachmentID], [RecruitmentVacancyAttachmentTypeID], [AttachmentID], [RecruitmentVacancyApplicantID], [ContactID]);

