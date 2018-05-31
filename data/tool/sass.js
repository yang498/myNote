commonData.tool.sass = {
	content: `
	#4种编译模式
	写法：·scss --watch scss:css --style 编译模式·
	现有如下css：
	··
	#box {
	    width: 400px;
	    height: 400px;
	    h1 {
	        font-size:22px;
	        color:red;
	    }
	    p {
	        font-size:18px;
	        color:green;
	    }
	}
	··
	
	##nested 嵌套
	默认输出方式，保持一定的缩进
	··
	#box {
	  width: 400px;
	  height: 400px;
	  border: 1px solid gray; }
	  #box h1 {
	    font-size: 22px;
	    color: red; }
	  #box p {
	    font-size: 18px;
	    color: green; }
	··
	
	##expanded 展开
	··
	#box {
	  width: 400px;
	  height: 400px;
	  border: 1px solid gray;
	}
	#box h1 {
	  font-size: 22px;
	  color: red;
	}
	#box p {
	  font-size: 18px;
	  color: green;
	}
	··
	
	##compact 紧凑
	··
	#box { width: 400px; height: 400px; border: 1px solid gray; }
	#box h1 { font-size: 22px; color: red; }
	#box p { font-size: 18px; color: green; }
	··
	
	##compressed 压缩
	··
	#box{width:400px;height:400px;border:1px solid gray}#box h1{font-size:22px;color:red}#box p{font-size:18px;color:green}
	··
	`
}