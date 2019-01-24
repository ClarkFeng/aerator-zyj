// pages/aeratoradd/aeratoradd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    nameinput: "",
    addrinput: "",
    fishpondid: ""
  },

  getnameinput: function (e) {
    this.setData({
      nameinput: e.detail.value
    })
  },

  /**
 * 统计用户详细地址字数
 */
  getaddrinput: function (e) {
    // console.log("输入的内容---" + e.detail.value)
    // console.log("输入的长度---" + e.detail.value.length)
    this.setData({
      length: e.detail.value.length,
      addrinput: e.detail.value
    })

  },

  aeratorsave:function(){
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了
    var myname = that.data.nameinput;
    var myaddr = that.data.addrinput;
    if (myname == "" || myaddr == "") {
      wx.showModal({
        title: '错误提示',
        content: '请输入增氧机名称和增氧机方位描述',
      })
      return;

    }

    wx.showLoading({
      title: '保存中',
      mask: true,
    })

    var wxcode = wx.getStorageSync('wxcode');
    wx.request({
      url: app.globalData.url + '/api/zyj/aerators/add', // 仅为示例，并非真实的接口地址
      data: {
        "data": wxcode,
        "nameinput": myname,
        "addrinput": myaddr,
        "fishpondid": that.data.fishpondid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        // console.log(res.data)
        if (res.data.issuccess == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  url: '../fishponddetail/fishponddetail',
                })
              }, 2000)//延迟时间
            }
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
        // console.log(res.data)
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
    var that = this;
    that.setData({
      fishpondid: options.fishpondid
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