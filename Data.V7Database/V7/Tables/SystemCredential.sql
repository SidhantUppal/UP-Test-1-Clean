CREATE TABLE [V7].[SystemCredential] (
    [SystemCredentialID]       INT            IDENTITY (1, 1) NOT NULL,
    [Username]                 NVARCHAR (255) NULL,
    [Password]                 NVARCHAR (50)  NOT NULL,
    [SystemCredentialEnumType] INT            NOT NULL,
    [Description]              NVARCHAR (255) NULL,
    [IsEnabled]                BIT            DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([SystemCredentialID] ASC)
);

