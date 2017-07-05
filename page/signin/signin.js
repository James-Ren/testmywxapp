var comm = require('../../common/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var sessid = app.globalData.APISESSID
    var openid = wx.getStorageSync('openid');
    if(!sessid){
      if (openid) {
        var url = comm.parseToURL('weixin', 'signin')
        var uinfo = that.data.userInfo
        app.request({
          url: url,
          data: {
            openid: openid
          },
          method: 'GET',
          success: function (res) {
            if (res.data.result == 'OK') {
              if (app.globalData.userInfo) {
                that.setData({
                  userInfo: app.globalData.userInfo
                })
              } else {
                app.getUserInfo(function (userInfo) {
                  that.setData({
                    userInfo: userInfo
                  })
                })
              }
            } else {
              wx.navigateTo({
                url: '../profile/profile'
              })
            }
          }
        })

      }else{
        wx.navigateTo({
          url: '../profile/profile'
        })
     }
    }
    app.getUserInfo(function(userInfo){
      
      that.setData({
        userInfo:userInfo
      })
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