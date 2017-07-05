
var comm = require('../../common/common.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "discover",
  /**
   * 页面的初始数据
   */

  data: {
    products: [],
    products_cate: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.domain + '/api/product/list',
      data: {
        list_num: 6,
        product_category: 0
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          products: res.data.data
        })
      },
      fail: function () {
        console.log('fail');
      },
      complete: function () {
        console.log('complete!');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    //app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
})

