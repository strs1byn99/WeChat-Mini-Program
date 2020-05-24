// pages/event/event.js
const app = getApp()
const DB = wx.cloud.database()
const EVENT = DB.collection("event")
const EVENT_DETAILS = DB.collection("event_details")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "pagePath": "event",
      "text": "活动",
      "iconPath": "/image/home.png",
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
      "iconPath": "/image/people.png",
      "selectedIconPath": "/image/test.jpg"
    }],
    topEvent: [{
    },
    {
    },
    {
    },
    {
    },
    { 
    }],
    currentSwipe: 0,
    navbarLine: ""  
  },

  jumpDetail:function(e){
    wx.navigateTo({
      // url: "/pages/event/eventDetail/eventDetail?index=" + e.currentTarget.dataset.index,
      url: "/pages/event/eventDetail/eventDetail?index=" + e.currentTarget.id,
      success: function(res){
        // console.log('success' + e)
      },
      fail: function(res){
        console.log('navigate to eventDetail fail' + res)
      }
    })
  },

  search(e){
    wx.navigateTo({
      url: "/pages/search/search",
      success: function(res){
        // console.log('success')
      },
      fail: function(res){
        console.log('navigate to search page fail')
      }
    })
  },

  swiperChange(e){
    this.setData ({
      'currentSwipe': e.detail.current
    })
    this.setCurrent(e.detail.current)
  },
  navbarChange(e){
    this.setData ({
      'currentSwipe': e.currentTarget.dataset.current
    })
    this.setCurrent(e.currentTarget.dataset.current)
  },

  setCurrent(index){
    if(index == 0)
    {
      this.setData({
        'navbarLine': ''
      })
    }
    else{
      this.setData({
        'navbarLine': 'navbar-1'
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    EVENT.where({
      topEvent: {
        isTop: true,
        locations: "all"
      }
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          topEvent: res.data,
        })
        // console.log(that.data)
      },
      fail: function(res) {
        console.log("top_event getting all events fail", res)
      }
    }),
    EVENT.where({
      topEvent: {
        isTop: true,
        locations: "alumni"
      }
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          topEvent1: res.data,
        })
        // console.log(that.data)
      },
      fail: function(res) {
        console.log("top_event getting alumni events fail", res)
      }
    }),
    EVENT.where({
      bottomEvent: {
        isAll: true
      }
    }).get({
      success: function(res) {
        // console.log(res.data)
        that.setData({
          allEvent: res.data
        })
        // console.log(that.data)
      },
      fail: function(res) {
        console.log("bottom event getting all events fail", res)
      }
    }),
    EVENT.where({
      bottomEvent: {
        isAlumni: true
      }
    }).get({
      success: function(res) {
        // console.log(res.data)
        that.setData({
          alumniEvent: res.data
        })
        // console.log(that.data)
      },
      fail: function(res) {
        console.log("bottom event getting alumni events fail", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // EVENT.add({
    //   data: {
    //     image: '',
    //     member: 'YYY 活动 【活动名字】',
    //     title: 'YYY 社团',
    //     description: '暑假来了，一起庆祝吧',
    //     description1: 'YYYYYYYYYYYYYYYYYYYYYYYYY.',
    //     "topEvent": {
    //       "isTop": true,
    //       "locations": "alumni"
    //     }
    //   },
    //   success: function(res) {
    //     console.log("success", res)
    //   },
    //   fail: function(res) {
    //     console.log("fail", res)
    //   }
    // })

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

    // EVENT_DETAILS.add({
    //     data: {
    //       icon: '',
    //       image: '',
    //       index: 'topAlumni',
    //       phone: 'xxxxxxxxxxxxxxx',
    //       address: 'xxxxxxxxxxxxxxxxx',
    //       descriptions1: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxY',
    //       descriptions2:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //       descriptions3: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //       subTitle: '70元以下 综合',
    //       tag: '',
    //       time: '12:00-22:00',
    //       title: '校园会聚餐'
    //     },
    //     success: function(res) {
    //       console.log("success", res)
    //     },
    //     fail: function(res) {
    //       console.log("fail", res)
    //     }
    //   })
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
        // url: "/pages/service/service"
      })
    } else if (e.detail.index == 2) {
      // TODO
      wx.redirectTo({
        // url: "/pages/PersonalInfo/PersonalInfo"
      })
    }
  },
})



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