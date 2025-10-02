CREATE TABLE [V7].[MonitoringReportXsltTransformer] (
    [MonitoringReportXsltTransformerID] INT            NOT NULL,
    [XsltTransformerTypeID]             INT            NOT NULL,
    [Title]                             NVARCHAR (250) NOT NULL,
    [RegionTypeID]                      INT            NOT NULL,
    [LanguageTypeID]                    INT            NOT NULL,
    [Xslt]                              XML            NOT NULL,
    [Version]                           VARCHAR (10)   NOT NULL,
    [IsActive]                          BIT            DEFAULT ((1)) NOT NULL,
    [CreatedDate]                       DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([MonitoringReportXsltTransformerID] ASC),
    CONSTRAINT [FK_MonitoringReportXsltTransformer_LanguageType] FOREIGN KEY ([LanguageTypeID]) REFERENCES [V7].[LanguageType] ([LanguageTypeID]),
    CONSTRAINT [FK_MonitoringReportXsltTransformer_RegionType] FOREIGN KEY ([RegionTypeID]) REFERENCES [V7].[RegionType] ([RegionTypeID]),
    CONSTRAINT [FK_MonitoringReportXsltTransformer_XsltTransformersType] FOREIGN KEY ([XsltTransformerTypeID]) REFERENCES [V7].[XsltTransformerType] ([XsltTransformerTypeID])
);

