commonData.jsApi.date.content = `
#概述
·Date·对象是 JavaScript 原生的时间库。它以1970年1月1日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天（单位为毫秒）
##普通函数
直接调用会返回一个代表当前时间的字符串，不接受参数
··
Date() // "Wed Apr 03 2019 16:14:02 GMT+0800 (中国标准时间)"
··
##构造函数
使用·new·命令可创建·Date·对象的实例，不使用参数时的返回值等同于·Date()·，即当前时间
当传入时间格式参数时返回该参数对应的时间实例
以下是参数说明
###一个毫秒整数代表时间戳
··
new Date(1378218728000)
new Date(-1378218728000)
··
###两个以上整数代表年、月、日、时、分、秒、毫秒
省略的部分默认为 0
··
new Date(2013, 6)
new Date(2019, 3, 24, 20, 0, 0, 0)
··
取值范围：
!!
年：使用四位数年份，如果写成两位数或个位数，则自动加上 1900，即 10 代表 1910 年。如果是负数，表示公元前
月：0-11
日：1-31
小时：0-23
分钟：0-59
秒：0-59
毫秒：0-999
!!
###一个能被·Date.parse()·解析的字符串代表要解析的日期
··
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('Feberuary, 15, 2013')
new Date('Feberuary 15, 2013')
new Date('15 Feb 2013')
new Date('15, Feberuary, 2013')
··
###日期的运算
Date 实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串
··
+ new Date // 1554280788949
'时间：' + new Date // "时间：Wed Apr 03 2019 16:40:15 GMT+0800 (中国标准时间)"
··

#普通方法

##Date.now()
返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以 1000
··
Date.now() // 1364026285194
··

##Date.parse()
解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数
日期字符串应该符合 RFC 2822 和 ISO 8061 这两个标准，即 YYYY-MM-DDTHH:mm:ss.sssZ 格式，其中最后的 Z 表示时区
其他格式也可以被解析，若解析失败返回·NaN·
··
Date.parse('Aug 9, 1995') // 807897600000
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
Date.parse('2011-10-10')
Date.parse('2011-10-10T14:48:00')

Date.parse('xxx') // NaN
··

##Date.UTC()
等同于·new Date()·，区别在于是 UTC 时间（世界标准时间），·new Date()·是当前时区时间
··
Date.UTC(2011, 0, 1, 2, 3, 4, 567) // 1293847384567
··

#实例方法

##D.p.get*()
·Date.prototype.get*()·：get 类方法可以用来获取实例对象某个方面的值
!!
getTime()：实例距离 1970年1月1日00:00:00 的毫秒数，等同于·valueOf·方法
getDate()：每个月的几号（从1开始）
getDay()：星期几，星期日为 0，星期一为 1，以此类推
getYear()：返回距离 1900 的年数
getFullYear()：返回四位的年份
getMonth()：返回月份（0表示1月，11表示12月）
getHours()：返回小时（0-23）
getMinutes()：返回分钟（0-59）
getSeconds()：返回秒（0-59）
getMilliseconds()：返回毫秒（0-999）
getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素
!!
··
var d = new Date('January 6, 2013')

d.getDate() // 6
d.getMonth() // 0
d.getYear() // 113
d.getFullYear() // 2013
d.getTimezoneOffset() // -480，除以 60 即早 8 个小时
··
UTC （世界时间）版：
!!
getUTCDate()
getUTCDay()
getUTCFullYear()
getUTCMonth()
getUTCHours()
getUTCMinutes()
getUTCSeconds()
getUTCMilliseconds()
!!

##D.p.set*()
·Date.prototype.set*()·：set 类方法可以用来设置实例对象的各个方面的值
和 get 类对应，除了·setDay·方法，因为星期几是计算出来的，而不是设置的
!!
setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳
setYear(year)：设置距离1900年的年数
setFullYear(year [, month, date])：设置四位年份
setMonth(month [, date])：设置月份（0-11）
setHours(hour [, min, sec, ms])：设置小时（0-23）
setMilliseconds()：设置毫秒（0-999）
setMinutes(min [, sec, ms])：设置分钟（0-59）
setSeconds(sec [, ms])：设置秒（0-59）
setTime(milliseconds)：设置毫秒时间戳
!!
若参数超过范围会自动折算。以·setDate·为例，如果参数超过当月的最大天数，则向下一个月顺延，如果参数是负数，表示从上个月的最后一天开始减去的天数
··
var d = new Date ('January 6, 2013')

d.setDate(9) // 1357660800000
d // Wed Jan 09 2013 00:00:00 GMT+0800 (CST)

d.setDate(32) // 1359648000000
d // Fri Feb 01 2013 00:00:00 GMT+0800 (CST)
··
·set·类方法和·get·类方法可以结合使用得到相对时间
··
var d = new Date()

// 将日期向后推 1000 天
d.setDate(d.getDate() + 1000)
// 将时间设为 6 小时后
d.setHours(d.getHours() + 6)
// 将年份设为去年
d.setFullYear(d.getFullYear() - 1)
··
UTC （世界时间）版：
!!
setUTCDate()
setUTCFullYear()
setUTCMonth()
setUTCHours()
setUTCMilliseconds()
setUTCMinutes()
setUTCSeconds()
!!

##D.p.valueOf()
·Date.prototype.valueOf()·：返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于·getTime·方法
当将日期实例对象转为数值时即调用的该方法

##D.p.to*()
!!
Date.prototype.toString()：返回日期字符串，当直接读取实例或转为字符串时即调用的该方法
Date.prototype.toUTCString()：返回日期字符串的世界时间（晚北京时间 8 小时）
Date.prototype.toISOString()：返回日期字符串的 ISO8601 （且为 UTC 时间）写法，形如·2012-12-31T16:00:00.000Z·
Date.prototype.toJSON()：等同于·.toISOString()·
Date.prototype.toDateString()：返回日期字符串的年月日星期部分（不含时分秒和时区），形如·Thu Apr 04 2019·
Date.prototype.toTimeString()：返回日期字符串的时分秒和时区部分（不含年月日星期），形如·11:38:25 GMT+0800 (中国标准时间)·
Date.prototype.toLocaleDateString()：返回日期字符串当地写法的年月日部分，形如·2019/4/4·（不同浏览器格式可能不同）
Date.prototype.toLocaleTimeString()：返回日期字符串当地写法的时分秒部分，形如·上午11:41:46·（不同浏览器格式可能不同）
!!

#常用时间方法
··
// 判断闰年，能被 4 且不能被 100 整除，或能被 400 整除
const leapYear = y => y % 4 === 0 && y % 100 !== 0 || y % 400 === 0

// 判断月份的天数，1 3 5 7 8 10 12 返回 31，4 6 9 11 返回 30，2 如果是闰年返回 29，否则 28
const monthDay = (m, y) => /^1$|3|5|7|8|10|12/.test(m) ? 31 : /4|6|9|11/.test(m) ? 30 : leapYear(y) ? 29 : 28

// 时间只有 1 位就在前面加 0
const add0 = n => n > 9 ? n : '0' + n

// 时间戳格式化：倒计时时分秒
const formatTime = timeDiff => {
	const day = Math.floor(timeDiff /¿ 1000 /¿ 60 /¿ 60 /¿ 24)
	const hour = Math.floor(timeDiff /¿ 1000 /¿ 60 /¿ 60 % 24)
	const minute = Math.floor(timeDiff /¿ 1000 /¿ 60 % 60)
	const second = Math.floor(timeDiff /¿ 1000 % 60)
	return [day * 24 + hour, minute, second].map(add0).join(' : ')
}

// 时间戳格式化：年月日 时分秒
const formatDate = (time, format) => {
	const date = new Date(time - 0)
	const aWeek = '日一二三四五六'

	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const week = '周' + aWeek[date.getDay()]
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	const ymd = [year, month, day].map(add0).join('/')
	const hms = [hour, minute, second].map(add0).join(':')

	return format === 'ymd' ? ymd : format === 'hms' ? hms : [ymd, week, hms].join(' ')
}

// 时间戳格式化：年月日 时分，判断显示昨天、前天、月日、年月日
const formatDateNow = (time, nowTime, join = ' ') => {
	// 指定的时间
	const date = new Date(time - 0)

	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()

	let md = [month, day].map(add0).join('/')
	const hm = [hour, minute].map(add0).join(':')

	// 现在的年份
	const nowDate = new Date(nowTime)
	const nowYear = nowDate.getFullYear()
	const today0 = new Date(nowDate.toDateString()) // 以当天 0 点作为分隔

	// 判断两个日子之差
	const dayDiff = Math.floor((today0 - time - 1) /¿ 1000 /¿ 60 /¿ 60 /¿ 24)
	if (dayDiff < 2) {
		md = dayDiff < 0 ? '' : dayDiff === 0 ? '昨天' : '前天'
	} else {
		md = (nowYear === year ? '' : year + '/') + md
	}

	return md + (md && join) + hm
}
··

&2019/4/4
`