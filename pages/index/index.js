// pages/index/index.js

const db = wx.cloud.database();
const searchResult = db.collection("searchResult");
// searchResult.add({
//   data: {
//     "title": "AAAA"
//   }
// }); 

Page({
  /**
   * Page initial data
   */
  data: {
    Source: ["weixin", "wechat", "android", "Android", "IOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者工具"],
    bindSource: [],
    history: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.showHistory(); // Get 5 search histories
    this.getArticles(); // Get all article names
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

  getSearchResult: function () {
    
  },

  getArticles: function () {
    searchResult.get().then(res => {
      var data = res.data;
      // setData to Source
    });
  },

  showHistory: function () { // OnLoad function
    searchResult.count().then(res => {
      // console.log(res.total);
      searchResult.skip(res.total-5).limit(5).get().then(res => {
        console.log(res.data);
        // assign to pagedata
      });
    });
  },

  bindinput: function (e) {
    var prefix = e.detail.value;  // real time input
    var sources = []              // automated sources 
    console.log(prefix);
    if (prefix != "") {
      // loop over all sources in Sources (later will update Sources with real data in DB)
      this.data.Source.forEach(function (x) {
        if (x.indexOf(prefix) != -1) {
          console.log(x);
          sources.push(x);
        }
      });
    }
    if (sources.length != 0) {
      this.setData({
        bindSource: sources
      });
      console.log(this.data.bindSource);
    } 
  },

  bindconfirm(event){
    console.log("hello");
    console.log(event.detail.value);
  }
})
