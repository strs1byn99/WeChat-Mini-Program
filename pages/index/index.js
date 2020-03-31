//index.js
//获取应用实例
const app = getApp()
const DB = wx.cloud.database()
const USER = DB.collection("user")

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: '',
    age: 0,
    list: [{
      "pagePath": "index",
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

  //新增数据
  addData: function() {
    USER.add({
      data: {
        name: this.data.name,
        age: this.data.age
      },
      success: function(res) {
        console.log("success", res)
      },
      fail: function(res) {
        console.log("fail", res)
      }
    })
  },

  addName: function(e) {
    this.data.name = e.detail.value
  },
  addAge: function(e) {
    this.data.age = e.detail.value
  },

  //查询数据
  getData: function() {
    USER.where({
      age: DB.command.lt(11)
      // name: "李四"
    }).get({
      success: function(res) {
        console.log("success", res)
      },
      fail: function(res) {
        console.log("fail", res)
      }
    })
  },

  // tabbar 控制
  tabChange(e) {
    console.log('tab change', e.detail)
    if (e.detail.index == 1) {
      // TODE, should use switchTab to a tabbar page.
      wx.redirectTo({
        url: "/page/service/service"
      })
    } else if (e.detail.index == 2) {
      // TODO
    }
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
