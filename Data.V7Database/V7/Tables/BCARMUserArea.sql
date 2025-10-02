CREATE TABLE [V7].[BCARMUserArea] (
    [BCARMUserAreaID]         INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]              INT           NULL,
    [BCARMUserAreaInternalID] INT           NOT NULL,
    [CompanyName]             VARCHAR (255) NOT NULL,
    [Address]                 VARCHAR (255) NOT NULL,
    [Postcode]                VARCHAR (15)  NOT NULL,
    [TelephoneNumber]         VARCHAR (50)  NOT NULL,
    [BrokerName]              VARCHAR (255) NOT NULL,
    [FusionBranch]            VARCHAR (50)  NOT NULL,
    [AccountStatus]           VARCHAR (50)  NOT NULL,
    [TransactionType]         VARCHAR (255) NOT NULL,
    [CreatedDate]             DATETIMEOFFSET (7) NOT NULL,
    CONSTRAINT [PK_BCARMUserAreaID] PRIMARY KEY CLUSTERED ([BCARMUserAreaID] ASC)
);

