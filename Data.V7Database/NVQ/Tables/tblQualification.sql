CREATE TABLE [NVQ].[tblQualification] (
    [QualificationId]    INT            IDENTITY (1, 1) NOT NULL,
    [QualificationCode]  NVARCHAR (50)  NOT NULL,
    [QualificationTitle] NVARCHAR (200) NOT NULL,
    [Level]              INT            NULL,
    [AwardingBody]       NVARCHAR (100) NULL,
    [TotalCredits]       INT            NULL,
    [MinimumCredits]     INT            NULL,
    [GLH]                INT            NULL,
    [Description]        NVARCHAR (MAX) NULL,
    [IsActive]           BIT            DEFAULT ((1)) NULL,
    [ValidFrom]          DATETIMEOFFSET (7)       NULL,
    [ValidTo]            DATETIMEOFFSET (7)       NULL,
    [CreatedDate]        DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate]       DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([QualificationId] ASC)
);

