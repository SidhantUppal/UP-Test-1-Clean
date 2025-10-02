CREATE TABLE [V7].[CourseAllocation] (
    [CourseAllocationID]   INT                IDENTITY (1, 1) NOT NULL,
    [UserAreaID]           INT                NOT NULL,
    [CourseID]             INT                NOT NULL,
    [OrgGroupID]           INT                NULL,
    [LocationID]           INT                NULL,
    [JobRoleID]            INT                NULL,
    [AllocationDate]       DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [DueDate]              DATETIMEOFFSET (7) NULL,
    [IsMandatory]          BIT                DEFAULT ((1)) NULL,
    [AutoEnrol]            BIT                DEFAULT ((1)) NULL,
    [IsRecurring]          BIT                DEFAULT ((0)) NULL,
    [RecurrencePattern]    NVARCHAR (50)      NULL,
    [RecurrenceMonths]     INT                NULL,
    [CreatedByUserID]      INT                NOT NULL,
    [CreatedDate]          DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    [ModifiedByUserID]     INT                NULL,
    [ModifiedDate]     DATETIMEOFFSET (7) NULL,
    [ArchivedByUserID]     INT                NULL,
    [ArchivedDate]         DATETIMEOFFSET (7) NULL,
    PRIMARY KEY CLUSTERED ([CourseAllocationID] ASC),
    CONSTRAINT [FK_CourseAllocation_Course] FOREIGN KEY ([CourseID]) REFERENCES [V7].[Course] ([CourseID]),
    CONSTRAINT [FK_CourseAllocation_Location] FOREIGN KEY ([LocationID]) REFERENCES [V7].[Location] ([LocationID]),
    CONSTRAINT [FK_CourseAllocation_OrgGroup] FOREIGN KEY ([OrgGroupID]) REFERENCES [V7].[OrgGroup] ([OrgGroupID]),
    CONSTRAINT [FK_CourseAllocation_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);


GO
CREATE NONCLUSTERED INDEX [IX_CourseAllocation_LocationID]
    ON [V7].[CourseAllocation]([LocationID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CourseAllocation_OrgGroupID]
    ON [V7].[CourseAllocation]([OrgGroupID] ASC);

