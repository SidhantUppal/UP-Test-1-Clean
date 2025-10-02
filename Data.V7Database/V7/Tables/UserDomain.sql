CREATE TABLE [V7].[UserDomain] (
    [UserDomainID] INT IDENTITY (1, 1) NOT NULL,
    [UserID]       INT NOT NULL,
    [DomainID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([UserDomainID] ASC),
    CONSTRAINT [FK_UserDomain_AllowedDomain] FOREIGN KEY ([DomainID]) REFERENCES [V7].[AllowedDomain] ([DomainID])
);

