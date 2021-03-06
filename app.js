var config = require('./common/config.js');
App({
  domain: config.domain,
  onLaunch: function(options){
    var openid = wx.getStorageSync('openid');
    if (openid) {
      console.log('oid:'+openid);
    }else{
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log('res_code:' + res.code);
            //发起网络请求
            wx.request({
              url: config.domain + '/api/weixin/get_wxaopenid',
              dataType: 'json',
              data: {
                code: res.code
              },
              method: 'GET',
              success: function (res) {
                if (!res.data.errcode){
                  console.log('launch_get:'+res.data.openid);
                  wx.setStorageSync('openid', res.data.openid);
                  wx.setStorageSync('session_key', res.data.session_key);
                }else{
                  console.log(res.data);
                }
              },
              fail: function () {
                console.log('request fail!');
              },
              complete: function () {
                console.log('request complete!');
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }, 
  request: function (obj) {
    var that = this;
    obj.data.APISESSID = this.globalData.APISESSID || ''
    console.log(obj.data);
    //obj.data.APISESSID = '123';

    // This must be wx.request !
    wx.request({
      url: obj.url,
      data: obj.data,
      method: obj.method||'GET',
      header: {
        'content-type': obj.method = 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
      },
      success: function (res) {
        console.log(res);
        typeof obj.success == "function" && obj.success(res)
        if (!that.globalData.APISESSID && res.data.APISESSID) that.globalData.APISESSID = res.data.APISESSID;
      },
      fail: obj.fail || function () { },
      complete: obj.complete || function () { }
    })
  },
  globalData: {
    userInfo: null,
    APISESSID: null,
    carts:[]
  }
})