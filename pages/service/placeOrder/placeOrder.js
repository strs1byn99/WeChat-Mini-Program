// pages/service/placeOrder/placeOrder.js
const app = getApp()
const DB = wx.cloud.database()
const INFO = DB.collection("CampusCard")
const ORDER = DB.collection("orders")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_name: "",
    item_id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    quantity: 1,
    extra: "",
    openid: ""
  },
  changeName: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  changePhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.name)
  },
  changeEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
    console.log(this.data.name)
  },
  changeAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.name)
  },
  changeQuantity: function (e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.name)
  },
  changeExtra: function (e) {
    this.setData({
      extra: e.detail.value
    })
    console.log(this.data.name)
  },
formSubmit: function(){
  var that = this
  if (!this.data.name || !this.data.phone || !this.data.email || !this.data.address || !this.data.quantity) {
    wx.showToast({
      title: '请确保除备注外所有项目均已填写',
      icon: 'none'
    })
  } else {
    ORDER.add({
      data: {
        name: that.data.name,
        phone: that.data.phone,
        email: that.data.email,
        address: that.data.address,
        quantity: that.data.quantity,
        extra: that.data.extra,
        item_id: that.data.item_id,
        item_name: that.data.item_name,
        time: new Date()
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '已成功提交',
          icon: 'success'
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    })
  }
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      item_id: option.item_id,
      item_name: option.item_name
    })
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res)
        that.setData({
          openid: res.result.openid
        })
        console.log(that.data.openid)
        INFO.where({
          _openid: that.data.openid
        }).get({
          success: response => {
            console.log(response)
            that.setData({
              name: response.data[0].name,
              phone: response.data[0].phone,
              email: response.data[0].email,
              address: response.data[0].address1 + ", " + response.data[0].country
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      fail: err => {
        console.error('[云函数]  调用失败', err)
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
