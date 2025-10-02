CREATE TABLE [V7].[FolderType] (
    [FolderTypeID] INT           NOT NULL,
    [Description]  VARCHAR (255) NOT NULL,
    [IsHidden]     BIT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([FolderTypeID] ASC)
);

