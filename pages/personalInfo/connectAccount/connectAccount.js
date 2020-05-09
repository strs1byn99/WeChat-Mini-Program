// pages/personalinfo/connectcard/connectcard.js
const app = getApp()
const DB = wx.cloud.database()
const CARDINFO = DB.collection("connectcard")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyIcon: '/image/codeImg.jpg',
    name: '',
    email: '',
    openid: '',
    repetition: false,
  },

  addName: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  addEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
    console.log(this.data.email)
  },

  signUp: function () {
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
    })

    var p1 = new Promise((resolve, reject) => {
      CARDINFO.where({
        _openid: that.data.openid
      }).get({
        success: res => {

          console.log(res)
          resolve(res)
        },
        fail: res => {
          reject(err)
        }
      })
    })
    p1.then(res => {
      if (res.data.length >= 1) {
        wx.showToast({
          title: '此用户已绑定',
          icon: 'success',

          duration: 5000//持续的时间
        })
      }
      else {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 5000//持续的时间
        })
        CARDINFO.add({
          data: {
            name: that.data.name,
            email: that.data.email
          },
          success: res => {
            console.log('success', err)
          },

          fail: err => {
            console.error('fail', err)
          }
        })
      }

    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
