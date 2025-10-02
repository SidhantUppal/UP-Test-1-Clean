CREATE TABLE [V7].[AccidentFormCrossPopulationType] (
    [AccidentFormCrossPopulationTypeID] INT            NOT NULL,
    [MainAccidentFormTypeID]            INT            NOT NULL,
    [LinkingAccidentFormTypeID]         INT            NOT NULL,
    [Description]                       NVARCHAR (250) NOT NULL,
    [IsEnabled]                         BIT            DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([AccidentFormCrossPopulationTypeID] ASC),
    CONSTRAINT [FK_AccidentFormCrossPopulationType_LinkingAccidentFormTypeID] FOREIGN KEY ([LinkingAccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID]),
    CONSTRAINT [FK_AccidentFormCrossPopulationType_MainAccidentFormTypeID] FOREIGN KEY ([MainAccidentFormTypeID]) REFERENCES [V7].[AccidentFormType] ([AccidentFormTypeID])
);

