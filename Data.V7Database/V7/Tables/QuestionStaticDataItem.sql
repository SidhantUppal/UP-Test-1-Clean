CREATE TABLE [V7].[QuestionStaticDataItem] (
    [QuestionStaticDataItemID]      INT IDENTITY (1, 1) NOT NULL,
    [QuestionID]                    INT NOT NULL,
    [QuestionnaireStaticDataTypeID] INT NOT NULL,
    [StaticDataRecordID]            INT NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionStaticDataItemID] ASC),
    CONSTRAINT [FK_QuestionStaticDataItem_QuestionID] FOREIGN KEY ([QuestionID]) REFERENCES [V7].[Question] ([QuestionID]),
    CONSTRAINT [FK_QuestionStaticDataItem_QuestionnaireStaticDataTypeID] FOREIGN KEY ([QuestionnaireStaticDataTypeID]) REFERENCES [V7].[QuestionnaireStaticDataType] ([QuestionnaireStaticDataTypeID])
);

