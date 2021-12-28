# Min-Promise
*基础薄弱，写的比较详细，也可能有错误，欢迎指正*

# GYPromise类

## 构造函数

构造函数中需要传入一个函数作为参数，并且这个函数会立即执行

```js
class GYPromise {
  constructor(executor) {
    executor()
  }
}
```

## 创建resolve和reject函数

- 将函数传进executor

```js
class GYPromise {
  constructor(executor) {
    const resolve = () => {
      console.log("resove被调用");
    }
    const reject = () => {
      console.log("reject被调用");
    }
    executor(resolve, reject)
  }
}
```

用户在调用时，也相应的传入两个参数，这两个参数会和executor(resolve, reject)相对应，调用对应的函数，就会调用构造器中对应的函数

```js
const promise = new GYPromise((resolve, reject) => {
  resolve()
  reject()
})

// resove被调用
// reject被调用
```

## promise状态

因为resolve和reject有一个调用，另一个调用就会无效，所以状态就挺重要的了

- pending
- fulfilled
- rejected

executor函数执行期间，状态是pending的，当执行了resolve和reject函数，就先进行判断，如果当前this.status状态是pending的时候才执行函数体,并修改promise的状态

```js

...
this.status = PROMISE_STATUS_PENDING
const resolve = () => {
  if (this.status === PROMISE_STATUS_PENDING) {
    this.status = PROMISE_STATUS_FULFILLED
    console.log("resolve执行了");
  }
}
...

```

## 参数传递