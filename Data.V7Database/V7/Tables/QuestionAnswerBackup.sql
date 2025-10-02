CREATE TABLE [V7].[QuestionAnswerBackup] (
    [QuestionAnswerID]     INT            IDENTITY (1, 1) NOT NULL,
    [QuestionID]           INT            NOT NULL,
    [AnswerTypeID]         INT            NOT NULL,
    [UserAreaID]           INT            NULL,
    [OptionListID]         INT            NULL,
    [OptionListValues]     VARCHAR (MAX)  NULL,
    [IntegerResponse]      INT            NULL,
    [BoolResponse]         BIT            NULL,
    [ScoreValue]           INT            NULL,
    [JumpToSection]        INT            NULL,
    [ActionTypeID]         INT            NULL,
    [Comments]             NVARCHAR (MAX) NULL,
    [CreatedByUserID]      INT            NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID] INT            NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT            NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL
);

