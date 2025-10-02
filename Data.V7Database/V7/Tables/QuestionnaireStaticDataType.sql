CREATE TABLE [V7].[QuestionnaireStaticDataType] (
    [QuestionnaireStaticDataTypeID] INT           NOT NULL,
    [Description]                   VARCHAR (255) NOT NULL,
    [IsPostBackRequired]            BIT           DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireStaticDataTypeID] ASC)
);

