CREATE TABLE [NVQ].[tblPortfolioStatus] (
    [PortfolioStatusId] INT            IDENTITY (1, 1) NOT NULL,
    [StatusName]        NVARCHAR (50)  NOT NULL,
    [StatusDescription] NVARCHAR (200) NULL,
    [IsActive]          BIT            DEFAULT ((1)) NULL,
    [CreatedDate]       DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate]      DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([PortfolioStatusId] ASC)
);

