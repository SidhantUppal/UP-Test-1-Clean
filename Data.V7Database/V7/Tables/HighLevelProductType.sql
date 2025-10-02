CREATE TABLE [V7].[HighLevelProductType] (
    [HighLevelProductTypeID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [Controller]             NVARCHAR (50)  NULL,
    [Action]                 NVARCHAR (50)  NULL,
    [ResourceStringKey]      NVARCHAR (500) NULL,
    [CreatedByUserID]        INT            NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    [ModifiedByUserID]   INT            NULL,
    [ArchivedByUserID]       INT            NULL,
    [IsSelectable]           BIT            DEFAULT ((0)) NOT NULL,
    [Title] NVARCHAR (100) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [ModifiedDate] DATETIMEOFFSET (7) NULL,
    [ArchivedDate] DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK__HighLeve__C0A543AB055C9356] PRIMARY KEY CLUSTERED ([HighLevelProductTypeID] ASC)
,
    CONSTRAINT [FK_HighLevelProductType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


