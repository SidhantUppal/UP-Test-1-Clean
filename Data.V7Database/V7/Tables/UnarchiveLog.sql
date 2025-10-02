CREATE TABLE [V7].[UnarchiveLog] (
    [UnarchiveLogID] INT            IDENTITY (1, 1) NOT NULL,
    [UserAreaID]     INT            NOT NULL,
    [UserID]         INT            NOT NULL,
    [DateTime]       DATETIMEOFFSET (7) NOT NULL,
    [Items]          XML            NOT NULL,
    [Comments]       NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([UnarchiveLogID] ASC)
);

