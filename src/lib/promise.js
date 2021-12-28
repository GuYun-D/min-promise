const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

class GYPromise {
  /**
   * promise 构造函数
   * @param { Function } executor 回调函数，参数resolve和reject
   */
  constructor(executor) {
    // executor 执行期间，promise的状态是pending的
    this.status = PROMISE_STATUS_PENDING

    // 保存resolve和reject参数
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      // 不论是resolve和reject函数，只有当status === pending时才会执行
      if (this.status === PROMISE_STATUS_PENDING) {
        // 修改promise的状态为成功的
        this.status = PROMISE_STATUS_FULFILLED
        queueMicrotask(() => {
          // 保存参数
          this.value = value
          // 执行then传递的第一个回调函数
          this.onFulfilled(this.value)
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        queueMicrotask(() => {
          this.reason = reason
          // 执行then传递的第二个回调函数
          this.onRejected(this.reason)
        })
      }
    }

    executor(resolve, reject)
  }

  /**
   * 实例方法 then
   * @param {*} onFulfilled 成功调用函数
   * @param {*} onRejected 拒绝调用函数
   */
  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

export default GYPromise