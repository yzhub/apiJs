const api = {
	hub: {},
	load: (key, settings = {}) => {
	    // 初始化请求参数
	    let _s = Object.assign({
	      url: '', // string
	      type: 'GET', // string 'GET' 'POST' 'DELETE'
	      dataType: 'json', // string 期望的返回数据类型:'json' 'text' 'document' ...
	      async: true, //  boolean true:异步请求 false:同步请求 required
	      data: {},
	      headers: {}, // object 请求头
	      timeout: 1000, // string 超时时间:0表示不设置超时
	      before: () => {},
	      success: (result, status) => {},
	      error: (status, error) => {},
	      parogress:() => {},
	      complete: (status) => {}
	    }, settings);
	    api.hub[key] = _s
	},
	getdata: (key, param = {}, success = null, error = null, before = null, complete = null) => {
		if(undefined == api.hub[key]) {
		console.error("not fount api key" + key)
		return
		}
		_s = api.hub[key]
		// 创建XMLHttpRequest请求对象
    	let xhr = new XMLHttpRequest();
    	// 当一个请求终止时 abort 事件被触发
    	xhr.addEventListener('abort', e => {
    		console.info("请求被终止abort触发")
    	});
    	// 当请求遇到错误时，将触发error 事件
    	xhr.addEventListener('error', e => {
    		({} != error) ? error(xhr.status, e) : _s.error(xhr.status, e)
    	});
    	// 请求完成的时候会触发load 事件。
    	xhr.addEventListener('load', e => {
		const status = xhr.status;
      		if ((status >= 200 && status < 300) || status === 304) {
	        	let result;
	        	if (xhr.responseType === 'text') {
		        	result = xhr.responseText;
		        } else if (xhr.responseType === 'document') {
		         	result = xhr.responseXML;
		        } else {
		         	result = xhr.response;
		        }
		        // 注意:状态码200表示请求发送/接受成功,不表示业务处理成功
		        ({} != success) ? success(result, status) : _s.success(result, status);
	      	} else {
	        	_s.error(status, e);
	      	}
    	});
    	// 在一个资源的加载进度停止之后被触发
    	xhr.addEventListener('loadend', e => {
			(null != complete) ? complete(xhr.status) : _s.complete(xhr.status)
    	});
    	// 当程序开始加载时，loadstart 事件将被触发
    	xhr.addEventListener('loadstart', e => {
			(null != before) ? before() : _s.before()
    	});
    	// progress事件会在请求接收到数据的时候被周期性触发。
    	xhr.addEventListener('parogress', e => {
			console.log("数据调用中")
			_s.parogress();
    	});
    	// 当进度由于预定时间到期而终止时，会触发timeout 事件。
    	xhr.addEventListener('timeout', e => {
    		console.log("调用超时")
    		({} != error) ? error(xhr.status, e) : _s.error(xhr.status, e)
    	});
		switch(_s.type.toUpperCase()) {
			case 'GET':
			case "DELETE":
				var suffix = ((_s.url).indexOf('?') !== -1) ? api._objectConverString(param) : ("?" + api._objectConverString(param))
				_s.url += suffix
				_s.data = null
				break;
			case "POST":
			case "PUT":
				_s.data = api._buildHttpParam(param)
				break;
		}
		// 初始化请求
    	xhr.open(_s.type, _s.url, _s.async);
    	// 设置期望的返回数据类型
    	if(_s.async) {
    		xhr.responseType = _s.dataType;
    	}
    	// 设置请求头
    	for (const key of Object.keys(_s.headers)) {
      		xhr.setRequestHeader(key, _s.headers[key]);
   		}
    	// 设置超时时间
    	if (_s.async && _s.timeout) {
      		xhr.timeout = _s.timeout;
    	}
		xhr.send(_s.url, _s.data, false)
	},
	_buildHttpParam: (data) => {
		result = null
		if(typeof data === "string" || data instanceof FormData) {
		result = data
		} else if(true == data){
		result = api._objectConverString(data);
		}
		return result
	},
	_objectConverString: (data) => {
		let arrResult = [];
	    if (data instanceof Object) {
	      Object.keys(data).forEach(key => {
	        let val = data[key];
	        if (val instanceof Date) {
	        	val = dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
	        }
	        arrResult.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
	      });
	    }
	    return arrResult.join('&');
	}
}