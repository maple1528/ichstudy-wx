<template>
	<view class="content">

		<view class="bg">
			<swiper class="swiper" indicator-dots="true" display-multiple-items="1" interval="3000" duration="1200"
				autoplay="true" circular="ture" previous-margin="0" next-margin="0" indicator-active-color="#382321">
				<block v-for="(item, index) in bannerItem" :key="index">
					<swiper-item>
						<image :src="item.img" class="picbg"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<view class="container">

			<view class="course">

				<view class="row">
					<view class="titleC">{{isLanguage ? 'Courses' : '课程'}}</view>
					<!-- <navigator url="./course/index" open-type="switchTab"> -->
					<navigator url="./course/index">
						<view class="allCourse">
							<view class="allText">{{isLanguage ? 'more' : '全部'}}</view>
							<view class="allArrow">
								<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
							</view>
						</view>
					</navigator>

				</view>

				<view class="listView">
					<view class="listView-tile" v-for="(item, index) in courseItem" :key="index"
						v-if="index == 0 || index == 5 || index == 10 || index == 18" @click="goCourseDetail(item.id)">
						<image class="couPic" :src="item.img" mode="aspectFill"></image>
						<view class="couName">{{isLanguage ? item.enname : item.cnname}}</view>
					</view>
				</view>
			</view>

			<view class="VR">

				<view class="row">
					<view class="titleV">VR</view>
					<!-- <navigator url="./VR/index" open-type="switchTab"> -->
					<navigator url="./VR/index">
						<view class="allVR">
							<view class="allText">{{isLanguage ? 'more' : '全部'}}</view>
							<view class="allArrow">
								<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
							</view>
						</view>
					</navigator>
				</view>

				<view class="listView">
					<view class="listView-tile" v-for="(item, index) in vrItem" :key="index"
						v-if="index == 0 || index == 4 || index == 1" @click="goVrDetail(item.id)">
						<image class="couPic" :src="item.img" mode="aspectFill"></image>
						<view class="couName">{{isLanguage ? item.enname : item.cnname}}</view>
					</view>
				</view>
			</view>

		</view>
		<tabbar :state="1"></tabbar>
	</view>
</template>

<script>
	import {
		getCourseList
	} from '../../api/course/index.js'
	import {
		getFileUrl
	} from '../../common/index.js'
	import {
		getVrList
	} from '../../api/vr/index.js'
	import {
		getVrList_tourist
	} from '../../api/vr/index.js'
	import {
		tabbar
	} from '../../components/tabbar/tabbar.vue'
	import {
		getBannerList
	} from '../../api/banner/index.js'
	import {
		getCourseList_tourist
	} from '../../api/course/index.js'
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				title: '首页',
				courseItem: [],
				vrItem: [],
				language: 1,
				isLanguage: true,
				bannerItem: [],
				courseClick: 0,
				vrClick: 0,
				isToken: false
			}
		},
		onShow() {
			const token = wx.getStorageSync('token')
			this.getLanguage()
			this.getBannerList()
			if (token) {
				this.getCourseList()
				this.getVrList()
				this.isToken = true
			} else {
				this.getCourseList_tourist()
				this.getVrList_tourist()
				console.log("游客模式开启")
			}
		},
		methods: {
			getLanguage() {
				const that = this
				wx.getSystemInfoAsync({
					success(res) {
						if (res.language === 'zh_CN') {
							that.language = 0
							that.isLanguage = false
						} else {
							that.language = 1
							that.isLanguage = true
						}
						uni.setStorage({
							key: 'language',
							data: that.language
						})
					}
				})
			},
			goCourse() {
				uni.navigateTo({
					url: "./course/index"
				})
			},
			goVR() {
				uni.navigateTo({
					url: "./VR/index"
				})
			},
			goVrDetail(id) {
				const that = this
				that.vrClick = wx.getStorageSync('vrClick')
				that.vrClick++
				uni.setStorage({
					key: 'vrClick',
					data: that.vrClick
				})
				if (that.vrClick > 3 && !that.isToken) {
					uni.showModal({
						title: that.isLanguage ? 'Tips' : '提示',
						content: that.isLanguage ? 'Reach the upper limit' : 'VR观看次数已达上限',
						showCancel: true,
						cancelText: that.isLanguage ? 'Login' : '去登录',
						confirmText: that.isLanguage ? 'Other' : '观看其他',
						cancelColor: '#73615D',
						confirmColor: '#8F8F8F',
						success: function(res) {
							if (res.confirm) {
								return
							} else if (res.cancel) {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}
						}
					});
				} else {
					uni.navigateTo({
						url: './VR/vrDetail?id=' + id
					})
				}
			},
			goCourseDetail(id) {
				const that = this
				that.courseClick = wx.getStorageSync('courseClick')
				that.courseClick++
				uni.setStorage({
					key: 'courseClick',
					data: that.courseClick
				})
				if (that.courseClick > 3 && !that.isToken) {
					uni.showModal({
						title: that.isLanguage ? 'Tips' : '提示',
						content: that.isLanguage ? 'Reach the upper limit' : '微课观看次数已达上限',
						showCancel: true,
						cancelText: that.isLanguage ? 'Login' : '去登录',
						confirmText: that.isLanguage ? 'Other' : '观看其他',
						cancelColor: '#73615D',
						confirmColor: '#8F8F8F',
						success: function(res) {
							if (res.confirm) {
								return
							} else if (res.cancel) {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}
						}
					});
				} else {
					uni.navigateTo({
						url: './course/detail?id=' + id
					})
				}
			},
			getCourseList() {
				getCourseList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const courses = []
						data.forEach(item => {
							courses.push({
								id: item.cindex,
								cnname: item.cnname,
								enname: item.enname,
								img: getFileUrl('img', item.imgpath)
							})
						})
						this.courseItem = courses
					})
					.catch(err => {
						console.log(err)
						wx.removeStorageSync('openid')
						wx.removeStorageSync('token')
						wx.removeStorageSync('userInfo')
						uni.redirectTo({
							url: '/pages/home/index'
						})
					})
			},
			getVrList() {
				getVrList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const vrs = []
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
					})
					.catch(err => {
						{
							console.log(err)
							wx.removeStorageSync('openid')
							wx.removeStorageSync('token')
							wx.removeStorageSync('userInfo')
							uni.redirectTo({
								url: '/pages/home/index'
							})
						}
					})
			},
			// 游客模式
			getCourseList_tourist() {
				getCourseList_tourist()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const courses = []
						data.forEach(item => {
							courses.push({
								id: item.cindex,
								cnname: item.cnname,
								enname: item.enname,
								img: getFileUrl('img', item.imgpath)
							})
						})
						this.courseItem = courses
					})
					.catch(err => console.log(err))
			},
			getVrList_tourist() {
				getVrList_tourist()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const vrs = []
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
					})
					.catch(err => console.log(err))
			},
			getBannerList() {
				getBannerList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						const banners = []
						data.forEach(item => {
							banners.push({
								id: item.id,
								img: getFileUrl('img', item.image)
							})
						})
						this.bannerItem = banners
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 750rpx;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}

	.bg {
		position: relative;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 620rpx;
		line-height: 250rpx;
	}

	.swiper {
		width: 100%;
		height: 620rpx;
	}

	.picbg {
		width: 100%;
		height: 100%;
	}

	.container {
		width: 100%;
		background-color: #F9F3EB;
		position: relative;
		bottom: 54rpx;
		margin-top: -70rpx;
		border-radius: 60rpx 60rpx 0 0;
	}

	.titleC {
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
		margin-bottom: 36rpx;
		margin-top: 48rpx;
	}

	.titleV {
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
		margin-bottom: 36rpx;
		margin-top: 12rpx;
	}

	.course,
	.VR {
		/* margin-left: 48rpx; */
		margin-bottom: 48rpx;
	}

	.row {
		width: 654rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 48rpx;
	}

	.allCourse {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.allVR {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.arrowRight {
		width: 18rpx;
		height: 20.16rpx;
		margin-left: 10rpx;
		margin-bottom: 3rpx;
	}

	.allText {
		font-size: 24rpx;
		color: #382321;
	}

	.listView {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		white-space: nowrap;
		overflow-x: auto;
		padding-left: 48rpx;
	}

	/* 隐藏滑动条 */
	::-webkit-scrollbar {
		display: none;
	}

	.listView-tile {
		padding-right: 30rpx;
		/* display: inline-block; */
	}

	.couPic {
		width: 280rpx;
		height: 300rpx;
		border-radius: 20rpx;
	}

	.couName {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #382321;
		width: 264rpx;
		white-space: normal;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 这里是超出几行省略 */
		overflow: hidden;
	}
</style>
