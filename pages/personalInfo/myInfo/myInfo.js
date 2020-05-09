// pages/MyInfo/MyInfo.js
const app = getApp()
const DB = wx.cloud.database()
const INFO = DB.collection("userinfo")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "未授权",
    email: "未绑定邮箱",
    image:"/image/13.jpg",
    numEvents: "/",
    numJob: "/",
    numPurchase: "/",
    numShared: "/",
    openid:"",
    exist:false,
    
    list: [{
      "pagePath": "event",
      "text": "活动",
      "iconPath": "/image/test.jpg",
      "selectedIconPath": "/image/test.jpg"
    },
    {
      "pagePath": "service",
      "text": "服务",
      "iconPath": "/image/test.jpg",
      "selectedIconPath": "/image/test.jpg"
    },
    {
      "text": "我的",
      "iconPath": "/image/test.jpg",
      "selectedIconPath": "/image/test.jpg"
    }]
  },
 
  connect: function(e){
    // const url = "pages/personalinfo/connectcard/connectcard"
    wx.navigateTo({
      url: '../connectCard/connectCard',
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },//end of onload
  
  getUserInfo: function (e) {
    console.log(e)
    this.setData({
      username: e.detail.userInfo.nickName,
      email: "未绑定邮箱",
      image: e.detail.userInfo.avatarUrl,
      numEvents: 0,
      numJob: 0,
      numPurchase: 0,
      numShared: 0,
    })
  },
   
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // INFO.add({
    //   data: {
    //     username: this.data.username,
    //     email: this.data.email,
    //     openid: this.data._openid,
    //     numEvents: this.data.numEvents,
    //     numJob: this.data.numJob,
    //     numPurchase: this.data.numPurchase,
    //     numShared: this.data.numShared,
    //   },
    //   success: res => {
    //     console.log('success', res._id)
    //   },
    //   fail: err => {
    //     console.error('fail', err)
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数]  user openid: ', res.result.openid)
        that.setData({
          openid: res.result.openid,
          // console.log('now the openid is ', that.data.openid)
        })
        fail: err => {
          console.error('[云函数]  调用失败', err)
        }
      }
    })//end of callfunction
    DB.collection("connectcard").where({
      _openid: that.data.openid
    }).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          username: res.data[0].name,
          email: res.data[0].email,
          exist: true,
          numEvents: 0,
          numJob: 0,
          numPurchase: 0,
          numShared: 0,
        })
      },
      fail: res => {
        reject(err)
      }
    })//end of get

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

  },
  /**
   * tabbar 控制
   */
  tabChange(e) {
    console.log('tab change', e.detail)
    if (e.detail.index == 1) {
      // TODO, should use switchTab to a tabbar page.
      wx.redirectTo({
        url: "/pages/service/service"
      })
    } else if (e.detail.index == 2) {
      // TODO
      wx.redirectTo({
        url: "/pages/PersonalInfo/MyInfo/MyInfo"
      })
    }
  },
})
