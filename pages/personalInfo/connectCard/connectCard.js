// pages/personalinfo/connectcard/connectcard.js
const app = getApp()
const DB = wx.cloud.database()
const INFO = DB.collection("CampusCard")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolltop:null,
    index0:'',
    index1: '',
    index2: '',
    name:'',
    gender:'',
    phone:'',
    email:'',
    weChatId:'',
    country:'',
    address1:'',
    address2:'',
    schoolProgram:'',
    degree:'',
    studentId:'',
    gradDate:'',
    major1:'',
    major2:'',
    openid:'',
    counterid:'',
    array0: ['<--请选择性别-->','男','女'],
    objectArray: [
      {
        id: 0,
        name: '<--请选择性别-->'
      },
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      },
     
    ],
     array1: ['本科生', '研究生', '转学生', '访问学者'],
    objectArray: [
      {
        id: 0,
        name: '本科生'
      },
      {
        id: 1,
        name: '研究生'
      },
      {
        id: 2,
        name: '转学生'
      },
      {
        id: 3,
        name: '转学生'

      },

    ],
    array2: ['本科', '硕士', '博士', '博士后'],
    objectArray: [
      {
        id: 0,
        name: '本科'
      },
      {
        id: 1,
        name: '硕士'
      },
      {
        id: 2,
        name: '博士'
      },
      {
        id: 3,
        name: '博士后'

      },

    ],
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  bindProgramPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    this.setData({
      index1: e.detail.value,
      schoolProgram: this.data.array1[e.detail.value],
      
    })
    console.log(this.data.schoolProgram)
  },
  bindDegreePickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
      degree: this.data.array2[e.detail.value]
    })
  },
  bindGenderPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index0: e.detail.value,
      gender: this.data.array0[e.detail.value]
    })
  
  },

  addName: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  addPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  addEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
    console.log(this.data.email)
  },
 addWeID: function (e) {
    this.setData({
      weChatId: e.detail.value
    })
    console.log(this.data.weChatId)
  },
  addCountry: function (e) {
    this.setData({
      country: e.detail.value
    })
    console.log(this.data.country)
  },
  addAddress1: function (e) {
    this.setData({
      address1: e.detail.value
    })
    console.log(this.data.address1)
  },
  addAddress2: function (e) {
    this.setData({
      address2: e.detail.value
    })
    console.log(this.data.address2)
  },
  addStudentId: function (e) {
    this.setData({
      studentId: e.detail.value
    })
    console.log(this.data.studentId)
  },
  addGradDate: function (e) {
    this.setData({
      gradDate: e.detail.value
    })
    console.log(this.data.gradDate)
  },
  addMajor1: function(e) {
    this.setData({
      major1: e.detail.value
    })
    console.log(this.data.major1)
  },
  addMajor2: function (e) {
    this.setData({
      major2: e.detail.value
    })
    console.log(this.data.major2)
  },

connect: function(){
  var that = this
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log(res)
     // console.log('[云函数]  user counterid: ', res.result._id)
      that.setData({
        openid: res.result.openid,
      //  counterid: res.data.id,
      })
      fail: err => {
        console.error('[云函数]  调用失败', err)
      }
    }
  })
  var p1 = new Promise((resolve, reject) => {
    INFO.where({
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
      //如果openid存在就把全部的在上传一次
        INFO.doc(that.data.counterid).update({
          data:{
          name: that.data.name,
          email: that.data.email,
          gender: that.data.gender,
          phone: that.data.phone,
          weChatId: that.data.weChatId,
          country: that.data.country,
          address1: that.data.address1,
          address2: that.data.address2,
          schoolProgram: that.data.schoolProgram,
          degree: that.data.degree,
          studentId: that.data.studentId,
          gradDate: that.data.gradDate,
          major1: that.data.major1,
          major2: that.data.major2,
          index0: that.data.index0,
          index1: that.data.index1,
          index2: that.data.index2,

          }
      }),
         
      wx.showToast({
        title: '信息已修改',
        icon: 'success',

        duration: 2000//持续的时间
      })
    }
    else {
      INFO.add({
        data: {
          name: that.data.name,
          email: that.data.email,
          gender: that.data.gender,
          phone: that.data.phone,
          weChatId: that.data.weChatId,
          country: that.data.country,
          address1: that.data.address1,
          address2: that.data.address2,
          schoolProgram: that.data.schoolProgram,
          degree: that.data.degree,
          studentId: that.data.studentId,
          gradDate: that.data.gradDate,
          major1: that.data.major1,
          major2: that.data.major2, 
          index0: that.data.index0,
          index1: that.data.index1,
          index2: that.data.index2,
        },
        success: res => {
          console.log('success', err),
            wx.showToast({
              title: '信息添加成功',
              icon: 'success',
              duration: 2000//持续的时间
            })
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
    INFO.where({
      _openid: that.data.openid
    }).get({
      success: res => {
        console.log(res)
        that.setData({
          name: res.data[0].name,
          email: res.data[0].email,
          gender: res.data[0].gender,
          phone: res.data[0].phone,
          weChatId: res.data[0].weChatId,
          country: res.data[0].country,
          address1: res.data[0].address1,
          address2: res.data[0].address2,
          schoolProgram: res.data[0].schoolProgram,
          degree: res.data[0].degree,
          studentId: res.data[0].studentId,
          gradDate: res.data[0].gradDate,
          major1: res.data[0].major1,
          major2: res.data[0].major2,
          counterid: res.data[0]._id,
          index0: res.data[0].index0,
          index1: res.data[0].index1,
          index2: res.data[0].index2,

        })
      },
      fail: res => {
        reject(err)
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
