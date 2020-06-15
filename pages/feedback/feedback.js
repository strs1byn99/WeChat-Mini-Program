// pages/feedback/feedback.js
const app = getApp()
const DB = wx.cloud.database()
const FB = DB.collection("feedback")

Page({

  /**
   * Page initial data
   */
  data: {
    fb_input: "",
    wc_input: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  bind_fb_input: function (e) {
    var input = e.detail.value;
    if (input.length < 10) {
      console.log("feedback too short");
    } 
    this.setData({fb_input: input});
  },

  bind_wc_input: function (e) {
    var input = e.detail.value;
    if (input.length == 0) {
      console.log("wechat number empty");
      this.setData({wc_input: ""});
    } else {
      this.setData({wc_input: input});
    }
  },

  submit: function () {
    console.log(this.data.fb_input);
    console.log(this.data.wc_input);
    if (this.data.fb_input.length>=10 && this.data.wc_input.length>0) {
      FB.add({
        data: {
          text: this.data.fb_input,
          wechat: this.data.wc_input
        },
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 2000
          });
        }
      });
      this.setData({fb_input: "", wc_input: ""});
    } else if (this.data.fb_input.length < 10) {
      wx.showToast({
        title: '反馈内容不少于10个字',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '微信号不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    
  }
})