CREATE TABLE [NVQ].[tblQualificationUnit] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [QualificationId] INT            NOT NULL,
    [UnitId]          INT            NOT NULL,
    [IsMandatory]     BIT            DEFAULT ((0)) NULL,
    [GroupName]       NVARCHAR (100) NULL,
    [MinGroupUnits]   INT            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([QualificationId]) REFERENCES [NVQ].[tblQualification] ([QualificationId]),
    FOREIGN KEY ([UnitId]) REFERENCES [NVQ].[tblUnit] ([UnitId])
);

