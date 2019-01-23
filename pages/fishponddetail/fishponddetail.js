// pages/fishponddetail/fishponddetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fishpondid: '',
    fishpondname:'',
    fishpondaddr:''
  },

  aeratoradd:function(){
    wx.navigateTo({
      url: '../aeratoradd/aeratoradd'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      fishpondid: options.fishpondid,
      fishpondname: options.fishpondname,
      fishpondaddr: options.fishpondaddr
    })
    console.log("接收的fishpondid是" + that.data.fishpondid)
    console.log("接收的fishpondname是"+ that.data.fishpondname)
    console.log("接收的fishpondaddr是" + that.data.fishpondaddr)


    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.getAerators();
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
    // console.log("我目前的id是" + this.data.id)
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

  },

  getAerators: function () {

    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了

    wx.request({
      url: app.globalData.url + '/api/zyj/aerators/query', // 仅为示例，并非真实的接口地址
      data: {
        x: '1',
        y: '2'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data),
          that.setData({
            grids: res.data.datas,
          })
        wx.hideLoading();
      },
      fail(res) {
        console.log(res.data)
        wx.hideLoading();
      },
      complete(res) {
        wx.hideLoading();
        //wx.stopPullDownRefresh() //停止下拉刷新
      },
    })

  },
})