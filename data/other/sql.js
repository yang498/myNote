commonData.other.sql = {
	name: 'SQL',
	content: `
	#起步
	大多数数据库使用 SQL 语句，包括：Oracle、Sybase、SQL Server、DB2、Access 等
	SQL 语句对大小写不敏感，比如 SELECT 等同于 select
	
	SQL Server 快捷用法：若运行时有光标选中将只运行选中部分的代码
	
	#select
	
	##select
	查询列，语法：^^select ·columnName· from ·tableName·^^
	比如：
	所有列：·select * from table·
	单列：·select name from table·
	多列：·select name,age from table·
	
	##distinct
	去重，仅对单列有效，语法：^^select distinct ·columnName· from ·tableName·^^
	比如：
	单列：·select distinct columnName from tableName·
	
	##where
	条件查询，语法：^^select ·columnName· from ·tableName· where ·columnName· ·condition· ·value·^^
	value 需用单引号标记，数字可省略
	condition 运算符包括：
	!!
	=：等于
	!¿= 或 <>：不等于
	>：大于
	<：小于
	>=：大于等于
	<=：小于等于
	between ... and ...：指定范围，不同数据库是否包括开头结尾可能不一致
	like：指定模式，相当于正则，用·%·表示通配符
	and：并且，都需要符合条件
	or：或者，只需要符合某一条件
	!!
	比如有个 Persons 表：
	%%
	LastName,FirstName,Address,City,Year
	,,,,
	Adams,John,Oxford Street,London,1970
	Bush,George,Fifth Avenue,New York,1975
	Carter,Thomas,Changan Street,Beijing,1980
	Gates,Bill,Xuanwumen 10,Beijing,1985
	%%
	找 Beijing 城市，执行：·select * from Persons where City = 'Beijing'·
	结果：
	%%
	LastName,FirstName,Address,City,Year
	,,,,
	Carter,Thomas,Changan Street,Beijing,1980
	Gates,Bill,Xuanwumen 10,Beijing,1985
	%%
	找 1975 到 1985 之间的年份，执行：·select * from Persons where City between 1975 and 1985·
	结果：
	%%
	LastName,FirstName,Address,City,Year
	,,,,
	Bush,George,Fifth Avenue,New York,1975
	Carter,Thomas,Changan Street,Beijing,1980
	Gates,Bill,Xuanwumen 10,Beijing,1985
	%%
	找包含 n 的城市，执行：·select * from Persons where City like %n%·
	结果：
	%%
	LastName,FirstName,Address,City,Year
	,,,,
	Adams,John,Oxford Street,London,1970
	Carter,Thomas,Changan Street,Beijing,1980
	Gates,Bill,Xuanwumen 10,Beijing,1985
	%%
	找姓为 Carter 且名为 Thomas 的人：·select * from Person where FirstName = 'Thomas' and LastName = 'Carter'·
	找姓为 Carter 或名为 Thomas 的人：·select * from Person where FirstName = 'Thomas' or LastName = 'Carter'·
	and 和 or 组合：·select * from Person where (FirstName = 'Thomas' or LastName = 'Carter') and LastName = 'Carter'·
	
	&2018.9.28
	`
}