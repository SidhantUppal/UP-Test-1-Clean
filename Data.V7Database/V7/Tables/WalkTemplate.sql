CREATE TABLE [V7].[WalkTemplate] (
    [WalkTemplateID]       INT            IDENTITY (1, 1) NOT NULL,
    [TagTypeID]            INT            NOT NULL,
    [UserAreaID]           INT            NULL,
    [Title]                NVARCHAR (255) NOT NULL,
    [Description]          NVARCHAR (MAX) NULL,
    [MaxPreStartDuration]  INT            NULL,
    [MaxPostStartDuration] INT            NULL,
    [MaxExtensionDuration] INT            NULL,
    PRIMARY KEY CLUSTERED ([WalkTemplateID] ASC),
    CONSTRAINT [FK_WalkTemplate_TagTypeID] FOREIGN KEY ([TagTypeID]) REFERENCES [V7].[TagType] ([TagTypeID])
);

