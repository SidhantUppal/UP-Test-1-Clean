CREATE TABLE [V7].[UserAreaActivity] (
    [UserAreaActivityID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]         INT NOT NULL,
    [MainIndustryTypeID] INT NULL,
    [MainActivityTypeID] INT NULL,
    [SubActivityTypeID]  INT NULL,
    PRIMARY KEY CLUSTERED ([UserAreaActivityID] ASC),
    CONSTRAINT [FK_UserAreaActivity_MainActivityType] FOREIGN KEY ([MainActivityTypeID]) REFERENCES [V7].[MainActivityType] ([MainActivityTypeID]),
    CONSTRAINT [FK_UserAreaActivity_MainIndustryType] FOREIGN KEY ([MainIndustryTypeID]) REFERENCES [V7].[MainIndustryType] ([MainIndustryTypeID]),
    CONSTRAINT [FK_UserAreaActivity_SubActivityType] FOREIGN KEY ([SubActivityTypeID]) REFERENCES [V7].[SubActivityType] ([SubActivityTypeID]),
    CONSTRAINT [FK_UserAreaActivity_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID]),
    CONSTRAINT [CK_UserAreaActivity_UserArea] UNIQUE NONCLUSTERED ([UserAreaID] ASC)
);

