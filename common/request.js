import baseURL from './config.js'

function service(options = {}) {
	options.url = `${baseURL}${options.url}`;
	options.dataType = 'JSON';
	
	//配置请求头
	options.header = {
		'Content-type':'application/json',
		'token': wx.getStorageSync('token')
	};
	
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			const msg = JSON.parse(res.data).endata.msg
			if(msg === 'token已失效') {
				uni.reLaunch({
					url: '../index/index'
				})
				rejected(res)
			} else {
				resolved(res);
			}
		}

		//错误
		options.fail = (err) => {
			rejected(err);
		}

		// 使用的是uniapp框架，用uniapp提供的request api发送请求
		uni.request(options);
	});
}

export default service;
