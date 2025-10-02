CREATE TABLE [V7].[QuestionValidation] (
    [QuestionValidationID] INT      IDENTITY (1, 1) NOT NULL,
    [QuestionID]           INT      NOT NULL,
    [ValidationTypeID]     INT      NOT NULL,
    [BooleanValue]         BIT      NULL,
    [IntegerValue]         INT      NULL,
    [DateValue]            DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([QuestionValidationID] ASC),
    CONSTRAINT [FK_QuestionValidation_QuestionID] FOREIGN KEY ([QuestionID]) REFERENCES [V7].[Question] ([QuestionID]),
    CONSTRAINT [FK_QuestionValidation_ValidationTypeID] FOREIGN KEY ([ValidationTypeID]) REFERENCES [V7].[ValidationType] ([ValidationTypeID])
);

