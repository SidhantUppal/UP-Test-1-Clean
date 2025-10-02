CREATE TABLE [V7].[TaskSeverity] (
    [TaskSeverityID] INT           IDENTITY (1, 1) NOT NULL,
    [Reference]      NVARCHAR (50) NULL,
    [UserAreaID]     INT           NULL,
    [Weighting]      INT           NULL,
    [HoursDue]       INT           NULL,
    [IsHazard]       BIT           CONSTRAINT [DF__TaskSever__IsHaz__74EFE28C] DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    CONSTRAINT [PK__TaskSeve__5A54E3C860494354] PRIMARY KEY CLUSTERED ([TaskSeverityID] ASC),
    CONSTRAINT [FK_TaskSeverity_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

