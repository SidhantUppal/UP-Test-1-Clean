CREATE TABLE [V7].[OrgGroupLocation] (
    [OrgGroupLocationID] INT      IDENTITY (1, 1) NOT NULL,
    [OrgGroupID]         INT      NOT NULL,
    [LocationID]         INT      NOT NULL,
    [DateTime]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([OrgGroupLocationID] ASC),
    CONSTRAINT [FK_OrgGroupLocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_OrgGroupLocation_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [CK_OrgGroupLocation_Unique] UNIQUE NONCLUSTERED ([OrgGroupID] ASC, [LocationID] ASC)
);

