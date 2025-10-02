
---- If the tables don't exists
-- SET QUOTED_IDENTIFIER ON
-- GO


Create PROCEDURE [dbo].[usp_ICTS_Employee_Archive]
    @IsDebugOnly BIT
AS
BEGIN
    
	if(@IsDebugOnly = 1)
	begin
		PRINT 'Debug mode is ON';
		--return what would be archived
		Select e.Reference, e.name, E.Email, E.StartDate
		from Portal.Employee E 
		Where
		E.ArchivedDate is Null AND
		E.UserareaID = 308 AND
		E.IsHidden = 0 AND
		E.Reference Not in( 
			Select Employee_Reference from dbo._ICTS_Import
		)
		Order BY E.Reference

	end
	else
	BEGIN
		--PRINT 'Debug mode is OFF';
		PRINT 'Starting Archive'

		-- Archive these records (and export to file)
		Select e.Reference, e.name, E.Email, E.StartDate
		from Portal.Employee E 
		Where
		E.ArchivedDate is Null AND
		E.UserareaID = 308 AND
		E.IsHidden = 0 AND
		E.Reference Not in( 
			Select Employee_Reference from [dbo].[_ICTS_Import]
		)
		AND E.UserAreaID = 308
		Order BY E.Reference

		--TODO ARCHIVE EMPLOYEE records (working)
		Update Portal.Employee set ArchivedByUserID = 1, ArchivedDate = GETDATE() where EmployeeID in ( 
			Select 
				EmployeeID
			from Portal.Employee where UserareaID = 308
			AND ArchivedDate is null
			AND reference not in (
				Select Employee_Reference from dbo._ICTS_Import
			) 
			and reference is not null
			and ishidden != 1
		)
		and UserAreaID = 308
			
	END	
END

--Select * from [dbo].[_ICTS_Import]