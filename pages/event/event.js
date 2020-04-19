// pages/event/event.js
const app = getApp()
const DB = wx.cloud.database()
const EVENT = DB.collection("event")
const TOP_EVENT = DB.collection("top_event")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topEvent: [{
      // "title": '',
      // "member": '',
      // "description": '',
      // "image": ''
    },
    {
      // "title": '',
      // "member": '',
      // "description": '',
      // "image": ''
    },
    {
      // "title": '',
      // "member": '',
      // "description": '',
      // "image": ''
    },
    {
      // "title": '',
      // "member": '',
      // "description": '',
      // "image": ''
    },
    { 
      // "title": '',
      // "member": '',
      // "description": '',
      // "image": ''
    }],
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
    caseList:[{
      
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    }]
  },

  jumpDetail:function(e){
    wx.navigateTo({
      url: "/pages/event/eventDetail/eventDetail",
      success: function(res){
        console.log('success')
      },
      fail: function(res){
        console.log('fail')
        console.log(res)
      }
    })
  },
  increaseLike: function(e){
    var that = this;
    var index = e.target.dataset.index;
    console.log(index);
    if(that.data.caseList[index].liked == true){
      EVENT.where({
        identi: DB.command.eq(index)
      }).update({
        data:{
          likeNum: DB.command.inc(-1),
          liked: false
        },
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log("fail", res)
        }
      })
    }
    else{
      EVENT.where({
        identi: DB.command.eq(index)
      }).update({
        data:{
          likeNum: DB.command.inc(1),
          liked: true
        },
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log("fail", res)
        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // EVENT.add({
    //   data: {
    //     icon: '',
    //     header: 'XXX 活动 【活动名字】',
    //     subHeader: 'XXX 社团',
    //     descriptionText1: 'fffffffffffffffffffffffffffffffffffff',
    //     descriptionText2: 'fffffffffffffffffffffffffffffffffffff.',
    //     likeNum: 100, 
    //     commentNum: 100,
    //     identi: 4
    //   },
    //   success: function(res) {
    //     console.log("success", res)
    //   },
    //   fail: function(res) {
    //     console.log("fail", res)
    //   }
    // })

    var that = this
    TOP_EVENT.where({
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          topEvent: res.data,
        })
        console.log(that.data)
      },
      fail: function(res) {
        console.log("fail", res)
      }
    }),
    EVENT.where({
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          caseList: res.data
        })
        console.log(that.data)
      },
      fail: function(res) {
        console.log("fail", res)
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
    }
  },


})