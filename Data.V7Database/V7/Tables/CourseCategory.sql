CREATE TABLE [V7].[CourseCategory] (
    [CourseCategoryID]     INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CategoryName]         NVARCHAR (100)     NOT NULL,
    [CategoryDescription]  NVARCHAR (500)     NULL,
    [ParentCategoryID]     INT                NULL,
    [DisplayOrder]         INT                DEFAULT ((0)) NULL,
    [IsActive]             BIT                DEFAULT ((1)) NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseCategoryID] ASC),
    CONSTRAINT [FK_CourseCategory_Parent] FOREIGN KEY ([ParentCategoryID]) REFERENCES [V7].[CourseCategory] ([CourseCategoryID]),
    CONSTRAINT [FK_CourseCategory_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

