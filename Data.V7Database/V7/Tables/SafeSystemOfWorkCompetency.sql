CREATE TABLE [V7].[SafeSystemOfWorkCompetency] (
    [SafeSystemOfWorkCompetencyID] INT IDENTITY (1, 1) NOT NULL,
    [SafeSystemOfWorkID]           INT NOT NULL,
    [CompetencyID]                 INT NOT NULL,
    PRIMARY KEY CLUSTERED ([SafeSystemOfWorkCompetencyID] ASC),
    CONSTRAINT [FK_SafeSystemOfWorkCompetency_Competency] FOREIGN KEY ([CompetencyID]) REFERENCES [V7].[Competency] ([CompetencyID]),
    CONSTRAINT [FK_SafeSystemOfWorkCompetency_SafeSystemOfWork] FOREIGN KEY ([SafeSystemOfWorkID]) REFERENCES [V7].[SafeSystemOfWork] ([SafeSystemOfWorkID]),
    CONSTRAINT [CK_SafeSystemOfWorkCompetency_Unique] UNIQUE NONCLUSTERED ([SafeSystemOfWorkID] ASC, [CompetencyID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_SafeSystemOfWorkCompetency_SafeSystemOfWorkID_includes]
    ON [V7].[SafeSystemOfWorkCompetency]([SafeSystemOfWorkID] ASC)
    INCLUDE([SafeSystemOfWorkCompetencyID], [CompetencyID]);

