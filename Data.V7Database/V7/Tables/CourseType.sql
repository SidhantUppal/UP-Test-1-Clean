CREATE TABLE [V7].[CourseType] (
    [CourseTypeID]         INT                IDENTITY (1, 1) NOT NULL,
    [TypeName]             NVARCHAR (50)      NOT NULL,
    [TypeDescription]      NVARCHAR (200)     NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID] INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseTypeID] ASC)
);

