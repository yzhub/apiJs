(function(sys) {
	function Service(type, method, protocol, url, uri) {
		this.type = type
		this.method = method
		this.protocol = protocol
		this.url = url
		this.uri = uri
	}
	Service.protottype = {
		constructor : Service,
	}
	function Decision(func) {
		this.callback = func
	}
	Service.protottype = {
		constructor : Decision,
	}
	function Api() {
		this.service = {}
	}
	Api.protottype = {
			constructor : Api,
	}

	Api.load = function(objService = {}, objDecision = {}) {
		this.service = objService
		this.decision = objDecision 
		for(var i in objService) {
			this.service[i] = new Service(objService[i]['type'], objService[i]['method'], objService[i]['protocol'], objService[i]['url'], objService[i]['uri'])
		}
		for(var i in objDecision) {
			this.decision[i] = new Decision(objDecision[i])
		}
	}

	Api.getdata = function(id, param, func) {
		if(undefined == Api.service[id]) {
			return false;
		}
		
		var method = Api.service[id].method.toString()
		var url = Api.service[id].protocol + "://" + Api.service[id].url + "/" + Api.service[id].uri
		var xhr = new XMLHttpRequest();
 		xhr.open(method.toLocaleUpperCase() ,url, true);
 		xhr.onreadystatechange = function() {
 			switch(xhr.readyState) {
 				case 0:
 					console.log("初始化连接")
 					break
 				case 1:
 					console.log("数据发送中")
 					break
 				case 2:
 					console.log("数据发送完成")
 					break
 				case 3:
 					console.log("解析响应内容")
 					break
 				case 4:
 					console.log("调用完成")
 					break
 			}
 		}
 		 xhr.send();
	}
	sys.api = Api
})(window);