CREATE TABLE [V7].[CourseEnrolmentSignature] (
    [CourseEnrolmentSignatureID] INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                 INT                NOT NULL,
    [CourseEnrolmentID]          INT                NOT NULL,
    [SignatureType]              NVARCHAR (50)      DEFAULT ('Completion') NULL,
    [SignatureData]              NVARCHAR (MAX)     NOT NULL,
    [SignedByUserID]             INT                NOT NULL,
    [SignedDate]                 DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [AgreementText]              NVARCHAR (MAX)     NULL,
    [IPAddress]                  NVARCHAR (50)      NULL,
    [UserAgent]                  NVARCHAR (500)     NULL,
    [CreatedByUserID]            INT                NOT NULL,
    [CreatedDate]                DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([CourseEnrolmentSignatureID] ASC),
    CONSTRAINT [FK_CourseEnrolmentSignature_Enrolment] FOREIGN KEY ([CourseEnrolmentID]) REFERENCES [V7].[CourseEnrolment] ([CourseEnrolmentID]),
    CONSTRAINT [FK_CourseEnrolmentSignature_SignedBy] FOREIGN KEY ([SignedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_CourseEnrolmentSignature_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

