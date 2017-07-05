

var WxParse = require('../../common/wxParse.js');
// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "detail",
  /**
   * 页面的初始数据
   */

  data: {
    product_id: '',
    detail_data:[],
    detail_desc:'',
    carts: [{ cid: 1008, title: 'Macbook Air', image: 'https://img13.360buyimg.com/n7/jfs/t2191/334/2921047884/217714/eb1dd389/571f1329Ne4122e4c.jpg', num: '1', price: '6968.0', sum: '6968.0', selected: true }
      ]
  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    
    if (!opt.id) opt.id = 4122
    if (opt.id){
      var p_id = opt.id;
      var app = getApp();
      var that = this;
      that.setData({
        carts: app.globalData.carts
      })
      wx.request({
        url: app.domain + '/api/product/detail',
        dataType: 'json',
        data: {
          id: p_id
        },
        method: 'GET',
        success: function (res) {
          var detail = res.data.data.description;
          WxParse.wxParse('detail_desc', 'html', detail, that, 0);
          
          that.setData({
            detail_data: res.data.data,
            product_id:p_id
          })
        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          console.log('complete!');
        }
      })

    }else{
      wx.navigateBack()
    }
  },
  goshop(event) {
    var that = this;
    var carts = that.data.carts
    var cart_index = carts.length
    var detail_data = that.data.detail_data
    var hadInCart = false
    if (cart_index>0){
      for (var i = 0; i < cart_index; i++) {
        if (carts[i].cid == detail_data.id) {
          carts[i].num += 1;
          hadInCart = true
        }
      }
      
    } 
    if (hadInCart == false) {
      var send_data = {
        cid: detail_data.id,
        title: detail_data.name,
        image: detail_data.feature_img,
        num: 1,
        price: detail_data.price,
        sum: detail_data.price,
        selected: true
      }
      carts.push(send_data)
    }
    console.log(carts)
    app.globalData.carts = carts
    wx.switchTab({
      url: `../cart/cart`
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
    
  }


  
})

