CREATE TABLE [V7].[AccidentFormTypeUserArea] (
    [AccidentFormTypeUserAreaID] INT IDENTITY (1, 1) NOT NULL,
    [AccidentFormTypeID]         INT NOT NULL,
    [UserAreaID]                 INT NOT NULL,
    [IsEnabledForWeb]            BIT DEFAULT ((1)) NOT NULL,
    [IsEnabledForApp]            BIT DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([AccidentFormTypeUserAreaID] ASC),
    CONSTRAINT [FK_AccidentFormTypeUserArea_AccidentFormType] FOREIGN KEY ([AccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentFormTypeUserArea_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

