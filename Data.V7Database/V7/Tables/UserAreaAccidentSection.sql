CREATE TABLE [V7].[UserAreaAccidentSection] (
    [UserAreaAccidentSectionID] INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                INT           NOT NULL,
    [Reference]                 NVARCHAR (50) NULL,
    [oldid]                     INT           NULL,
    [Title] NVARCHAR (255) NULL,
    [HelpText] NVARCHAR (1000) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaAccidentSectionID] ASC),
    CONSTRAINT [FK_UserAreaAccidentSection_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

