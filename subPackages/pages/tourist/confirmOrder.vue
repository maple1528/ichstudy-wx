<template>
	<view class="container">
		<view class="time">
			<view class="head">{{language ? 'Visit time' :'参观时间'}}</view>
			<view>{{chooseDate + ' ' + chooseTime}}</view>
		</view>

		<view class="audience">
			<view class="audience-head">
				<view class="head">{{language ? 'Add audience' :'添加观众'}}</view>
				<view class="audience-operation">
					<image src="../../../static/images/iCons/sub.png" mode="aspectFill" class="audience-icon"
						@click="audienceReduce()"></image>
					<view>{{audience.length}}</view>
					<image src="/static/images/iCons/add.png" mode="aspectFill" class="audience-icon"
						@click="audienceAdd()"></image>
				</view>
			</view>
			<view class="audience-operate" v-for="(item, index) in audience" :key="index">
				<image src="/static/images/iCons/subbrown.png" mode="aspectFill" class="audience-icon"
					@click="deleteCur(index)"></image>
				<view class="audience-info">
					<view style="margin-bottom: 6rpx;">{{item.username}}</view>
					<view>{{item.userID}}</view>
				</view>
			</view>
			<view class="audience-add" v-show="isAdd">
				<view class="audience-add-input">
					<input type="text" v-model="newAudience.username" class="add" :placeholder='tip[0]'
						placeholder-class="phcolor">
					<input type="text" v-model="newAudience.userID" class="add" style="margin-top: 4rpx;"
						:placeholder='tip[1]' placeholder-class="phcolor">
				</view>
				<view class="audience-add-icon">
					<image src="/static/images/iCons/chabrown.png" mode="aspectFill" class="add-icon-cha"
						@click="confirmCancel()"></image>
					<image src="/static/images/iCons/checkbrown.png" mode="aspectFill" class="add-icon-check"
						@click="confirmAdd()"></image>
				</view>
			</view>
		</view>

		<view class="info">
			<view class="head">{{language ? 'Order information' :'订单信息'}}</view>
			<view class="info-audience" v-for="(item, index) in audience" :key="index">
				<view>{{item.username}}</view>
				<view>{{item.userID}}</view>
			</view>
			<view class="info-tour">
				<view>{{language ? enname :cnname}}</view>
				<view>{{'￥ ' + cost}}</view>
			</view>
			<view class="info-line"></view>
			<view class="info-cost">
				<view>{{language ? 'Total amount' :'订单总金额'}}</view>
				<view class="cost">{{'￥ ' + audience.length * cost}}</view>
			</view>
		</view>

		<view class="phone">
			<view class="head">{{language ? 'Phone number' :'手机号码'}}</view>
			<input type="number" :placeholder='tip[2]' v-model="phone" placeholder-class="phcolor" @blur="checkPhone()">
		</view>

		<view class="remark">
			<view class="head">{{language ? 'Remarks' :'备注'}}</view>
			<textarea type="text" auto-height="true" :placeholder='tip[3]' v-model="remark" placeholder-class="phcolor"
				class="remark-content" />
		</view>

		<view class="tabbar">
			<view class="tabbar-left">
				<view>{{language ? 'Total price' :'总价'}}</view>
				<view class="tabbar-cost">{{'￥ ' + audience.length * cost}}</view>
			</view>
			<button class="tabbar-btn" @click="Pay()">{{language ? 'Pay' :'付款'}}</button>
		</view>
	</view>
</template>

<script>
	import {
		getRegistrationList,
		addRegistrationList,
		getTouristList
	} from '../../../api/tourist/tourist.js'
	export default {
		data() {
			return {
				user: {},
				language: 0,
				isToken: false,
				chooseDate: null,
				chooseTime: null,
				createTime: null,
				tindex: null,
				tsindex: null,
				audience: [],
				isAdd: false,
				newAudience: {
					username: '',
					userID: ''
				},
				cnname: '',
				enname: '',
				cost: null,
				phone: '',
				remark: ''
			}
		},
		onLoad(options) {
			this.chooseDate = options.chooseDate;
			this.chooseTime = options.chooseTime;
			this.tindex = options.tindex;
			this.tsindex = options.tsindex;
			const token = wx.getStorageSync('token')
			if (token) {
				this.isToken = true
				this.getTouristList()
				this.getRegistrationList()
			}
		},
		onShow() {
			const userInfo = wx.getStorageSync('userInfo')
			this.user = userInfo
			const language = wx.getStorageSync('language')
			this.language = language
		},
		methods: {
			getLanguage() {
				if (wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			audienceReduce() {
				const that = this;
				that.audience.pop();
			},
			audienceAdd() {
				const that = this;
				that.isAdd = true;
			},
			deleteCur(index) {
				const that = this;
				that.audience.splice(index, 1);
			},
			confirmCancel() {
				const that = this;
				that.newAudience.username = '';
				that.newAudience.userID = '';
				that.isAdd = false;
			},
			confirmAdd() {
				const that = this;
				let newA = {};
				newA.username = that.newAudience.username;
				newA.userID = that.newAudience.userID;
				if (newA.userID && newA.username) {
					that.audience.push(newA);
				}
				that.newAudience.username = '';
				that.newAudience.userID = '';
				that.isAdd = false;
			},
			checkPhone() {
				var ph = /^1\d{10}$/;
				if (!ph.test(this.phone)) {
					uni.showToast({
						title: this.language ? 'Please fill in the correct mobile phone number' : '请填写正确手机号码',
						icon: 'none'
					})
				} else {}
			},
			Pay() {
				if (this.audience.length === 0) {
					uni.showToast({
						title: this.language ? 'Please add an audience' : '请添加观众',
						icon: 'none'
					})
					return;
				}
				if (!this.phone) {
					uni.showToast({
						title: this.language ? 'Please fill in the mobile phone number' : '请填写手机号码',
						icon: 'none'
					})
					return;
				}
				this.addRegistrationList()
				// 前端获取当前时间戳
				const timeElapsed = Date.now()
				const today = new Date(timeElapsed)
				this.createTime = today.toISOString()
				// 将时间戳转换为普通时间格式
				let dateee = new Date(this.createTime).toJSON()
				this.createTime = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
				this.getRegistrationList()
				uni.navigateTo({
					url: './orderDetial?tindex='+this.tindex+'&tsindex='+this.tsindex+'&createTime='+this.createTime
				})
			},
			// 将对象数组转换为类似'[{"name":"admin","id":"123"}]'，用于转换为json数组格式
			arrayToString(a) {
				let str = "[";
			 for (let i = 0; i < a.length; i++) {
					let obj = a[i];
					let keys = Object.keys(obj);
					str = str + "{";
					for (let j = 0; j < keys.length; j++) {
						if (j === keys.length - 1) {
							str = str + "\"" + keys[j] + "\"" + ":" + "\"" + obj[keys[j]] + "\""
						} else {
							str = str + "\"" + keys[j] + "\"" + ":" + "\"" + obj[keys[j]] + "\"" + ","
						}
					}
					if (i === a.length - 1) {
						str = str + "}]";
					} else {
						str = str + "},";
					}
				}
				return str;
			},
			addRegistrationList() {
				addRegistrationList(this.user.username, this.tsindex, this.tindex, JSON.parse(this.arrayToString(this.audience)), this.phone, this.remark)
					.then(res => {
						const data = JSON.parse(res.data).endata
					})
					.catch(err => console.log(err))
			},
			getRegistrationList() {
				getRegistrationList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
					})
					.catch(err => console.log(err))
			},
			getTouristList(){
				getTouristList()
				.then(res => {
					const data = JSON.parse(res.data).endata.data
					data.forEach(item => {
						if(item.tindex === this.tindex){
							this.cnname = item.cnname
							this.enname = item.enname
							this.cost = item.price
						}
					}
					)
				})
				.catch(err => console.log(err))
			}
		},
		computed: {
			tip() {
				if (this.language) {
					return ['Enter your real name', 'Enter your ID card', 'Required', 'Optional']
				} else {
					return ['请输入真实姓名', '请输入身份证', '必填', '选填']
				}
			},
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 120rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
	}

	.head {
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #382321;
	}

	.time,
	.phone,
	.remark {
		width: 594rpx;
		padding: 20rpx 30rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #73615D;
		margin-top: 30rpx;
	}

	.audience,
	.info {
		width: 594rpx;
		padding: 28rpx 30rpx;
		color: #73615D;
		background-color: #ffffff;
		border-radius: 20rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.audience-head {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.audience-operation {
		width: 24%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.audience-icon {
		width: 36rpx;
		height: 36rpx;
		margin-top: 2rpx;
	}

	.audience-operate {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 22rpx;
		font-size: 28rpx;
	}

	.audience-info {
		margin-left: 16rpx;
	}

	.audience-add {
		background-color: #F9F9F9;
		width: 572rpx;
		padding: 8rpx 16rpx 16rpx 16rpx;
		border-radius: 10rpx;
		margin-top: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		text-align: left;
	}

	.audience-add-input {
		width: 70%;
		font-size: 22rpx;
	}

	.add {
		padding: 8rpx 0rpx;
		border-bottom: #E5E5E5 solid 2rpx;
	}

	.audience-add-icon {
		width: 20%;
		margin-bottom: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.add-icon-cha {
		width: 30rpx;
		height: 30rpx;
	}

	.add-icon-check {
		width: 42.7rpx;
		height: 30rpx;
	}

	.info-audience {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}

	.info-tour {
		background-color: #F9F9F9;
		border-radius: 10rpx;
		width: 584rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 28rpx;
		font-size: 22rpx;
		color: #8F8F8F;
		padding: 10rpx 10rpx;
	}

	.info-line {
		width: 100%;
		height: 2rpx;
		background-color: #E5E5E5;
		margin-top: 30rpx;
	}

	.info-cost {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}

	.cost {
		font-weight: 600;
	}

	.phcolor {
		color: #73615D;
		font-size: 28rpx;
	}

	input[type=text] {
		width: 100%;
	}

	input[type=number] {
		width: 75%;
		text-align: right;
	}

	.remark-content {
		width: 75%;
		text-align: right;
		min-height: 32rpx;
		margin-left: 10rpx;
		line-height: 40rpx;
		white-space: normal;
		word-wrap: break-word;
	}

	.tabbar {
		/* border: 1px solid #E6DECC; */
		box-shadow: 0 -1rpx 10rpx #E6DECC;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/* height: 132rpx; */
		height: auto;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fefbf3;
		z-index: 999;
		align-items: center;
	}

	.tabbar-left {
		width: 60%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 48rpx;
		font-size: 28rpx;
		color: #73615D;
	}

	.tabbar-cost {
		color: #FB8539;
		font-weight: 600;
		font-size: 36rpx;
		margin-left: 14rpx;
	}

	.tabbar-btn {
		background-color: #987744;
		color: #FFFFFF;
		font-size: 32rpx;
		height: 66rpx;
		line-height: 66rpx;
		margin-top: 16rpx;
		margin-right: 48rpx;
		margin-bottom: 16rpx;
	}
</style>
