CREATE TABLE [V7].[GenericStatusType] (
    [GenericStatusTypeID] INT           NOT NULL,
    [Type]                NVARCHAR (30) NOT NULL,
    [UserAreaID]          INT           NULL,
    [Reference]           NVARCHAR (50) NULL,
    [Title] NVARCHAR (150) NULL,
    PRIMARY KEY CLUSTERED ([GenericStatusTypeID] ASC),
    CONSTRAINT [FK_GenericStatusType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

