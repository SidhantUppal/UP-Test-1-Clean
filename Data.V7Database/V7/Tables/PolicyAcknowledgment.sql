CREATE TABLE [V7].[PolicyAcknowledgment] (
    [PolicyAcknowledgmentID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT                NOT NULL,
    [PolicyID]               INT                NOT NULL,
    [UserID]                 INT                NOT NULL,
    [AcknowledgmentDate]     DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [AcknowledgmentMethod]   NVARCHAR (50)      DEFAULT ('Digital') NULL,
    [DigitalSignature]       NVARCHAR (MAX)     NULL,
    [IPAddress]              NVARCHAR (50)      NULL,
    [UserAgent]              NVARCHAR (500)     NULL,
    [AcknowledgmentText]     NVARCHAR (MAX)     NULL,
    [UserComments]           NVARCHAR (MAX)     NULL,
    [VerificationCode]       NVARCHAR (100)     NULL,
    [IsVerified]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]        INT                NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([PolicyAcknowledgmentID] ASC),
    CONSTRAINT [FK_PolicyAcknowledgment_Policy] FOREIGN KEY ([PolicyID]) REFERENCES [V7].[Policy] ([PolicyID]),
    CONSTRAINT [FK_PolicyAcknowledgment_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_PolicyAcknowledgment_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [UQ_PolicyAcknowledgment] UNIQUE NONCLUSTERED ([PolicyID] ASC, [UserID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyAcknowledgment_PolicyID]
    ON [V7].[PolicyAcknowledgment]([PolicyID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_PolicyAcknowledgment_UserID]
    ON [V7].[PolicyAcknowledgment]([UserID] ASC);

