commonData.javascript.demo.content = `
#编程模式

##三元嵌套
··
// bad
let result = null
if (conditionA) {
    if (conditionB) {
        result = "A & B"
    } else {
        result = "A"
    }
} else {
    result = "Not A"
}

// good
const result = !conditionA
  ? "Not A"
  : conditionB
  ? "A & B"
  : "A"
··

##object 代替 switch
不必担心·case·或·break·，代码意图明确，当需要用·switch·处理很多逻辑时可以考虑用·object literal·代替
··
// switch
switch (str) {
    case 'a': return 'AAA'
    case 'b': return 'BBB'
    case 'c': return 'CCC'
    default: return 'DDD'
}

// object literal
const swap = {
    a: () => 'AAA',
    b: () => 'BBB',
    c: () => 'CCC',
    default: () => 'DDD'
}
const str = (swap[str] || swap['default'])()
··

&2019/07/13
`