CREATE TABLE [V7].[QuestionnaireStatusType] (
    [QuestionnaireStatusTypeID] INT NOT NULL,
    [IsVisible]                 BIT DEFAULT ((0)) NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireStatusTypeID] ASC)
);

