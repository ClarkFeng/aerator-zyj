// pages/farmerdetail/farmerdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    codeinput:"",
    nameinput: "",
    telinput: "",
    mailinput: "",
    addrinput: "",
  },

  /**
   * 点击头像
   */
  chooseimage:function(){

  },

  getnameinput: function (e) {
    this.setData({
      nameinput: e.detail.value
    })
  },

  gettelinput: function (e) {
    this.setData({
      telinput: e.detail.value
    })
  },

  getmailinput: function (e) {
    this.setData({
      mailinput: e.detail.value
    })
  },

  /**
   * 统计用户详细地址字数
   */
  getaddrinput:function(e){
      // console.log("输入的内容---" + e.detail.value)
      // console.log("输入的长度---" + e.detail.value.length)
      this.setData({
        length: e.detail.value.length,
        addrinput: e.detail.value
      })

  },



  /**
   * 租户信息保存
   */
  farmersave:function(){
    wx.showLoading({
      title: '保存中',
      mask: true,
    })
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了
    var wxcode = wx.getStorageSync('wxcode');
    wx.request({
      url: app.globalData.url + '/api/zyj/farmer/update', // 仅为示例，并非真实的接口地址
      data: {
        "data": wxcode,
        "nameinput": that.data.nameinput,
        "telinput": that.data.telinput,
        "mailinput": that.data.mailinput,
        "addrinput": that.data.addrinput
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.issuccess == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            mask: true
          });
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: res.data.msg,
          })
        }
      },
      fail(res) {
        console.log(res.data)
        wx.hideLoading();
      },
      complete(res) {
        // wx.hideLoading();
        //wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了
    var wxcode = wx.getStorageSync('wxcode');
    wx.request({
      url: app.globalData.url + '/api/zyj/farmer/query', // 仅为示例，并非真实的接口地址
      data: {
        "data": wxcode
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.issuccess == 1){
          that.setData({
            codeinput: res.data.data.codeinput,
            nameinput: res.data.data.nameinput,
            telinput: res.data.data.telinput,
            mailinput: res.data.data.mailinput,
            addrinput: res.data.data.addrinput,
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: res.data.msg,
          })
        }
      },
      fail(res) {
        console.log(res.data)
        wx.hideLoading();
      },
      complete(res) {
        // wx.hideLoading();
        //wx.stopPullDownRefresh() //停止下拉刷新
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