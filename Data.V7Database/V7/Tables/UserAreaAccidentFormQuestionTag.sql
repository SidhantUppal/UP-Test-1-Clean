CREATE TABLE [V7].[UserAreaAccidentFormQuestionTag] (
    [UserAreaAccidentFormQuestionTagID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaAccidentFormQuestionID]    INT NOT NULL,
    [UserAreaAccidentTagID]             INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaAccidentFormQuestionTagID] ASC),
    CONSTRAINT [FK_UserAreaAccidentFormQuestionTag_UserAreaAccidentFormQuestion] FOREIGN KEY ([UserAreaAccidentFormQuestionID]) REFERENCES [V7].[UserAreaAccidentFormQuestion] ([UserAreaAccidentFormQuestionID]),
    CONSTRAINT [FK_UserAreaAccidentFormQuestionTag_UserAreaAccidentTag] FOREIGN KEY ([UserAreaAccidentTagID]) REFERENCES [V7].[UserAreaAccidentTag] ([UserAreaAccidentTagID]),
    CONSTRAINT [CK_UserAreaAccidentFormQuestionTage_Unique] UNIQUE NONCLUSTERED ([UserAreaAccidentFormQuestionID] ASC, [UserAreaAccidentTagID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaAccidentFormQuestionTag_TagID_includes]
    ON [V7].[UserAreaAccidentFormQuestionTag]([UserAreaAccidentTagID] ASC)
    INCLUDE([UserAreaAccidentFormQuestionTagID], [UserAreaAccidentFormQuestionID]);

