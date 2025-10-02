CREATE TABLE [V7].[Enquiry] (
    [EnquiryID]         INT            IDENTITY (1, 1) NOT NULL,
    [EnquiryTypeID]     INT            NOT NULL,
    [UserAreaID]        INT            NOT NULL,
    [UserID]            INT            NOT NULL,
    [Subject]           NVARCHAR (150) NOT NULL,
    [Comments]          NVARCHAR (MAX) NOT NULL,
    [SubmittedDate]     DATETIMEOFFSET (7) NOT NULL,
    [ProcessedNote]     NVARCHAR (MAX) NULL,
    [ProcessedByUserID] INT            NULL,
    [ProcessedDate]     DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([EnquiryID] ASC),
    CONSTRAINT [FK_Enquiry_EnquiryType] FOREIGN KEY ([EnquiryTypeID]) REFERENCES [V7].[EnquiryType] ([EnquiryTypeID]),
    CONSTRAINT [FK_Enquiry_ProcessedBy] FOREIGN KEY ([ProcessedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Enquiry_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_Enquiry_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

