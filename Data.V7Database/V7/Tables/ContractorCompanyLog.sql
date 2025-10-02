CREATE TABLE [V7].[ContractorCompanyLog] (
    [ContractorCompanyLogID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]             INT            NOT NULL,
    [ContractorCompanyID]    INT            NOT NULL,
    [Comments]               NVARCHAR (255) NULL,
    [LoggedDate]             DATE           NOT NULL,
    [LoggedByUserID]         INT            NOT NULL,
    [LoggedByFullName]       NVARCHAR (100) NULL,
    [LoggedByJobTitle]       NVARCHAR (100) NULL,
    [LoggedBySignature]      NVARCHAR (MAX) NULL,
    [IsApproved]             BIT            DEFAULT ((0)) NOT NULL,
    [SignOffStage]           TINYINT        NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([ContractorCompanyLogID] ASC),
    CONSTRAINT [FK_ContractorCompanyLog_ContractorCompany] FOREIGN KEY ([ContractorCompanyID]) REFERENCES [V7].[ContractorCompany] ([ContractorCompanyID]),
    CONSTRAINT [FK_ContractorCompanyLog_User] FOREIGN KEY ([LoggedByUserID]) REFERENCES [V7].[User] ([UserID]),
    CONSTRAINT [FK_ContractorCompanyLog_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

