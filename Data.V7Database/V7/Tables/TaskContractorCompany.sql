CREATE TABLE [V7].[TaskContractorCompany] (
    [TaskContractorCompanyID] INT IDENTITY (1, 1) NOT NULL,
    [TaskID]                  INT NOT NULL,
    [ContractorCompanyID]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([TaskContractorCompanyID] ASC),
    CONSTRAINT [FK_TaskContractorCompany_ContractorCompany] FOREIGN KEY ([ContractorCompanyID]) REFERENCES [V7].[ContractorCompany] ([ContractorCompanyID]),
    CONSTRAINT [FK_TaskContractorCompany_Task] FOREIGN KEY ([TaskID]) REFERENCES [V7].[BSSTask] ([TaskID]),
    CONSTRAINT [CK_TaskContractorCompany_Unique] UNIQUE NONCLUSTERED ([TaskID] ASC, [ContractorCompanyID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_TaskContractorCompany_TaskID_includes]
    ON [V7].[TaskContractorCompany]([TaskID] ASC)
    INCLUDE([TaskContractorCompanyID], [ContractorCompanyID]);

