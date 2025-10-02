CREATE TABLE [V7].[UserAreaAccidentForm] (
    [UserAreaAccidentFormID]                 INT           IDENTITY (1, 1) NOT NULL,
    [UserAreaID]                             INT           NOT NULL,
    [Reference]                              NVARCHAR (20) NOT NULL,
    [IsNonAccidentForm]                      BIT           DEFAULT ((0)) NOT NULL,
    [LatestTemplateVersion]                  TINYINT       DEFAULT ((1)) NOT NULL,
    [LiveTemplateVersion]                    TINYINT       NULL,
    [oldid]                                  INT           NULL,
    [IsEnabledForWeb]                        BIT           DEFAULT ((1)) NOT NULL,
    [IsEnabledForApp]                        BIT           DEFAULT ((1)) NOT NULL,
    [InvestigationUserAreaAccidentFormID]    INT           NULL,
    [IsSecondaryForm]                        BIT           DEFAULT ((0)) NOT NULL,
    [AllowCompletionFromAlternativeUserArea] BIT           DEFAULT ((0)) NOT NULL,
    [HasSeverityOptionEnabled]               BIT           DEFAULT ((1)) NOT NULL,
    [Title] NVARCHAR (255) NULL,
    [Description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([UserAreaAccidentFormID] ASC),
    CONSTRAINT [FK_UserAreaAccidentForm_InvestigationForm] FOREIGN KEY ([InvestigationUserAreaAccidentFormID]) REFERENCES [V7].[UserAreaAccidentForm] ([UserAreaAccidentFormID]),
    CONSTRAINT [FK_UserAreaAccidentForm_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

