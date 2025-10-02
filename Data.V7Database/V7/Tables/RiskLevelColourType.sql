CREATE TABLE [V7].[RiskLevelColourType] (
    [RiskLevelColourTypeID] INT                IDENTITY (1, 1) NOT NULL,
    [ColorName]             NVARCHAR (50)      NOT NULL,
    [ColorHex]              NVARCHAR (7)       NOT NULL,
    [ColorDescription]      NVARCHAR (200)     NULL,
    [IsActive]              BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]       INT                NOT NULL,
    [CreatedDate]           DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([RiskLevelColourTypeID] ASC)
);

