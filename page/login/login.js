
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '用户登录',
    userInfo: {},
    userName: '',
    userPassword: '',
    boo: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  logIn: function () {
    var that = this
    var openid = wx.getStorageSync('openid');

    app.request({
      url: app.domain + '/api/weixin/dologin',
      data:{
        username: this.data.userName,
        password: this.data.userPassword,
        openid: openid
      },
      method: 'POST',
      success: function(res){
        if (res.data.result=='OK'){
          app.globalData.APISESSID = res.data.APISESSID;
          console.log(res.data)
          wx.switchTab({
            url: `../signin/signin`
          })
        }else{
          wx.showToast({
            title: '帐号或密码错误！'
          })
        }
        
      }
    })

  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    console.log('index is show')
  },
  shuaxin: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onReady: function () {
    console.log('indx is on ready')
  },
  onHide: function () {
    console.log('index is on hide')
  },
  onUnload: function () {
    console.log('indx is on unload')
  },
  boo: function () {
    this.setData({
      boo: !this.data.boo
    });
  }


})