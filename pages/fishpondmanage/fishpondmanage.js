// pages/fishpondmanage/fishpondmanage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.getFishPonds();

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
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.getFishPonds();
    // setTimeout(function () {
    //   wx.hideLoading();
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 3000)
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

  },


  bindViewTap11: function (event) {
    console.log(event.currentTarget.id);
    console.log(event.currentTarget.tagName);
    console.log(event.currentTarget.dataset);
  },
  getFishPonds: function () {

    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了
    var wxcode = wx.getStorageSync('wxcode') 
    wx.request({
      url: app.globalData.url+'/api/zyj/fishponds/query', // 仅为示例，并非真实的接口地址
      data: {
        "data": wxcode
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.issuccess==1){
          that.setData({
            grids: res.data.data,
          })
        }else{
          wx.showModal({
            title: '错误提示',
            content: res.data.msg,
          })
        }
          
      },
      fail(res) {
        console.log(res.data)
      },
      complete(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })

  },

})