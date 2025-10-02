CREATE TABLE [V7].[CourseEnrollmentQuestionnaire] (
    [CourseEnrollmentQuestionnaireID] INT IDENTITY (1, 1) NOT NULL,
    [CourseEnrollmentID]              INT NOT NULL,
    [QuestionnaireID]                 INT NOT NULL,
    [OrderNum]                        INT NOT NULL,
    [IsNeededToPassed]                BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([CourseEnrollmentQuestionnaireID] ASC),
    CONSTRAINT [FK_CourseEnrollmentQuestionnaire_CourseEnrollmentID] FOREIGN KEY ([CourseEnrollmentID]) REFERENCES [V7].[CourseEnrollment] ([CourseEnrollmentID]),
    CONSTRAINT [FK_CourseEnrollmentQuestionnaire_QuestionnaireID] FOREIGN KEY ([QuestionnaireID]) REFERENCES [V7].[Questionnaire] ([QuestionnaireID])
);

