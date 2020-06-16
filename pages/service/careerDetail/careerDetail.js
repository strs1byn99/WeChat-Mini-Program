// pages/service/careerDetail/careerDetail.js
const DB = wx.cloud.database()
const CAREER = DB.collection("career")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    CAREER.where({
      _id: options.id
    }).get({
      success: (res) => {
        console.log(res.data[0])
        that.setData({
          'career': res.data[0]
        })
      }
    })
    CAREER.where({
      _id: options.id
    }).update({
      data:{
        popularity: DB.command.inc(1)
      },
      success: function(res) {
        console.log('success', res)
      },
      fail: function(res) {
        console.log("failed to inc pop", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})