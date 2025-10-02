CREATE TABLE [NVQ].[tblUnit] (
    [UnitId]       INT            IDENTITY (1, 1) NOT NULL,
    [UnitCode]     NVARCHAR (20)  NOT NULL,
    [UnitTitle]    NVARCHAR (200) NOT NULL,
    [UnitLevel]    INT            NULL,
    [Credits]      INT            NULL,
    [GLH]          INT            NULL,
    [Description]  NVARCHAR (MAX) NULL,
    [IsCore]       BIT            DEFAULT ((0)) NULL,
    [IsActive]     BIT            DEFAULT ((1)) NULL,
    [CreatedDate]  DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate] DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([UnitId] ASC)
);

