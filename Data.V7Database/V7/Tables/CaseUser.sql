CREATE TABLE [V7].[CaseUser] (
    [CaseUserID]     INT IDENTITY (1, 1) NOT NULL,
    [CaseID]         INT NOT NULL,
    [UserID]         INT NOT NULL,
    [CaseUserTypeID] INT NOT NULL,
    [HasRead]        BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([CaseUserID] ASC),
    CONSTRAINT [FK_CaseUser_Case] FOREIGN KEY ([CaseID]) REFERENCES [V7].[Case] ([CaseID]),
    CONSTRAINT [FK_CaseUser_CaseUserType] FOREIGN KEY ([CaseUserTypeID]) REFERENCES [V7].[CaseUserType] ([CaseUserTypeID]),
    CONSTRAINT [FK_CaseUser_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

