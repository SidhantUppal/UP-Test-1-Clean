CREATE TABLE [V7].[QuestionnaireResponseXML] (
    [QuestionnaireResponseXMLID]  INT            IDENTITY (1, 1) NOT NULL,
    [QuestionnaireResponseID]     INT            NOT NULL,
    [V5ChecklistCacheID]          INT            NOT NULL,
    [V5ChecklistResponseID]       INT            NOT NULL,
    [V5ParentChecklistResponseID] INT            NULL,
    [IsLatest]                    BIT            NOT NULL,
    [Version]                     DECIMAL (4, 1) NOT NULL,
    [XMLResponse]                 XML            NOT NULL,
    PRIMARY KEY CLUSTERED ([QuestionnaireResponseXMLID] ASC),
    CONSTRAINT [FK_QuestionnaireResponse_QuestionnaireResponseID] FOREIGN KEY ([QuestionnaireResponseID]) REFERENCES [V7].[QuestionnaireResponse] ([QuestionnaireResponseID])
);


GO
CREATE NONCLUSTERED INDEX [ix_QuestionnaireResponseXML_QuestionnaireResponseID]
    ON [V7].[QuestionnaireResponseXML]([QuestionnaireResponseID] ASC);

