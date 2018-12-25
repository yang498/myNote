commonData.js.es6.content = `
	#Promise
	##语法
	Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
	创建 Promise 实例：
	··
	const promise = new Promise()
	··
	Promise 的构造函数接受一个函数，且有两个参数方法  ·resolve· 和 ·reject·
	Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）
	即创建时为 pending 状态，而·resolve()·能将状态变为 fulfilled，·reject()·能将状态变为 rejected
	Promise 的状态一旦改变，就永久保持该状态，不会再变了
	也可以说 resolve 是成功时执行的函数，reject 是失败时执行的函数，例如：
	··
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (/* 异步操作成功 */){
				resolve(value)
			} else {
				reject(error)
			}
		}, 1000)
	})
	··

	##.prototype.than()
	resolve 和 reject 函数是在 Promise 内部定义的，所以有·.then()·来监听 Promise 的状态变化
	·then·方法可以接受两个回调函数作为参数。第一个是 Promise 对象的状态变为·resolved·时调用，第二个变为·rejected·时调用。其中第二个函数是可选的。这两个函数都接受Promise对象传出的值作为参数。例如：
	··
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (/* 异步操作成功 */){
				resolve(value)
			} else {
				reject(error)
			}
		}, 1000)
	})

	promise.then(value => {
		console.log('success')
	}, error => {
		console.log('failure')
	})
	··
	Promise 新建后就会立即执行：
	··
	const promise = new Promise((resolve, reject) => {
		resolve('resolved')
		console.log('Promise')
	})
	promise.then(res => console.log(res))
	console.log('Hi!')

	// Promise
	// Hi!
	// resolved
	··
	上面代码中，Promise 新建后立即执行，所以首先输出的是Promise，then 方法在当前脚本所有同步任务执行完才会执行，所以 resolved 最后输出。
	用 Promise 对象实现 Ajax 操作：
	··
	const getJSON = url => new Promise((resolve, reject) => {
	    const client = new XMLHttpRequest()
	    client.open('GET', url)
	    client.onreadystatechange = function () {
			if (this.readyState === 4) this.status === 200 ? resolve(this.response) : reject(this.statusText)
		}
	    client.responseType = 'json'
	    client.setRequestHeader('Accept', 'application/json')
	    client.send()
	})

	getJSON('/data.json').then(json => {
	  console.log('Contents: ' + json)
	}, error => {
	  console.error('出错了', new Error(error))
	})
	··
	·resolve·函数的参数除了正常的值以外，还可以是另一个 Promise 实例，例如：
	··
	const p1 = new Promise(function (resolve, reject) {
		// ...
	});

	const p2 = new Promise(function (resolve, reject) {
		// ...
		resolve(p1)
	})
	··
	上面代码中，p1 和 p2 都是 Promise 的实例，但是 p2 的·resolve·方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作，这时 p1 的状态就会传递给 p2，即 p1 的状态决定了 p2 的状态
	··
	const p1 = new Promise((resolve, reject) => {
		setTimeout(() => reject(new Error('fail')), 3000)
	})

	const p2 = new Promise((resolve, reject) => {
		setTimeout(() => resolve(p1), 1000)
	})

	p2.then(
		result => console.log(result),
		error => console.log(error)
	)

	// Error: fail
	··
	上面代码中，p1 3 秒之后变为 rejected。p2 的状态在 1 秒之后调用 resolve 并返回  p1。
	由于 p2 返回的是另一个 Promise，导致 p2 自己的状态无效了，由 p1 的状态决定 p2 的状态。所以·p2.then·等同于·p1.then·。
	&nbsp;
	·then·方法返回的是一个新的 Promise 实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即·then·方法后面再调用另一个·then·方法。前一个·then·返回的值可作为后一个·then·的参数使用。例如：
	··
	promise.then(() => {
		return 123
	}).then(res => {
		console.log(res) // 123
	})
	··
	如果前一个回调函数返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数就会等待该 Promise 对象的状态发生变化，才会被调用。例如：
	··
	getJSON("/post/1.json")
		.then(post => getJSON(post.commentURL))
		.then(
			comments => console.log("resolved: ", comments),
			err => console.log("rejected: ", err)
		)
	··

	##.prototype.catch()
	·.catch()·方法是·.then(null, fn)·的别名，用于指定发生错误时的回调函数，即：
	··
	promise.then(() => console.log('success')).catch(() => console.log('error'))
	// 等同于
	promise.then(() => console.log('success')).then(null, () => console.log('rejected')
	··
	Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获
	··
	getJSON('/post/1.json')
		.then(function(post) {
			return getJSON(post.commentURL);
		}).then(function(comments) {
			// some code
		}).catch(function(error) {
			// 处理前面三个Promise产生的错误
		})
	··
	上面代码中，一共有三个 Promise 对象：一个由 getJSON 产生，两个由 then 产生。它们之中任何一个抛出的错误，都会被最后一个 catch 捕获
	注意 catch 本身产生的错误自己不会捕获，由下一个 catch 捕获
	一般来说使用·catch·方法比·then·的第二个参数要好，不仅可以捕获前面的错误，语义也更好
	Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”：
	··
	const promise = new Promise((resolve, reject) => {
	    resolve(x + 2) // 报错，x 没有声明
	})
	promise.then(function() {
		console.log('everything is great')
	})
	setTimeout('console.log(123)', 2000)

	// Uncaught (in promise) ReferenceError: x is not defined
	// 123
	··
	但如果错误是异步的，此时 Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，是一个未捕获的错误，当然也不会影响外部的代码：
	··
	const promise = new Promise(function (resolve, reject) {
		resolve('ok')
		setTimeout('throw new Error("test")', 0)
	})
	// Uncaught Error: test
	··

	##.prototype.finally()
	该方法用于指定不管 Promise 对象最后状态如何，都会执行的操作，不接受任何参数
	··
	promise
		.then(result => {...})
		.catch(error => {...})
		.finally(() => {...})
	··
	上面代码中，不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行·finally·方法指定的回调函数
	·finally·本质上是·then·方法的特例：
	··
	promise.finally(() => console.log(123))
	// 等同于
	promise.then(() => console.log(123), () => console.log(123))
	··
	具体实现：
	··
	Promise.prototype.finally = function (callback) {
	  const P = this.constructor
	  return this.then(
	    value  => P.resolve(callback()).then(() => value),
	    reason => P.resolve(callback()).then(() => { throw reason })
	  )
	}
	··
	从上面的实现还可以看到，·finally·方法总是会返回原来的值

	@@
	ECMAScript 6 入门|http://es6.ruanyifeng.com/
	@@

	&2018.11.27
`