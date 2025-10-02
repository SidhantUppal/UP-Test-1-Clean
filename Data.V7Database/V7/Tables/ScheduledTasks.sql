CREATE TABLE [V7].[ScheduledTasks] (
    [TaskID]       INT           IDENTITY (1, 1) NOT NULL,
    [Description]  NVARCHAR (50) NULL,
    [Domain]       NVARCHAR (50) NOT NULL,
    [Version]      TINYINT       NOT NULL,
    [Controller]   NVARCHAR (50) NOT NULL,
    [Action]       NVARCHAR (50) NOT NULL,
    [IntervalType] TINYINT       NOT NULL,
    [Interval]     TINYINT       NOT NULL,
    [StartHour]    TINYINT       NOT NULL,
    [StartMinute]  TINYINT       NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskID] ASC)
);

