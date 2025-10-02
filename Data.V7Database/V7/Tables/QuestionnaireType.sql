CREATE TABLE [V7].[QuestionnaireType] (
    [QuestionnaireTypeID] INT          NOT NULL,
    [Reference]           VARCHAR (20) NULL,
    [IsELearning]         BIT          DEFAULT ((0)) NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireTypeID] ASC)
);

