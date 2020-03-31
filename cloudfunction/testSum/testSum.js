const cloud = require('wx-server-sdk')
cloud.init({
  env: 'caa-5aq6j'
})

exports.main = async (event, res) => {
  const res = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'testSum',
    // 传递给云函数的参数
    data: {
      x: 1,
      y: 2,
    }
  })
  // 3
  return res.result
}