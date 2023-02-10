// onmessage = function (e) {
  // onmessage获取传入的初始值
  // console.log(e.data)
  // let sum = e.data;
  // for (let i = 0; i < 10000; i++) {
  //   for (let i = 0; i < 10000; i++) {
  //     sum += Math.random()
  //   }
  // }
  // 将计算的结果传递出去
// postMessage(sum);
// }


onmessage = function (event) {
  console.log("接收到主线程发来的消息", event);
  let para = JSON.parse(event.data);
  countDown(para)
}

function countDown() {
  for (let i = 0; i < 10; i++) {
    postMessage({
      value: i
    });
  }
}
