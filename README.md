# 非遗研学 小程序端

## 01 - 项目概况

致力于非遗保护和传承的微信小程序，包含登录注册、微课、VR、线下研学等页面，实现观看微课和VR展示、线下研学预约、选择场次、查看订单、查看历史记录等功能



## 02 - 使用的平台、工具

- ui设计：[figma地址](https://www.figma.com/file/A8y0S9UWd5mz50MF3UpLoM/%E9%9D%9E%E9%81%97?type=design&node-id=0-1&mode=design&t=88TsO4LJ1VNcB8Ab-0)

- 项目地址：[github地址](https://github.com/maple1528/ichstudy-wx)

- 微信公众平台：https://mp.weixin.qq.com/ 联系管理员添加项目成员权限后，可查看

- 编辑器：HBuilderX（不用安装其余插件了）/ vsCode

- 小程序调试：微信开发者工具

- 接口测试：postman / apifox

- 小程序二维码：

![image](https://github.com/Felicityty/ICHStudy-wx/raw/master/static/images/QRcode.jpg)





## 03 - 关于figma

- 一般使用网页端即可

- 使用 iPhone X 规范

- 由于我们使用了思源宋体，在figma中更改字体需下载[Font installers](https://www.figma.com/downloads/)

- 导出图使用2倍图



### 04 - 微信开发者平台

- AppID(小程序ID)：wx1c12e54d3dc406d2
- 导入项目的路径是unpackage/dist/dev/mp-weixin

⚠️：上线前一定需要真机调试，一个包代码需控制在2M以下



## 05 - 项目代码

### 1 技术栈

uni-app + uni-ui + 微信开发者工具 + axios

### 2 项目目录

<img src="https://cdn.nlark.com/yuque/0/2024/png/35423983/1712747735985-05054bf0-965e-4f77-9c3a-727e1943fe51.png?x-oss-process=image%2Fformat%2Cwebp%2Fresize%2Cw_828%2Climit_0" alt="image.png" style="zoom:50%;" />

### 3 分包

项目的tabbar分别为首页、学习、研学、我的，学习中有vr和课程，入口页、研学相关页面存放在分包中

### 4 代码提交

❗️ 从master分支拉出新分支，在新分支上修改，测试完功能后，再合并至master分支，最后发布至微信公众平台



## 06 - 历史迭代

- 只有首页、课程、VR、我的、基础的邮箱注册登录、中英文切换等，满足基本使用（第一次上线遇到了由于包含视频，小程序审核不通过问题，需要挂靠企业提供证书，并改用腾讯视频插件）
- 新增了忘记密码、游客模式、研学、语言跟随系统、手机号注册登录、视频播放卡顿升级了服务器带宽，合并课程和VR为学习。由于新增研学大功能，本地代码大小大于了2M，在真机调试中会提示，我们采取了分包，把进入页和研学相关页面移到subPackages中（可以在微信开发者工具 -> 详情 -> 本地代码 -> 代码依赖分析 中查看打包好的包的大小）



## 07 - 优化方向

### 1 文件大小方向

- 引入iconfont，优化static文件夹中icon相关文件的大小
- 完善分包
- 提取公共方法到utils中，优化代码体积

### 2 代码优雅程度

- 暂时没有开发文创产品页面，由于一些历史原因，代码中的product页面现用来存放vr和课程的学习页面，可以更改一下命名
- 删除开发调试的console.log()和无用的注释代码
- 小驼峰命名

### 3 性能方向

- 对于微课、VR这些列表，换成虚拟列表/图片懒加载等
- 升级为云服务器，提升速度

### 4 项目完善程度

- 新增列表查询功能
- 开发非遗研学小程序对应后台项目。现状是前端在postman上调用后端接口对微课、VR、研学等进行增删改，不大合理。加入echarts图表，统计用户行为数据等
- 新增用户批量导入功能
- ……

