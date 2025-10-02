CREATE TABLE [V7].[TaskPriority] (
    [TaskPriorityID] INT                IDENTITY (1, 1) NOT NULL,
    [PriorityName]   NVARCHAR (50)      NOT NULL,
    [PriorityCode]   NVARCHAR (20)      NOT NULL,
    [PriorityLevel]  INT                NOT NULL,
    [ColorCode]      NVARCHAR (7)       NULL,
    [Description]    NVARCHAR (255)     NULL,
    [IsActive]       BIT                DEFAULT ((1)) NULL,
    [CreatedDate]    DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([TaskPriorityID] ASC),
    UNIQUE NONCLUSTERED ([PriorityCode] ASC)
);

