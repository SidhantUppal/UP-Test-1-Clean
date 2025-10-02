CREATE TABLE [V7].[UserAreaAccidentQuestionTag] (
    [UserAreaAccidentQuestionTagID]      INT IDENTITY (1, 1) NOT NULL,
    [UserAreaAccidentFormID]             INT NOT NULL,
    [OriginalUserAreaAccidentQuestionID] INT NOT NULL,
    [UserAreaAccidentTagID]              INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaAccidentQuestionTagID] ASC),
    CONSTRAINT [FK_UserAreaAccidentQuestionTag_UserAreaAccidentForm] FOREIGN KEY ([UserAreaAccidentFormID]) REFERENCES [V7].[UserAreaAccidentForm] ([UserAreaAccidentFormID]),
    CONSTRAINT [FK_UserAreaAccidentQuestionTag_UserAreaAccidentQuestion] FOREIGN KEY ([OriginalUserAreaAccidentQuestionID]) REFERENCES [V7].[UserAreaAccidentQuestion] ([UserAreaAccidentQuestionID]),
    CONSTRAINT [FK_UserAreaAccidentQuestionTag_UserAreaAccidentTag] FOREIGN KEY ([UserAreaAccidentTagID]) REFERENCES [V7].[UserAreaAccidentTag] ([UserAreaAccidentTagID]),
    CONSTRAINT [CK_UserAreaAccidentQuestionTag_Unique] UNIQUE NONCLUSTERED ([UserAreaAccidentFormID] ASC, [OriginalUserAreaAccidentQuestionID] ASC, [UserAreaAccidentTagID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_UserAreaAccidentQuestionTag_TagID_includes]
    ON [V7].[UserAreaAccidentQuestionTag]([UserAreaAccidentTagID] ASC)
    INCLUDE([UserAreaAccidentQuestionTagID], [UserAreaAccidentFormID], [OriginalUserAreaAccidentQuestionID]);

