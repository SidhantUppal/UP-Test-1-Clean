CREATE TABLE [V7].[SSOWDocumentType] (
    [SSOWDocumentTypeID]    INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [TypeName]              NVARCHAR (100)     NOT NULL,
    [TypeDescription]       NVARCHAR (500)     NULL,
    [TypeCategory]          NVARCHAR (50)      NOT NULL,
    [TemplateURL]           NVARCHAR (500)     NULL,
    [RequiresApproval]      BIT                DEFAULT ((1)) NULL,
    [ReviewFrequencyMonths] INT                NULL,
    [IsActive]              BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]  INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([SSOWDocumentTypeID] ASC)
,
    CONSTRAINT [FK_SSOWDocumentType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


