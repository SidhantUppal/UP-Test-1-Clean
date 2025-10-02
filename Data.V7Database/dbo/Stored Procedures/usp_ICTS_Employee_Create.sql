-- SET QUOTED_IDENTIFIER ON
-- GO
CREATE PROCEDURE [dbo].[usp_ICTS_Employee_Create]
   @IsDebugOnly BIT
AS
BEGIN
	SET NOCOUNT ON;    
	DECLARE @USERAREAID int = 308;

	if(@IsDebugOnly = 1)
	begin
		PRINT 'Debug mode is ON';
		
		
	end
	else
	BEGIN
		--PRINT 'Debug mode is OFF';
		
		BEGIN TRANSACTION; -- Start transaction

			BEGIN TRY
				-- Set who we want
				Update [dbo].[_ICTS_Import] set Action = 1 where email in (
					Select Email
					FROM [dbo].[_ICTS_Import] i
					WHERE NOT EXISTS (
						SELECT
						1
						FROM [V7].Employee e
						WHERE 
						  UserAreaID = 308
						  AND i.Employee_Reference = e.Reference
						  --AND i.Employee_Name = e.Name
						  AND E.ArchivedDate is null
					)

				)

				-- remove any records that already exit with a matching email, they are invalid records for emails that already have accounts
				Update [dbo].[_ICTS_Import] set Action = 0 where email in (
					Select email from Portal.Employee where email in (
						Select Email
						FROM [dbo].[_ICTS_Import] i
						WHERE NOT EXISTS (
							SELECT
							1
							FROM [V7].Employee e
							WHERE 
							  UserAreaID = 308
							  AND i.Employee_Reference = e.Reference
							  --AND i.Employee_Name = e.Name
							  AND E.ArchivedDate is null
						)
					)
				)

				--Delete From [dbo].[_ICTS_Import] where [Action] != 1
				--Select * from [dbo].[_ICTS_Import]

				Print 'Importing'

				--Declare @TodayNow DateTime = GETDATE()
				--DECLARE @InsertedIDs TABLE (UserID INT, Employee_Username INT);
				
				--INSERT INTO PORTAL.[USER] (MasterUserAreaID, UserSalt, Username, [Password], FullName, Email, IsLocked, CreatedByUserID, CreatedDate, [GUID] ) 
				--values 
				--(308,0,Employee_Username,'No Password Set',0, 1,@TodayNow,NEWID() )
				--OUTPUT INSERTED.UserID, Inserted.Employee_Username INTO @InsertedIDs (UserID, Employee_Username)
				--SELECT Email as Employee_Username, Employee_Reference, Employee_Name as FullName, Email
				--	FROM [dbo].[_ICTS_Import] i
				--	WHERE NOT EXISTS (
				--		SELECT
				--		1
				--		FROM [V7].Employee e
				--		WHERE 
				--		  UserAreaID = 308
				--		  AND i.Employee_Reference = e.Reference
				--		  --AND i.Employee_Name = e.Name
				--		  AND E.ArchivedDate is null
				--	)
				--order By Employee_Reference

				DECLARE @TodayNow DATETIME = GETDATE();
				DECLARE @InsertedIDs TABLE (UserID INT, Email Nvarchar(100));

				INSERT INTO PORTAL.[USER] (MasterUserAreaID, UserSalt, Username, [Password], FullName, Email, IsLocked, CreatedByUserID, CreatedDate, [GUID] )
				OUTPUT INSERTED.UserID, INSERTED.Username INTO @InsertedIDs (UserID, Email)
				SELECT 
					308,
					0,
					i.Email as Username,
					'No Password Set',
					i.Employee_Name,					
					i.Email,
					0,
					1,
					Getdate(),
					NEWID()
				FROM [dbo].[_ICTS_Import] i
				WHERE NOT EXISTS (
					SELECT 1
					FROM [V7].Employee e
					WHERE 
						e.UserAreaID = 308
						AND i.Employee_Reference = e.Reference
						AND e.ArchivedDate IS NULL
				)
				ORDER BY Employee_Reference;

				-- Sync the new UserID's inserted
				UPDATE [dbo].[_ICTS_Import]
				SET [dbo].[_ICTS_Import].UserID = i.UserID
				FROM [dbo].[_ICTS_Import] t
				JOIN @InsertedIDs i ON t.Email = i.Email;

				--select * from @InsertedIDs

				

				--Select * FROM [dbo].[_ICTS_Import] where [Action] = 1

				
				--DECLARE @TodayNow DATETIME = GETDATE();
				-- insert into [Employee]
				INSERT INTO PORTAL.EMPLOYEE (UserAreaID, [Name], Email, UserID, HasAccessToAllOrgGroups, IsContractor, Reference, StartDate, IsHidden, IsArchivableViaImport, DisableEmails, CreatedByUserID, CreatedDate, IsGloballyViewable, IsHomeWorker, IsNotWorking, HasAutoUpdateDisabled, BundleEmails, EmployeeTypeID)
				SELECT 308, Employee_Name as FullName, Email, UserID, 0, 0, Employee_Reference, Company_StartDate, 0, 1, 0, 1, @TodayNow, 0, 0, 0, 0, 0, 1
				FROM [dbo].[_ICTS_Import] i
				WHERE NOT EXISTS (
					SELECT
					1
					FROM [V7].Employee e
					WHERE 
						UserAreaID = 308
						AND i.Employee_Reference = e.Reference
						--AND i.Employee_Name = e.Name
						AND E.ArchivedDate is null						 
				)
				AND i.[Action] = 1

				-- insert into [location] (other)
				Insert into Portal.LocationEmployee (LocationID, EmployeeID, IsPrimary)  
				Select 12312, e.EmployeeID, 0 
				from Portal.Employee E
				Join [dbo].[_ICTS_Import] i on i.UserID = e.UserID and e.UserAreaID = 308
				
				SET NOCOUNT OFF;
				Select Employee_Name, Employee_Reference, Email, Company_StartDate
				From [dbo].[_ICTS_Import] Where [Action] = 1

				
				-- Commit if successful
				COMMIT TRANSACTION;
			END TRY
			BEGIN CATCH
				-- Handle the error
				SET NOCOUNT OFF;
				PRINT 'Error: ' + ERROR_MESSAGE();
				PRINT 'Transaction Aborted'
				-- Rollback transaction on error
				ROLLBACK TRANSACTION;
			END CATCH;
			
	END
	
END