// pages/service/orderDetail/orderDetail.js
const app = getApp()
const DB = wx.cloud.database()
const ITEMS = DB.collection("items")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  toBuy() {
    var that = this
    wx.navigateTo({
      url: '../placeOrder/placeOrder?item_id=' + that.data.item._id + '&item_name=' + that.data.item.name,
      fail: function(res){
        console.log('navigate to career fail' + res)
        wx.showToast({
          title: '无法进入页面',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    ITEMS.where({
      _id: options.id
    }).get({
      success: (res) => {
        console.log(res.data[0])
        that.setData({
          'item': res.data[0]
        })
      }
    })
    ITEMS.where({
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
