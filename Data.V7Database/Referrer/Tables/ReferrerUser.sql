CREATE TABLE [Referrer].[ReferrerUser] (
    [ReferrerUserID]   INT            IDENTITY (1, 1) NOT NULL,
    [Name]             NVARCHAR (150) NOT NULL,
    [Email]            NVARCHAR (150) NULL,
    [Phone1]           NVARCHAR (15)  NULL,
    [Phone2]           NVARCHAR (15)  NULL,
    [CompanyName]      NVARCHAR (150) NULL,
    [LoginUsername]    NVARCHAR (150) NOT NULL,
    [LoginPassword]    NVARCHAR (50)  NOT NULL,
    [LoginUserSalt]    NVARCHAR (10)  NOT NULL,
    [RDPassword]       NVARCHAR (100) NULL,
    [T100Password]     NVARCHAR (100) NULL,
    [CreatedDate]      DATETIMEOFFSET (7)       NOT NULL,
    [ModifiedDate] DATETIMEOFFSET (7)       NULL,
    [ArchivedDate]     DATETIMEOFFSET (7)       NULL,
    PRIMARY KEY CLUSTERED ([ReferrerUserID] ASC)
);

