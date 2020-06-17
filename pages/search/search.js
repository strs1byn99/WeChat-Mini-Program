const app = getApp()
const DB = wx.cloud.database()
const EVT_DETL = DB.collection("event_details")
const CAREER = DB.collection("career")
const ITEMS = DB.collection("items")

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
    // this.getArticles(); // Get all articles
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
    this.setData({
      Source: []
    })
    this.getArticles();
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

  getArticles: function () {  // 获取所有文章: event/career/items
    var big_thing = [], hotlist = [];
    EVT_DETL.orderBy('hits', 'desc').get().then(res => {  
      res.data.forEach(function(x) {
        var icon = (x.icon.length == 0)? "../../image/test.jpg" : x.icon; // if there's no image
        big_thing.push({'title': x.title, 'subTitle': x.subTitle, 'hits': x.hits, 'index': x.index, 'icon': icon, 'type': 'event'});
      })
      CAREER.orderBy('popularity', 'desc').get().then(res => {
        res.data.forEach(function(x) {
          big_thing.push({'title': x.name, 'subTitle': x.type, 'hits': x.popularity, 'index': x._id, 'icon': '../../image/test.jpg', 'type': 'career'});
        })
        ITEMS.orderBy('popularity', 'desc').get().then(res => {
          res.data.forEach(function(x) {
            var icon = (x.img.length == 0)? "../../image/test.jpg" : x.img; // if there's no image
            big_thing.push({'title': x.name, 'subTitle': '$'+x.price, 'hits': x.popularity, 'index': x._id, 'icon': icon, 'type': 'items'});
          })
          console.log(big_thing);
          // Bubble Sort the Source
          for (var i = big_thing.length-1; i >= 0; i--){
            for(var j = 1; j <= i; j++){
              if(big_thing[j-1].hits < big_thing[j].hits) {
                  var aux = big_thing[j-1];
                  big_thing[j-1] = big_thing[j];
                  big_thing[j] = aux;
              }
            }
          }
          console.log(big_thing);
          for (var i = 0; i < 5; i++) {
            hotlist.push(big_thing[i]);
          }   
          this.setData({
            Source: big_thing,
            hotList: hotlist
          })
        }); // items
      }); // career
    }); // event

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
    var sources = [];  // 被搜索词条的匹配结果
    if (inputValue != "") {
      // 搜索算法：获得所有相关词条的title 以匹配字符数量 hits排序 其中匹配字符数量>hits优先级
      this.data.Source.forEach(function (x) {
        var reg = new RegExp(`[${inputValue}]`, 'gi');
        var array = x.title.match(reg);
        if (array != null) {
          sources.push({'data': x, 'len': array.length});
        }
        console.log(array);
      });
      // Bubble Sort the sources
      for (var i = sources.length-1; i >= 0; i--){
        for(var j = 1; j <= i; j++){
          if(sources[j-1].len < sources[j].len) {
              var aux = sources[j-1];
              sources[j-1] = sources[j];
              sources[j] = aux;
          }
        }
      }
      console.log(sources);
      var sourcesDetail = [];
      sources.forEach(function (x) {
        sourcesDetail.push(x.data);
      });
      this.setData({
        sourcesDetail: sourcesDetail
      });
      console.log(this.data.sourcesDetail);
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
    console.info(e);
    var type = e.currentTarget.dataset.type;
    if (type === "career") { // type: career
      wx.navigateTo({
        url: '/pages/service/careerDetail/careerDetail?item_id?' + e.currentTarget.id,
        success: function (res) {
          console.log('success');
        },
        fail: function (res) {
          console.log('navigate to order fail' + res)
          wx.showToast({
            title: '无法进入页面',
            icon: 'none'
          });
        }
      });
    } else if (type === "items") { // type: items
      wx.navigateTo({
        url: "/pages/service/orderDetail/orderDetail?item_id?" + e.currentTarget.id,
        success: function (res) {
          console.log('success');
        },
        fail: function (res) {
          console.log('navigate to order fail' + res)
          wx.showToast({
            title: '无法进入页面',
            icon: 'none'
          });
        }
      });
    } else if (type === "event") { // type: event
      wx.navigateTo({
        url: "/pages/event/eventDetail/eventDetail?index=" + e.currentTarget.id,
        success: function (res) {
          console.log('success');
        },
        fail: function (res) {
          console.log('fail');
          wx.showToast({
            title: '无法进入页面',
            icon: 'none'
          });
        }
      });
    }
    
  }
})
