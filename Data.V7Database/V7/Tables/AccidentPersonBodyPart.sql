CREATE TABLE [V7].[AccidentPersonBodyPart] (
    [AccidentPersonBodyPartID] INT IDENTITY (1, 1) NOT NULL,
    [AccidentPersonID]         INT NOT NULL,
    [BodyPartID]               INT NOT NULL,
    PRIMARY KEY CLUSTERED ([AccidentPersonBodyPartID] ASC),
    CONSTRAINT [FK_AccidentPersonBodyPart_AccidentPersonID] FOREIGN KEY ([AccidentPersonID]) REFERENCES [V7].[AccidentPerson] ([AccidentPersonID]),
    CONSTRAINT [FK_AccidentPersonBodyPart_BodyPartID] FOREIGN KEY ([BodyPartID]) REFERENCES [V7].[BodyPart] ([BodyPartID])
);

