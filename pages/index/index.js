//index.js
//获取应用实例
const app = getApp()



Page({
  data: {
    imgUrls: [
      '../images/c01.jpg',
      '../images/c02.jpg',
      '../images/c03.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  fishpondmanage:function(){
    // var wxcode = wx.getStorageSync('wxcode') 
    // console.log("#####我的微信session为："+wxcode);
      wx.navigateTo({
        url: '../fishpondmanage/fishpondmanage',
      })

  },

  farmerdetail:function(){
    wx.navigateTo({
      url: '../farmerdetail/farmerdetail',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
      

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '重新加载中',
      mask: true,
    })
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了
    var wxcode = wx.getStorageSync('wxcode')
    wx.request({
      url: app.globalData.url + '/api/zyj/checksession', // 仅为示例，并非真实的接口地址
      data: {
        "data": wxcode
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.issuccess == "99999999") {
          that.onLogin();
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

  onLogin:function(){
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

              } else {
                wx.hideLoading();
                wx.showModal({
                  title: '错误提示',
                  content: res.data.msg,
                  showCancel: false
                })
              }

            },
            fail(res) {
              console.log("失败" + res.data)
              wx.hideLoading();
              wx.showModal({
                title: '错误提示',
                content: '发生错误，请重试' + res.data,
                showCancel: false
              })
            },
            complete(res) {
              console.log("最后" + res)
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: '发生错误，请重试' + res.errMsg,
            showCancel: false
          })
        }
      }
    })

  },

})
