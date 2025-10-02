CREATE TABLE [V7].[HazardControlMeasure] (
    [HazardControlMeasureID] INT IDENTITY (1, 1) NOT NULL,
    [HazardID]               INT NOT NULL,
    [ControlMeasureID]       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([HazardControlMeasureID] ASC),
    CONSTRAINT [FK_HazardControlMeasure_ControlMeasure] FOREIGN KEY ([ControlMeasureID]) REFERENCES [V7].[ControlMeasure] ([ControlMeasureID]),
    CONSTRAINT [FK_HazardControlMeasure_Hazard] FOREIGN KEY ([HazardID]) REFERENCES [V7].[Hazard] ([HazardID])
);

