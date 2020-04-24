# ApiJS

### 快速上手

#### 引入
```html
<script src="./api.min.js"></script>
````

#### 加载api调用库
````
api.load('a', {
	url:"http://127.0.0.1/a",
	type:"GET",
	dataType:"json",
	async:true,
	headers: {},
	timeout:1000,
	before:function(){},
	success:function(){},
	error:function(){},
	complete:function(){}
})

````

#### 使用方式

````
api.getdata(
    'a',
    {a:123}, 
    function(data, status){
        console.log("调用成功返回内容为"+ data + "状态码为" + status)
    },
    function(status, data) {
         console.log("调用失败返回内容为"+ data + "状态码为" + status)
    },
    function() {
         console.log("开始调用执行")
    },
    function(status) {
         console.log("调用完成后执行")
    },
)
````
#### 参数介绍
**加载API参数**
|参数|类型|介绍|例子|
|-------|-------|-------|-------|
|url| string |API地址 | http://127.0.0.1/index |
|type|string|调用方式(GET\POST\PUT\DELETE) | GET |
|dataType| string |返回类型(json\document\text)| json |
|async|boolea|是否异步执行（GET操作无效）|true|
|headers | object |消息头|{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }|
|timeout|int| 超时时间(毫秒)| 1000 |
|before|func|调用之前执行||
|success|func|调用成功时执行||
|error|func|调用失败时候执行||
|complete|func|调用完成后执行||
|parogress|func|调用中执行||