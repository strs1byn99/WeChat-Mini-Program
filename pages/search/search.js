const db = wx.cloud.database();
const searchResult = db.collection("searchResult");
const topEvent = db.collection("top_event");
// searchResult.add({
//   data: {
//     "title": "AAAA"
//   }
// }); 

var arrayHeight = 0;
Page({
  /**
   * Page initial data
   */
  data: {
    Source: ["weixin", "wechat", "android", "Android", "IOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者工具"],  // 所有词条
    bindSource: [], // 绑定到页面的数据，根据用户输入动态变化
    history: [],  // 历史记录，暂不投入使用
    inputValue: '', // 文本框数据
    hotList:[]  // 热门搜索
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.showHistory(); // Get 5 search histories
    this.getHotList(); // Get hot articles
    this.getArticles(); // Get all articles
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

  getHotList: function () {
      topEvent.limit(5).get().then(res => {  // 应取所有数据中的点击率最高的文章 limit()
      this.setData({
        hotList: res.data
      });
      console.log(this.data.hotList);
    });
  },

  getArticles: function () {
    topEvent.get().then(res => {  // 获取所有文章
      var new_sources = this.data.Source;
      res.data.forEach(function (x) {
        new_sources.push(x.description)
      });
      this.setData({
        Source: new_sources
      });
      console.log(this.data.Source);
    });
  },

  showHistory: function () { // OnLoad function
    searchResult.count().then(res => {
      // console.log(res.total);
      searchResult.skip(res.total-5).limit(5).get().then(res => {
        console.log(res.data);
        this.setData({
          history: res.data
        });
      });
    });
  },

  bindinput: function (e) {
    var prefix = e.detail.value;  // 实时输入
    var sources = []              // 匹配结果
    console.log(prefix);
    this.setData({
      inputValue: e.detail.value
    });
    if (prefix != "") {
      // loop over all sources in Sources (later will update Sources with real data in DB)
      this.data.Source.forEach(function (x) {
        var xlow = x.toLowerCase();
        if (xlow.indexOf(prefix.toLowerCase()) != -1) {
          console.log(x);
          sources.push(x);
        }
      });
    }
    if (sources.length != 0) {
      this.setData({
        hideScroll: false,
        bindSource: sources,
        arrayHeight: sources.length*18
      });
      console.log(this.data.bindSource);
    } else {
      this.setData({
        hideScroll: true,
        bindSource: []
      });
    }
  },

  itemtap: function (e) {
    console.log(e);
    this.setData({
      inputValue: e.target.id,
      hideScroll: true,
      bindSource: []
    });
    // go to specific page
  },

  cancel: function() {
    this.setData({
      inputValue: '',  // clear inputValue
      bindSource: []
    });
  },

  confirm: function (e) {
    console.log(e.detail.value);  // 搜索词条
    var sources = []              // automated sources 
    console.log(prefix);
    this.setData({
      inputValue: e.detail.value,
      bindSource: []
    });
    // searchResult.add({            // 加入搜索历史
    //   data: {
    //     "title": this.data.inputValue
    //   }
    // });
    var prefix = this.data.inputValue;
    if (prefix != "") {
      // 搜索算法
    }
  },

  gotoResult: function (e) {
    // go to specific page
    console.log(this.data.inputValue);
  }
})
