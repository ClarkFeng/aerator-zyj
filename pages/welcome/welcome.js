// pages/welcome/welcome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  gotoindex:function(){

    console.log("#########登录一次");
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.clearStorageSync()
          // 发起网络请求
          wx.request({
            url: app.globalData.url + '/api/zyj/onLogin',
            method: 'POST',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data);
              if (res.data.issuccess == 1) {

                wx.setStorageSync('wxcode', res.data.data.code);
                console.log("当前登录的wxcode" + res.data.data.code);
                wx.hideLoading();
                wx.navigateTo({
                  url: '../index/index'
                })
              }else{
                wx.hideLoading();
                wx.showModal({
                  title: '错误提示',
                  content: res.data.msg,
                })
              }

            },
            fail(res) {
              console.log("失败" + res.data)
              wx.hideLoading();
              wx.showModal({
                title: '错误提示',
                content: '发生错误，请重试'+res.data.msg,
              })
            },
            complete(res) {
              console.log("最后" + res.data)
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: '发生错误，请重试' + res.data.msg,
          })
        }
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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