# ApiJS

### 快速上手
```html
<script src="./api.min.js"></script>

<script>
// 添加api库
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
// 添加api 库
api.load('b', {
	url:"http://127.0.0.1/b",
	type:"POST",
	dataType:"json",
	async:true,
	headers: {},
	timeout:1000,
	before:function(){},
	success:function(){},
	error:function(){},
	complete:function(){}
})
// 添加api 库
api.load('c', {
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

// 调用
api.getdata('a',{a:123}, function(data, status){})
api.getdata('b',{a:123}, function(data, status){})
api.getdata('c',{a:123}, function(data, status){})
</script>
```