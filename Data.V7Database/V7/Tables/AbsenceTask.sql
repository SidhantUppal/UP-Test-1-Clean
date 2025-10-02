CREATE TABLE [V7].[AbsenceTask] (
    [AbsenceTaskID] INT IDENTITY (1, 1) NOT NULL,
    [TaskID]        INT NOT NULL,
    [AbsenceID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AbsenceTaskID] ASC),
    CONSTRAINT [FK_AbsenceTask_Absence] FOREIGN KEY ([AbsenceID]) REFERENCES [V7].[Absence] ([AbsenceID]),
    CONSTRAINT [FK_AbsenceTask_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [CK_AbsenceTask_Unique] UNIQUE NONCLUSTERED ([TaskID] ASC, [AbsenceID] ASC)
);

