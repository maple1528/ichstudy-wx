<template>
	<view class="content">
		<view class="back" @click="goOff()" :style="{top: scrollTop + 'rpx'}">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="password" :placeholder="getPassword()" v-model="password" 
				placeholder-class="phcolor" @blur="checkPwd()">
		</view>
		<view class="tips">{{tipCheck}}</view>
		<view class="input-box">
			<input type="password" :placeholder="checkPassword()" v-model="checkword" 
				placeholder-class="phcolor" @blur="checkdPwd()">
		</view>
		<view class="tips">{{tipdCheck}}</view>
		<view class="index-btn" @click="check()">{{isLanguage ? 'Check' : '确认'}}</view>
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	import { passwordmailresetdone } from '../../api/user'
	
	export default {
		data() {
			return {
				username: 'luuuuuuu',
				password: '',
				checkword: '',
				tipCheck: '',
				tipdCheck: '',
				language: 1,
				isLanguage: true,
				scrollTop: 0
			}
		},
		onLoad(options) {
			this.username = options.id
			this.getTop()
			this.scrollTop = this.scrollTop * 2 +14
		},
		onShow() {
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
		},
		methods: {
			getPassword() {
				if(this.isLanguage)
					return 'Enter New Password'
				else
					return '请输入新密码'
			},
			checkPassword() {
				if(this.isLanguage)
					return 'Check New Password'
				else
					return '请再次输入新密码'
			},
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({
				});
			},
			getTop() {
			  const that = this
			    wx.getSystemInfo({
			      success: function (res) {
			        that.scrollTop = res.statusBarHeight
			      },
			    });
			},	
			checkPwd(){
				if (this.password == '') {
					this.tipCheck = "请输入新密码"
				}else {
					this.tipCheck = "";
					return true 
				}
			},
			checkdPwd(){
				if (this.checkword == '') {
					this.tipdCheck = "请再次输入密码"
				}else if (this.password != this.checkword) {
					this.tipdCheck = "两次输入密码不一致!"
				}else {
					this.tipdCheck = "";
					return true 
				}
			},
			check(){
				if (this.checkPwd() && this.checkdPwd()){
					passwordmailresetdone(this.username, this.password, this.checkword)
						.then(res => {
							const data = JSON.parse(res.data).endata
							uni.showToast({
								title: data.msg,
								icon: 'none'
							})
							if(data.su === 0) {
								return
							}else{
								uni.navigateTo({
									url: './index'
								})
							}
						})
				}
			}
		}
	}
</script>

<style>
	.back{
		height: 60rpx;
		width: 60rpx;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 100rpx;
		position: fixed;
		left: 18rpx;
		z-index: 999;
	
	}
	
	.arrow-left{
		margin-top: 8rpx;
		margin-left: 4rpx;
		height: 46rpx;
		width: 46rpx;
	}
	
	.bg {
	  width: 100%;
		height: 100%;
	  position: fixed;
	  top: 0;
	  left:0;
	  z-index: -99;
	}
	
	.content {
		padding-top: 32vh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.input-box{
		margin-left: 48rpx;
		margin-top: 24rpx;
	}
	
	.tips{
		color: #FB8539;
		height: 54rpx;
		font-size: 26rpx;
		margin-left: 66rpx;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.forgot-btn{
		width: auto;
		height: auto;
		font-size: 28rpx;
		margin-left: 584rpx;
		margin-top: 22rpx;
		color: #73615D;
	}
	
	.index-btn{
		width: 654rpx;
		height: 84rpx;
		margin-top: 78rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 84rpx;
		margin-left: 48rpx;
	}
</style>
