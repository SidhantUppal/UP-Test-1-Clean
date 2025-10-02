CREATE TABLE [V7].[CourseEnrolmentQuestionnaire] (
    [CourseEnrolmentQuestionnaireID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                     INT                NOT NULL,
    [CourseEnrolmentID]              INT                NOT NULL,
    [CourseQuestionaireID]           INT                NOT NULL,
    [StartDate]                      DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [SubmitDate]                     DATETIMEOFFSET (7) NULL,
    [TimeSpentMinutes]               INT                DEFAULT ((0)) NULL,
    [Score]                          DECIMAL (5, 2)     NULL,
    [Passed]                         BIT                NULL,
    [ResponseData]                   NVARCHAR (MAX)     NULL,
    [CreatedByUserID]                INT                NOT NULL,
    [CreatedDate]                    DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]               INT                NULL,
    [ModifiedDate]               DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseEnrolmentQuestionnaireID] ASC),
    CONSTRAINT [FK_CourseEnrolmentQuestionnaire_Enrolment] FOREIGN KEY ([CourseEnrolmentID]) REFERENCES [V7].[CourseEnrolment] ([CourseEnrolmentID]),
    CONSTRAINT [FK_CourseEnrolmentQuestionnaire_Questionnaire] FOREIGN KEY ([CourseQuestionaireID]) REFERENCES [V7].[CourseQuestionaire] ([CourseQuestionaireID]),
    CONSTRAINT [FK_CourseEnrolmentQuestionnaire_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

