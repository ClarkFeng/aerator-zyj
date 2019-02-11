//app.js
App({
  onLaunch: function () {

    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了',
              content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
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
            url: this.globalData.url + '/api/zyj/onLogin',
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
            showCancel:false
          })
        }
      }
    })



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {

    url:"http://fyd0108.xicp.io",
    userInfo: null,
    userSign: null,
    
  }
})