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

    const resolve = () => {
      // 不论是resolve和reject函数，只有当status === pending时才会执行
      if (this.status === PROMISE_STATUS_PENDING) {
        // 修改promise的状态为成功的
        this.status = PROMISE_STATUS_FULFILLED
        console.log("resolve执行了");
      }
    }

    const reject = () => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        console.log("reject执行了");
      }
    }

    executor(resolve, reject)
  }
}

export default GYPromise