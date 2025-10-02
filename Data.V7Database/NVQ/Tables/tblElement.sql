CREATE TABLE [NVQ].[tblElement] (
    [ElementId]    INT            IDENTITY (1, 1) NOT NULL,
    [UnitId]       INT            NOT NULL,
    [ElementCode]  NVARCHAR (20)  NOT NULL,
    [ElementTitle] NVARCHAR (200) NOT NULL,
    [Description]  NVARCHAR (MAX) NULL,
    [OrderIndex]   INT            NULL,
    [IsActive]     BIT            DEFAULT ((1)) NULL,
    [CreatedDate]  DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [ModifiedDate] DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([ElementId] ASC),
    FOREIGN KEY ([UnitId]) REFERENCES [NVQ].[tblUnit] ([UnitId])
);


GO
CREATE NONCLUSTERED INDEX [IX_Element_UnitId]
    ON [NVQ].[tblElement]([UnitId] ASC);

