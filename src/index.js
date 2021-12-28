import GYPromise from "./lib/promise.js";

const promise = new GYPromise((resolve, reject) => {
  // resolve("我是resolve参数")
  reject("我是reject参数")
})

promise.then(
  res => {
    console.log("res:", res);
  },
  err => {
    console.log("err:", err);
  }
)