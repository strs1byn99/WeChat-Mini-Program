// pages/service/service.wxml.js
import * as mock from './mock.js'
const DB = wx.cloud.database({throwOnNotFound: false})
const ITEMS = DB.collection("items")
const CAREER = DB.collection("career")
const WELFARE = DB.collection("welfare")
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    }],
    currentSwipe: 0,
    navbarLine: ""  
  },

  // tabbar 控制
  tabChange(e) {
    console.log('tab change', e.detail)
    if (e.detail.index == 0) {
      // TODE, should use switchTab to a tabbar page.
      wx.switchTab({
        url: '/pages/event/event'
      })
    } else if (e.detail.index == 2) {
      // TODO
    }
  },

  navbarChange(e) {
    console.log('navbar', e.currentTarget.id)
    console.log('navbar', e.currentTarget.dataset.current)
    this.setData ({
      'currentSwipe': e.currentTarget.dataset.current
    })
    this.setCurrent(e.currentTarget.dataset.current)
  },
    

  swiperChange(e) {
    this.setData({
      'currentSwipe': e.detail.current
    })
    this.setCurrent(e.detail.current)
  },

  setCurrent(index) {
    index = index.toString()
    switch(index) {
      case '0':
        this.setData({
          'navbarLine': ''
        })
        break
      case '1':
        this.setData({
          'navbarLine': 'navbar-cd'
        })
        break
      case '2':
        this.setData({
          'navbarLine': 'navbar-aw'
        })
        break    
    }
  },

  tapSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toOrder(e) {
    wx.navigateTo({
      url: 'orderDetail/orderDetail?item_id?' + e.currentTarget.id,
      fail: function(res){
        console.log('navigate to order fail' + res)
        wx.showToast({
          title: '无法进入页面',
          icon: 'none'
        })
      }
    })
  },
  toCareer(e) {
    wx.navigateTo({
      url: 'careerDetail/careerDetail?item_id?' + e.currentTarget.id,
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
    ITEMS.get({
      success: (res) => {
        console.log('items', res)
        that.setData({
          'items': res.data
        })
      }
    })
    CAREER.get({
      success: (res) => {
        console.log('career', res)
        that.setData({
          'career': res.data
        })
      }
    })
    WELFARE.get({
      success: (res) => {
        console.log('welfare',res)
        that.setData({
          'welfare': res.data
        })
      }
    })
    console.log(this.data)
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