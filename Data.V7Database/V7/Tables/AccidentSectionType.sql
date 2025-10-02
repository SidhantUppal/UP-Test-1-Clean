CREATE TABLE [V7].[AccidentSectionType] (
    [AccidentSectionTypeID] INT           IDENTITY (1, 1) NOT NULL,
    [Title]                 NVARCHAR (255) NULL,
    [Reference]             NVARCHAR (50) NULL,
    [HelpText]              NVARCHAR (1000) NULL,
    [UserAreaID]            INT           NULL,
    CONSTRAINT [PK__Accident__4B112042BF67DEED] PRIMARY KEY CLUSTERED ([AccidentSectionTypeID] ASC),
    CONSTRAINT [FK_AccidentSectionType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

