CREATE TABLE [V7].[BodyPartPickerType] (
    [BodyPartPickerTypeID] INT           NOT NULL,
    [ParentID]             INT           NULL,
    [BodyPartID]           INT           NOT NULL,
    [IsBackView]           BIT           DEFAULT ((0)) NOT NULL,
    [Reference]            NVARCHAR (50) NULL,
    [Title] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([BodyPartPickerTypeID] ASC),
    CONSTRAINT [FK_BodyPartPickerType_BodyPart] FOREIGN KEY ([BodyPartID]) REFERENCES [V7].[BodyPart] ([BodyPartID]),
    CONSTRAINT [FK_BodyPartPickerType_Parent] FOREIGN KEY ([ParentID]) REFERENCES [V7].[BodyPartPickerType] ([BodyPartPickerTypeID])
);

