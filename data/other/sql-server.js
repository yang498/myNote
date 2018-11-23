commonData.other.sqlServer.content = `
	#起步
	大多数数据库使用 SQL 语句，包括：Oracle、Sybase、SQL Server、DB2、Access 等
	SQL 语句对大小写不敏感，比如 SELECT 等同于 select

	#SQL Server
	快捷用法：若运行时有光标选中将只运行选中部分的代码
	快捷键：
	!!
	F5 或 Alt+X 或 Ctrl+E：执行
	Ctrl+Shift+L：将选定文本转换为小写
	Ctrl+Shift+U：将选定文本转换为大写
	Alt+上下键：移动当前行
	!!

	#create table
	创建表和表头，语法：
	··
	create table ·tableName· (
		column_name1 data_type(size),
		column_name2 data_type(size),
		column_name3 data_type(size),
		...
	)
	··
	比如创建用户信息表：
	··
	create table user_info (
		id bigint,
		name varchar(20),
		age int,
		sex int,
		address varchar(255)
	)
	··

	#insert into
	增加数据，语法：
	第一种不指定列名，需要插入的值和表头一一对应：·insert into tableName values (value1, value2, value3, ...)·
	第二种指定列名，值和表头对应即可，若某列未插入值则会以·NULL·代替：
	··
	insert into tableName (column1, column2, column3, ...)
	values (value1,value2,value3,...)
	··
	比如

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
	and：与，同时需要符合所有条件
	or：或，只需要符合某一条件
	not：非，除了指定条件
	in (...)：在指定的值内
	between ... and ...：指定范围，不同数据库是否包括开头结尾可能不一致
	like：指定模式，相当于正则，
		%：代表 0 到多个字符
		_：代表 1 个字符
		[¿charlist]¿：中括号中任意一个字符
		[¿^charlist]¿ 或 [¿!¿charlist]¿：非中括号中任意单一字符
		[¿0-9]¿[¿a-z]¿：中括号中使用 - 可表示范围
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
	找姓为 Carter 且名为 Thomas 的人：·select * from Person where FirstName = 'Thomas' and LastName = 'Carter'·
	找姓为 Carter 或名为 Thomas 的人：·select * from Person where FirstName = 'Thomas' or LastName = 'Carter'·
	and 和 or：·select * from Person where (FirstName = 'Thomas' or LastName = 'Carter') and LastName = 'Carter'·
	找非北京城市的人：·select * from Person where not city = 'Beijing'·
	找 London 和 New York 城市：·select * from Person where city in ('London', 'New York')·
	找 1975 到 1985 之间的年份，执行：·select * from Persons where City between 1975 and 1985·
	找包含 n 字母的城市，执行：·select * from Persons where City like %n%·

	&2018.9.30
`