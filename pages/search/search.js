const app = getApp()
const DB = wx.cloud.database()
const searchResult = DB.collection("searchResult")
const EVT_DETL = DB.collection("event_details")


var arrayHeight = 0;
Page({
  /**
   * Page initial data
   */
  data: {
    Source: [], // 所有词条
    // Source: ["weixin", "wechat", "android", "Android", "IOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者工具"],  
    sourcesDetail: [], // 被搜索/被展示词条的详细信息
    bindSource: [], // 联想词条
    inputValue: '', // 文本框数据
    hotList:[],  // 热门搜索
    showHotList: 1
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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

  getHotList: function () {
    EVT_DETL.orderBy('hits', 'desc').get().then(res => {  // 应取所有数据中的点击率最高的文章 limit()
      var hotlist = [];
      for (var i = 0; i < 5; i++) {
        hotlist.push(res.data[i]);
      }
      this.setData({
        hotList: hotlist
      });
      console.log(this.data.hotList);
    });
  },

  getArticles: function () {
    EVT_DETL.orderBy('hits', 'desc').get().then(res => {  // 获取所有文章/Event
      this.setData({
        Source: res.data
      });
      console.log(this.data.Source);
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
        var xtitle = x.title;
        var xlow = xtitle.toLowerCase();
        if (xlow.indexOf(prefix.toLowerCase()) != -1) {
          console.log(x.title);
          sources.push(x.title);
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

  cancel: function(pageUrl) {
    this.setData({
      inputValue: '',  // clear inputValue
      bindSource: [],
      showHotList: 1
    });
  },

  search: function (inputValue) {
    var sources = [];  // 被搜索词条的匹配结果的所有title
    if (inputValue != "") {
      // 搜索算法
      // 获得所有相关词条的title 以hits排序
      this.data.Source.forEach(function (x) {
        var reg = new RegExp(`[${inputValue}]`, 'gi');
        var array = x.title.match(reg);
        if (array != null) {
          sources.push(x);
        }
        console.log(array);
      });
      console.log(sources);
      this.setData({
        sourcesDetail: sources
      });
      if (sources.length == 0) {
        this.setData({showHotList: 2});
      }
    } else {
      this.setData({
        showHotList: true
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
    // 去搜索结果页 confirm
    this.search(this.data.inputValue);
  },

  confirm: function (e) {
    this.setData({showHotList: 0});
    console.log(e.detail.value);  // 搜索词条
    this.setData({
      inputValue: e.detail.value,
      bindSource: []
    });

    // 去搜索结果页 confirm
    this.search(this.data.inputValue);
  },

  jumpDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: "/pages/event/eventDetail/eventDetail?index=" + e.currentTarget.id,
      success: function (res) {
        console.log('success');
      },
      fail: function (res) {
        console.log('fail');
      }
    });
  }
})
