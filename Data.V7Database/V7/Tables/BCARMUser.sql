CREATE TABLE [V7].[BCARMUser] (
    [BCARMUserID]         INT           IDENTITY (1, 1) NOT NULL,
    [UserID]              INT           NULL,
    [EmployeeID]          INT           NULL,
    [BCARMUserAreaID]     INT           NULL,
    [BCARMUserInternalID] INT           NOT NULL,
    [Name]                VARCHAR (100) NOT NULL,
    [Email]               VARCHAR (50)  NOT NULL,
    [Password]            VARCHAR (50)  NOT NULL,
    [UserStatus]          VARCHAR (50)  NOT NULL,
    [TransactionType]     VARCHAR (255) NOT NULL,
    [CreatedDate]         DATETIMEOFFSET (7) NOT NULL,
    CONSTRAINT [PK_BCARMUserID] PRIMARY KEY CLUSTERED ([BCARMUserID] ASC)
);

