CREATE TABLE [V7].[ApprovalStatusType] (
    [ApprovalStatusTypeID] INT NOT NULL,
    [IsVisible]            BIT DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ApprovalStatusTypeID] ASC)
);

