// pages/service/service.wxml.js
import * as mock from './mock.js'
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(mock)
    this.setData({
      'dataList': mock
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