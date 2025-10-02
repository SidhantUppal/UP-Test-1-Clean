CREATE TABLE [V7].[PolicyType] (
    [PolicyTypeID]           INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT           NULL,
    [TypeName]               NVARCHAR (100)     NOT NULL,
    [TypeDescription]        NVARCHAR (500)     NULL,
    [RequiresApproval]       BIT                DEFAULT ((1)) NULL,
    [RequiresTraining]       BIT                DEFAULT ((0)) NULL,
    [RequiresAcknowledgment] BIT                DEFAULT ((1)) NULL,
    [ReviewFrequencyMonths]  INT                DEFAULT ((12)) NULL,
    [IsActive]               BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]   INT                NULL,
    [ModifiedDate]       DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]       INT                NULL,
    [ArchivedDate]           DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([PolicyTypeID] ASC)
,
    CONSTRAINT [FK_PolicyType_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


