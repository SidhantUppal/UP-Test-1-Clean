CREATE TABLE [V7].[CourseCertificate] (
    [CourseCertificateID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]            INT                NOT NULL,
    [CourseEnrolmentID]     INT                NOT NULL,
    [CertificateTemplateID] INT                NULL,
    [CertificateNumber]     NVARCHAR (50)      NOT NULL,
    [IssuedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ExpiryDate]            DATETIMEOFFSET (7) NULL,
    [VerificationCode]      NVARCHAR (100)     NULL,
    [VerificationURL]       NVARCHAR (500)     NULL,
    [CertificateData]       NVARCHAR (MAX)     NULL,
    [CertificateFileURL]    NVARCHAR (500)     NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]      INT                NULL,
    [ModifiedDate]      DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]      INT                NULL,
    [ArchivedDate]          DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseCertificateID] ASC),
    CONSTRAINT [FK_CourseCertificate_Enrolment] FOREIGN KEY ([CourseEnrolmentID]) REFERENCES [V7].[CourseEnrolment] ([CourseEnrolmentID]),
    CONSTRAINT [FK_CourseCertificate_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

