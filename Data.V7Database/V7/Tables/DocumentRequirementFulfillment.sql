CREATE TABLE [V7].[DocumentRequirementFulfillment] (
    [FulfillmentID]     INT                IDENTITY (1, 1) NOT NULL,
    [RequirementID]     INT                NOT NULL,
    [DocumentID]        INT                NOT NULL,
    [Status]            NVARCHAR (50)      DEFAULT ('Pending') NOT NULL,
    [SubmittedByUserID] INT                NOT NULL,
    [SubmittedDate]     DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ReviewedByUserID]  INT                NULL,
    [ReviewedDate]      DATETIMEOFFSET (7) NULL,
    [ReviewNotes]       NVARCHAR (MAX)     NULL,
    [ExpiryDate]        DATETIMEOFFSET (7) NULL,
    CONSTRAINT [PK_DocumentRequirementFulfillment] PRIMARY KEY CLUSTERED ([FulfillmentID] ASC),
    CONSTRAINT [FK_DocumentRequirementFulfillment_Document] FOREIGN KEY ([DocumentID]) REFERENCES [V7].[Document] ([DocumentID]),
    CONSTRAINT [FK_DocumentRequirementFulfillment_Requirement] FOREIGN KEY ([RequirementID]) REFERENCES [V7].[DocumentRequirement] ([RequirementID]),
    CONSTRAINT [FK_DocumentRequirementFulfillment_ReviewedBy] FOREIGN KEY ([ReviewedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_DocumentRequirementFulfillment_SubmittedBy] FOREIGN KEY ([SubmittedByUserID]) REFERENCES [V7].[User] ([UserID])
);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRequirementFulfillment_DocumentID]
    ON [V7].[DocumentRequirementFulfillment]([DocumentID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRequirementFulfillment_RequirementID]
    ON [V7].[DocumentRequirementFulfillment]([RequirementID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DocumentRequirementFulfillment_Status]
    ON [V7].[DocumentRequirementFulfillment]([Status] ASC);

