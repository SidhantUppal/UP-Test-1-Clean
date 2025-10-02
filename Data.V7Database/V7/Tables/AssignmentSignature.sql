CREATE TABLE [V7].[AssignmentSignature] (
    [SignatureID]         INT                IDENTITY (1, 1) NOT NULL,
    [AssignmentID]        INT                NOT NULL,
    [SignerUserID]        INT                NOT NULL,
    [SignatureType]       NVARCHAR (50)      NOT NULL,
    [SignatureStatus]     NVARCHAR (50)      NOT NULL,
    [SignedDate]          DATETIMEOFFSET (7) NULL,
    [SignatureData]       NVARCHAR (MAX)     NULL,
    [IPAddress]           NVARCHAR (50)      NULL,
    [UserAgent]           NVARCHAR (500)     NULL,
    [GeographicLocation]  NVARCHAR (255)     NULL,
    [ExternalSignatureID] NVARCHAR (255)     NULL,
    [ExternalStatus]      NVARCHAR (100)     NULL,
    [DeclineReason]       NVARCHAR (MAX)     NULL,
    [Metadata]            NVARCHAR (MAX)     NULL,
    [CreatedDate]         DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    CONSTRAINT [PK_AssignmentSignature] PRIMARY KEY CLUSTERED ([SignatureID] ASC),
    CONSTRAINT [FK_AssignmentSignature_Assignment] FOREIGN KEY ([AssignmentID]) REFERENCES [V7].[DocumentAssignment] ([AssignmentID]),
    CONSTRAINT [FK_AssignmentSignature_Signer] FOREIGN KEY ([SignerUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_AssignmentID]
    ON [V7].[AssignmentSignature]([AssignmentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_SignatureStatus]
    ON [V7].[AssignmentSignature]([SignatureStatus] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_SignedDate]
    ON [V7].[AssignmentSignature]([SignedDate] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_AssignmentSignature_SignerUserID]
    ON [V7].[AssignmentSignature]([SignerUserID] ASC);

