<template>
	<view class="content">
		<view class="back" @click="goOff()"  :style="{top: scrollTop + 'rpx'}">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="text" :placeholder="getEP()" v-model="ep" 
				placeholder-class="phcolor" @blur="checkEP()">
		</view>
		<view class="tips">{{tip}}</view>
		<view class="identify-code">
			<view class="identify-box">
				<input
					type="text"
					:placeholder="getVer()"
					v-model="ver"
					placeholder-class="phcolor"
					@blur="checkVer()"
				>
			</view>
			<button class="identify-btn" @click="send()" :disabled="ifSend">{{text}}</button>
		</view>
		<view class="tips">{{tipVer}}</view>
		<view class="index-btn" @click="reg()">{{isLanguage ? 'Sign Up' : '注册'}}</view>
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	import { sendVer, mailBand, mailVerify, smsBand, smsVerify } from '../../api/user'
	
	export default {
		data() {
			return {
				tip: '',
				tipVer: '',
				ep: '',
				email: '',
				phone: '',
				ver: '',
				language: 1,
				isLanguage: true,
				i: '',
				username: '',
				ifSend: false,
				text: '',
				scrollTop: 0
			}
		},
		onLoad(options){
			this.username = options.name
			this.getTop()
			this.scrollTop = this.scrollTop * 2 +14
		},
		onShow() {
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
			if (!this.isLanguage) {
			  this.text = '发送验证码'
			} else {
			  this.text = 'Send Ver'
			}
		},
		methods: {
			getEP() {
				if(this.isLanguage)
					return 'Enter Email/Phone'
				else
					return '请输入邮箱/手机号码'
			},
			getVer() {
				if(this.isLanguage)
					return 'Enter Verification'
				else
					return '请输入验证码'
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
			checkEP(){
				var ph = /^1\d{10}$/
				var email = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				if (this.ep === '') {
					this.tip = "请输入邮箱/手机号码"
					return false
				}else if (ph.test(this.ep)) {
					this.tip = ""
					this.i = '0'
					this.phone = this.ep
					return true
				}else if (email.test(this.ep)) {
					this.tip = ""
					this.i = '1'
					this.email = this.ep
					return true
				}else{
					this.tip = "请输入正确的邮箱/手机号码"
					return false
				}
			},
			checkVer(){
				if (this.ver === '') {
					this.tipVer = "请输入验证码"
					return false
				}else {
					this.tipVer = "";
					return true 
				}
			},
			send() {
				this.checkEP()
				if (this.i === '0'){
					this.changeSendBtn()
					this.bindPhone()
				}else if (this.i === '1'){
					this.changeSendBtn()
					this.bindEmail()
				}
			},
			reg() {
				const ver = this.checkVer()
				const ep = this.checkEP()
				if(ver && ep) {
					if (this.i === '0'){
						this.verifyPhone()
					}else if (this.i === '1'){
						this.verifyEmail()
					}
				}
			},
			bindEmail () {
				mailBand(this.email, this.username)
					.then(res => {
						const data = JSON.parse(res.data).endata
						uni.showToast({
							title: data.msg,
							icon: 'none'
						})
						if(data.su === 0) {
							return
						}
					})
			},
			bindPhone () {
				smsBand(this.phone, this.username)
					.then(res => {
						const data = JSON.parse(res.data).endata
						uni.showToast({
						  title: data.msg,
						  icon: 'none'
						})
						if(data.su === 0) {
							return
						}
					})
			},
			verifyEmail () {
				mailVerify(this.email, this.username, this.ver)
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
			},
			verifyPhone () {
				smsVerify(this.phone, this.username, this.ver)
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
			},
			changeSendBtn () {
			  this.ifSend = true
			  let restTime = 30
			  const that = this
			  const a = setInterval(function () {
			    if (restTime === 0) {
			      that.ifSend = false
			      if (!this.isLanguage) {
			        that.text = '发送验证码'
			      } else {
			        that.text = 'Send Ver'
			      }
			      clearInterval(a)
			    } else {
			      restTime--
			      if (!this.isLanguage) {
			        that.text = `倒计时${restTime}秒`
			      } else {
			        that.text = `Wait ${restTime}s`
			      }
			    }
			  }, 1000)
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
		margin-left: 48rpx;
		justify-content: center;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.tips{
		color: #FB8539;
		height: 54rpx;
		font-size: 26rpx;
		margin-left: 18rpx;
	}
	
	.identify-code{
		width: 654rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
			
	.identify-box{
		width: 400rpx;
		height: 79rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #D6CEBD;
	}
			
	.identify-box input{
		width: 400rpx;
		margin-left: 18rpx;
	}
			
	.identify-btn{
		width: 210rpx;
		height: 68rpx;
		color: #FFFFFF;
		background-color: #987744;
		text-align: center;
		font-size: 28rpx;
		line-height: 68rpx;
		border-radius: 20rpx;
	}
	
	.index-btn{
		width: 654rpx;
		height: 84rpx;
		margin-top: 64rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 84rpx;
	}
	
	.input-box{			
		margin-top: 0;
	}
</style>
