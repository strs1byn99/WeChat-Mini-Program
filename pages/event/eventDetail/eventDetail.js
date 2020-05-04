// pages/eventDetail/eventDetail.js
const app = getApp()
const DB = wx.cloud.database()
const EVENT = DB.collection("event")
const EVENT_DETAILS = DB.collection("event_details")
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
    EVENT_DETAILS.where({
      index: options.index
    }).get({
      success: function(res) {
        // console.log(options)
        console.log(res)
        that.setData({
          eventDetails: res.data[0]
        })
        // console.log(that.data)
      },
      fail: function(res) {
        console.log("event details fail", res)
      }
    })

    EVENT_DETAILS.where({
      index: options.index
    }).update({
      data:{
        hits: DB.command.inc(1)
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log("event details fail", res)
      }
    })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // EVENT_DETAILS.add({
    //   data: {
    //     icon: '',
    //     index: '1',
    //     title:'校园会聚餐',
    //     subTitle:'70元以下 综合',
    //     image: '',
    //     descriptions1:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6',
    //     descriptions2:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //     descriptions3:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //     time:'12:00-22:00',
    //     address:'xxxxxxxxxxxxxxxxx',
    //     phone:'xxxxxxxxxxxxxxx',
    //     tag:''
        
    //   },
    //   success: function(res) {
    //     console.log("success", res)
    //   },
    //   fail: function(res) {
    //     console.log("fail", res)
    //   }
    // })
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
    wx.updateShareMenu({
      withShareTicket: true,
      success: function(res){
        console.log(res)
      }
    })
  }
})