// pages/fishpondadd/fishpondadd.js
const app = getApp()
Page({
  /**
  * 页面的初始数据
  */
  data: {
    length: 0,
    nameinput: "",
    addrinput: "",
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


  savefishpond:function(){
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess                         直接写this就变成了wx.request()的this了
    var myname = that.data.nameinput;
    var myaddr = that.data.addrinput;
    if (myname == "" || myaddr==""){
      wx.showModal({
        title: '错误提示',
        content: '请输入鱼塘名称和鱼塘描述',
      })
      return;

    }

    wx.showLoading({
      title: '保存中',
      mask: true,
    })

    var wxcode = wx.getStorageSync('wxcode');
    wx.request({
      url: app.globalData.url + '/api/zyj/fishponds/add', // 仅为示例，并非真实的接口地址
      data: {
        "data": wxcode,
        "nameinput": myname,
        "addrinput": myaddr
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
                  url: '../index/index',
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

});