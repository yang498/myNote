commonData.database.sqlServer.content = `
#起步
大多数数据库使用 SQL 语句，包括：Oracle、Sybase、SQL Server、DB2、Access 等
SQL 语句对大小写不敏感，比如 SELECT 等同于 select
快捷用法：若运行时有光标选中将只运行选中部分的代码
快捷键：
!!
F5 或 Alt+X 或 Ctrl+E：执行
Ctrl+Shift+L：将选定文本转换为小写
Ctrl+Shift+U：将选定文本转换为大写
Ctrl+R：显示隐藏结果窗格
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
增加数据（SQL server 中每次插入的条数不能超过 1000），语法：
第一种不指定列名，需要插入的值和表头一一对应：·insert into tableName values (value1, value2, value3, ...)·
第二种指定列名，值和表头对应即可，若某列未插入值则会以·NULL·代替：
··
insert into tableName (column1, column2, column3, ...)
values (value1,value2,value3,...)
··

#select

##select
查询列，语法：^^select ·columnName· from ·tableName·^^
比如：
所有列：·select * from table·
单列：·select name from table·
多列：·select name,age from table·

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
^^and^^：找姓为 Carter 且名为 Thomas 的人：·select * from Person where FirstName = 'Thomas' ^^and^^ LastName = 'Carter'·
^^or^^：找姓为 Carter 或名为 Thomas 的人：·select * from Person where FirstName = 'Thomas' ^^or^^ LastName = 'Carter'·
^^and or^^：·select * from Person where (FirstName = 'Thomas' ^^or^^ LastName = 'Carter') ^^and^^ LastName = 'Carter'·
^^not^^：找非北京城市的人：·select * from Person where ^^not^^ city = 'Beijing'·
^^in^^：找 London 和 New York 城市：·select * from Person where city ^^in^^ ('London', 'New York')·
^^between and^^：找 1975 到 1985 之间的年份，执行：·select * from Persons where City ^^between^^ 1975 ^^and^^ 1985·
^^like^^：找包含 n 字母的城市，执行：·select * from Persons where City ^^like^^ '%n%'·
###查询 null 值
使用·select * from Persons where City = null·是查不到的
应使用 is：·select * from Persons where City is null·
在 SQL 中的逻辑值除了 true 和 false 还有 unknown（未知），一般任何值与 null 比较都会返回 unknown，而 unknown 会被当作 false，即·where City = null·无结果
但在 check 约束中，unknown 就会被当作 true 来处理，例如设置某个字段的值必须大于等于 0，还是可以插入 null，因为在 check 约束中·null >= 0·返回的 unknown 会被当作 true

##distinct
去重，语法：^^select distinct ·columnName· from ·tableName·^^
比如：·select distinct * from tableName·

##order by
对结果进行排序，默认从小到大排序（asc），即 0-9，a-b，如果需要倒序则需要在最后加上·desc·
语法：^^select ·columnName· from ·tableName· order by ·columnName· [asc/desc]^^
例如：
排序：
	·select Company, OrderNumber from Orders order by Company·
每个相同的 Company 中再进行 OrderNumber 排序：
	·select Company, OrderNumber from Orders order by Company, OrderNumber·
倒叙：
	·select Company, OrderNumber from Orders order by Company desc·
每个相同的 Company 中再进行 OrderNumber 正序排序：
	·select Company, OrderNumber from Orders order by Company desc, OrderNumber asc·

##top
规定要返回多少条数据，语法：select top ·number|percent· ·columnName· from ·tableName·
例如：
前 10 条数据：·select top 10 * from Persons·
前 50% 条数据：·select top 50 percent * from Persons·（总行为单数向上取整 +0.5）

#update
修改数据，语法：^^update ·tableName· set ·columnName· = ·newValue· where ·columnName· = ·value·^^
也就是设置 要改的列名 = 新值 再找到对应的行，如果对应的行有多个也会修改多个
例如：·update Person set FirstName = 'Fred' where LastName = 'Wilson' ·
修改多个：·update Person set Address = 'Zhongshan 23', City = 'Nanjing' WHERE LastName = 'Wilson'·

#delete
删除行，语法：^^delete from ·tableName· where ·columnName· = ·value·^^
例如：·delete from Person where LastName = 'Wilson'·
删除所有行：·delete from table_name·

#alias
对表名称或列名称指定别名将更易于阅读和书写
重命名表：select ·columnName· from ·tableName· as ·newName·
重命名列：select ·columnName· as ·newName· from ·tableName·
例如有两个表分别是·Persons·和·Product_Orders·，分别指定别名·p·和·po·
··
select po.orderId, p.name from Persons as p, Product_Orders as po where p.name = 'Tom'
··
不使用别名的语句是：
··
select Product_Orders.orderId, Persons.name from Persons, Product_Orders where Persons.name = 'Tom'
··


#date
··
// 计算时间戳
select datediff(s,'1970-01-01 00:00:00', getdate())
··

@@
w3school - SQL 教程|http://www.w3school.com.cn/sql/index.asp
@@

&2018/9/30
`