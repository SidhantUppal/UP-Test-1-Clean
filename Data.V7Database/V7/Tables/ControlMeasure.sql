CREATE TABLE [V7].[ControlMeasure] (
    [ControlMeasureID]         INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]               INT                NOT NULL,
    [ControlMeasureTypeID]     INT                NULL,
    [ControlName]              NVARCHAR (255)     NOT NULL,
    [ControlDescription]       NVARCHAR (MAX)     NULL,
    [ControlCode]              NVARCHAR (50)      NULL,
    [EffectivenessRating]      DECIMAL (3, 1)     NULL,
    [CostCategory]             NVARCHAR (50)      NULL,
    [ImplementationDifficulty] NVARCHAR (50)      NULL,
    [MaintenanceRequirements]  NVARCHAR (MAX)     NULL,
    [TrainingRequired]         NVARCHAR (MAX)     NULL,
    [IsActive]                 BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]          INT                NOT NULL,
    [CreatedDate]              DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]         INT                NULL,
    [ModifiedDate]         DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]         INT                NULL,
    [ArchivedDate]             DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([ControlMeasureID] ASC),
    CONSTRAINT [FK_ControlMeasure_Type] FOREIGN KEY ([ControlMeasureTypeID]) REFERENCES [V7].[ControlMeasureType] ([ControlMeasureTypeID]),
    CONSTRAINT [FK_ControlMeasure_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_ControlMeasure_Type]
    ON [V7].[ControlMeasure]([ControlMeasureTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_ControlMeasure_UserAreaID]
    ON [V7].[ControlMeasure]([UserAreaID] ASC);

