import request from "../../common/request.js"

// 获取课程列表
export function getCourseList() {
	return request({
		url: '/course/',
		method: 'POST',
		data: {
			endata: {
				action: 'getcourse'
			}
		}
	})
}

// 获取课程章节
export function getSection (courseId) {
  return request({
    url: '/course/',
    method: 'POST',
    data: {
      endata: {
        action: 'getsection',
        cindex: courseId
      }
    }
  })
}

// 上传播放数据
export function uploadMy (name, cindex, sindex, time) {
  return request({
    url: '/course/',
    method: 'POST',
    data: {
      endata: {
        action: 'updplaydata',
        username: name,
        cindex: cindex,
        sindex: sindex,
        ctime: time
      }
    }
  })
}