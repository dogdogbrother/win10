var wrap = document.querySelector('.wrap');
var main = document.querySelector('.main');					//这个main是一直存在的，先获取到，万一有用呢
var clone = document.querySelector('.clone');				// 获取的是个P标签，是用来存放克隆出来的东西 。。这个地方有问题，在考虑要不要存在这个东西
var menu = document.querySelector('.menu');				// 获取的是右键建立的大菜单
var menuSu1 = menu.querySelectorAll('.sub-menu')[0];	//第一个小菜单
var menuSu2 = menu.querySelectorAll('.sub-menu')[1];	//第二个小菜单
var footer = document.querySelector('.ft');				//最下面的菜单栏
var screenBg = document.querySelector('.screen-bg');	//更换背景的块
var bgSettingBtn = document.querySelectorAll('.bg-title li');	//更背的右上角的三个按钮
var changeBgBtn = screenBg.querySelectorAll('.change-bg li');		//更背下面的缩略图的几个可点击的li
var bgPreview = document.querySelector('.bg-preview');		//这个是更背里面的上面的大的显示图。
var fileBtn = document.querySelector('.bg-handle input');	//浏览上传图片的按钮
var bgSelectPullDown = document.querySelector('.seclet-shape');	//获取到的是更背里面的下拉类似input一样的东西。
var bgSelectSub = document.querySelector('.seclet-sub');	// 下拉后出现的ul选项
var bgSelectSubLi = bgSelectSub.querySelectorAll('li');
var downFlag = 0;
var downX = 0;
var downY = 0;
var screenBgHeight = 0;	//此变量是记录更换背景的块在变大前的高度，用于变小时的数据。
var screenBgWidth = 0;	//此变量是记录更换背景的块在变大前的高度，用于变小时的数据。
var clearMenuFlag = 0;	//此变量是用来左键点击清除mune用的，如果开关为1，移出为0;
var timerBgBtn = 0;		//此变量是用来管理背景略所图的定时器
(function position() {
	var icon = document.querySelectorAll('.main > div');	//获取到主体下第一层DIV，这里有个问题，到底用不用第一层。后面在解决
	for (var i = 0; i < icon.length; i++) {//循环所有的icon，好给他们排顺序
		elTop = i*104;		//因为每个icon占位是104，所以TOP间隔为104
		elLeft = Math.floor(i/10)*76;	// 因为屏幕竖排只能放下10个，过了十个left就增加76间隔。
		icon[i].style.top = elTop+'px';	
		icon[i].style.left = elLeft+'px';	
	}
})();
//以上内容为给元素排序，已经独立形成一块了！！！！！
(function cusor(){
	var icon = document.querySelectorAll('.main > div');
	for (var i = 0; i < icon.length; i++) {
		icon[i].active = 0;
		icon[i].addEventListener('mouseover',hover);
		icon[i].addEventListener('mouseout',out);
		icon[i].addEventListener('click',down);
		document.addEventListener('mouseup',up);
		function hover(){
			if(this.dataset.active){	
				this.classList.add('active');	
			}else{
				this.classList.add('hover');	
			}
		}
		function out(){
			if (this.dataset.active) {	
				this.classList.remove('active')	
				this.classList.add('hover');	
			}else{
				this.classList.remove('hover');
			}
		}
		function down(ev){
			downFlag = 1;
			downX = ev.clientX;
			downY = ev.clientY;
			if(ev.ctrlKey){

			}else{
				for (var i = 0; i < icon.length; i++) {
					icon[i].classList.remove('active');
					icon[i].classList.remove('hover');
					icon[i].dataset.active = '';
				}
			}
			this.classList.add('active');
			this.dataset.active = true;
			document.addEventListener('mousemove',drag);
		}
		function up(){
			downFlag = 0;
			document.removeEventListener('mousemove',drag);
		}
	}
})();
//       以上块内容包含了移入移出，点击，Ctrl点击多选       //

       
document.addEventListener('mousemove',drag);
function drag(ev){
	if (downFlag==1) {
		var activeEl = main.querySelectorAll('div[data-active=true]');
		for (var i = 0; i < clone.length; i++) {
			
		}
	}
};
//      以上块内容包含了点击拖拽的问题，      //
document.addEventListener('contextmenu',createMenu);
function createMenu(ev){	
	if (ev.target.className  != 'screen-bg' ) {	//如果点击的目标不是更背的块
		screenBg.style.display = 'none';		//每次右键建立菜单的时候，把更换背景的块隐藏了
	}	
	var setting = footer.querySelector('.settingblock');  //新建菜单这里新建个功能就是右键的时候，把底部的设置图标状态修改下
	if (setting) {				//假如setting能获取到，就代表着有这个元素
		setting.classList.add('setting');
	}
	var menuElement = document.querySelectorAll('.allow-active');
	ev.preventDefault();
	if (ev.target.className == 'main') {
		var markX = 0;	//这个坐标立的无奈，是为了给右键点击建立菜单立的。
		var markY = 0;
		var icon = document.querySelectorAll('.main > div');
		for (var i = 0; i < icon.length; i++) { //否则就循环，清空所有的hover的class
			icon[i].classList.remove('hover');
		}
		menu.style.display = 'block';
		markX = ev.clientX;
		if (ev.clientX>document.documentElement.clientWidth-menu.clientWidth){
			markX = document.documentElement.clientWidth-menu.clientWidth-2;	//判断鼠标太右面了，就别太右面了
		}
		if (ev.clientX>document.documentElement.clientWidth-menu.clientWidth-155) {
			menuSu1.style.left = -155 + 'px';	// 再次判断下鼠标位置，确定第一个submenu的位置
			menuSu1.style.boxShadow = ' 2px 1px 3px  #555';
		}else{
			menuSu1.style.left = '';
		}
		if (ev.clientX>document.documentElement.clientWidth-menu.clientWidth-322) {
			menuSu2.style.left = -322 + 'px';	// 再次判断下鼠标X位置，确定第二个submenu的位置
			menuSu2.style.boxShadow = ' 2px 1px 3px  #555';
		}else{
			menuSu2.style.left = '';
		}
		if (ev.clientY>document.documentElement.clientHeight-menu.clientHeight-footer.clientHeight){
			menu.style.top = ev.clientY-menu.clientHeight+'px'; //top值和left不一样的设定。
		}else{
			menu.style.top = ev.clientY + 'px';
		}
		if (ev.clientY>document.documentElement.clientHeight-80) {	//再次判断下鼠标Y位置，确定第二个submenu的上下位置
			menuSu2.style.top = '-130px';
		}else{
			menuSu2.style.top = '-2px';
		}
		menu.style.left = markX+'px';
	}
	//这里的下面开始写新建出来的菜单的鼠标事件
	menuElement[1].onclick = function() {	//刷新页面
		window.location.reload();
	}







	menuElement[3].onclick = function() {	//更好壁纸，是一个大工程，等会再写
		menu.style.	display = 'none';
		var setting = footer.querySelector('.settingblock'); 
		if (!setting) {			//这个判断语句是为了不重复新建立图标，如果不能获取到这个元素再建立
			var div = document.createElement('div');
			div.className = 'settingblock';
			footer.appendChild(div);
			screenBg.style.display = 'block';	
			var setting = footer.querySelector('.settingblock'); 
			setting.onclick = function() {		//下面的小图标，点击让其背景块隐藏，再点击显示
				if (this.className == 'settingblock') {	
					screenBg.style.display = 'none';
					this.classList.add('setting');
				}else{
					screenBg.style.display = 'block';
					this.classList.remove('setting');
				}
			}		
		}else{
			setting.classList.remove('setting');
			screenBg.style.display = 'block';
		}
		bgSettingBtn[0].onclick = function() {	//这个按钮是更换背景上的隐藏按钮
			screenBg.style.display = 'none';
			setting.classList.add('setting');
		}
		bgSettingBtn[1].onclick = function() {	//这个按钮是更换背景上的放大按钮
			if (!this.className) {				//如果按钮的class为空的时候
				this.className = 'big';			
				screenBgWidth = screenBg.offsetWidth;	//记录背景块的宽度，用于还原的时候的赋值
				screenBgHeight = screenBg.offsetHeight;
				screenBg.classList.add('screen-bg-big');	//给大块添加一个class，class里面只有top0和left0，和宽度100%;
				screenBg.style.height = main.clientHeight + 'px';	//高度为main的高度(不包含footer)
				screenBg.style.width = '';					
			}else{
				this.className = '';
				screenBg.classList.remove('screen-bg-big');		
				screenBg.style.height = screenBgHeight + 'px';
				screenBg.style.width = screenBgWidth + 'px';
			}
		}
		bgSettingBtn[2].onclick = function(){		//第三个btn是关闭这个块，并且删除footer下面的图标。
			screenBg.style.display = 'none';	
			var setting = footer.querySelector('.settingblock'); 
			footer.removeChild(setting);
		}
	}
				//下面的位置写更换壁纸所需要的里面的功能，元素的获取在最上面//
		for (var i = 0; i < changeBgBtn.length; i++) {	//循环每个li，也就是缩略图，这个循环里做到了点击更换图片
			changeBgBtn[i].index = i;
			changeBgBtn[i].onmousedown = function() {	//添加个down事件，动画的形式是通过添加class实现的。
				var nub = this.index;	//这个变量写的无奈啊，因为里面的定时器是没有办法获取到this的，所以要用这个来写。
				this.classList.add('scale');			//按下时变小，这里是是有动画的，我加给css本身的参数是scale为1,trsition为.1s
				clearInterval(timerBgBtn);
				this.onmouseout = function() {			
					this.classList.remove('scale');		//鼠标离开嵌套在鼠标按下里面，只有在按下的this元素内离开才有效果
				}
				this.onmouseup = function() {			//如果按下的中途离开了，也会恢复原状
					this.classList.remove('scale');	
					var changeBgBtnCheck = screenBg.querySelectorAll('.change-bg li');
					if (this == changeBgBtnCheck[0]) {	//这个地方再次获取下，这些略所图的图片，
						return;				//就是为了判断是否是第一个，第一个就不作为。
					}	
					timerBgBtn=setTimeout(function(){			//开了个定时器，定时器的为300毫秒,作用是让opcity为0
						changeBgBtn[nub].style.opacity = '0';
						setTimeout(function() {		//300的定时器，更换dom的位置
							changeBgBtn[nub].parentNode.insertBefore(changeBgBtn[nub],changeBgBtn[nub].parentNode.children[0])
							setTimeout(function() { //300的定时器，回复opcity1,同时改变桌面的背景图片和上面大的略所图的图片背景
								changeBgBtn[nub].style.opacity = '1';	
								bgPreview.style.backgroundImage = changeBgBtn[nub].style.backgroundImage;//上面大的略所图的背景图片
								wrap.style.backgroundImage = changeBgBtn[nub].style.backgroundImage;//改变桌面的背景图片
							},300);
						},300);
					},500);	
				}
			}
		}
		fileBtn.onchange = function() {	//浏览更换图片的按钮，点击会把第五个放到第一个，并把地址改了
			var reader = new FileReader(); 	//new一个filereader空间，为读取文件的对象
			reader.onload = function(ev) {
				if (fileBtn.files[0].type.split("/")[0]!='image') {
					alert('暂时背景更换只支持图片上传');
					return;
				}
				setTimeout(function(){		
					changeBgBtn[4].style.opacity = '0';	
					setTimeout(function(){
						changeBgBtn[4].style.backgroundImage = 'url('+ev.target.result+')';	//给最后一个小的略所图的路径设置为上传的图片的url
						changeBgBtn[4].parentNode.insertBefore(changeBgBtn[4],changeBgBtn[4].parentNode.children[0]);
						setTimeout(function(){
							changeBgBtn[4].style.opacity = '1';	
							bgPreview.style.backgroundImage = changeBgBtn[4].style.backgroundImage;
							wrap.style.backgroundImage = changeBgBtn[4].style.backgroundImage;
							console.log(ev.target.result);
						},300)
					},300)
				},500)					
			}
			reader.readAsDataURL(fileBtn.files[0]); //将文件读取为data：开头的字符串，实质上就是DataURL
		}
		bgSelectPullDown.onmousedown = function(){	//这个是操作下拉，按下颜色变深
			this.style.background = '#ccc';
			bgSelectPullDown.onmouseout = function() {	//中途离开颜色回复
				this.style= '';
			}
			bgSelectPullDown.onmouseup = function() {
				this.style = '';			//在这个元素按下后，在这个元素离开颜色回复	
				bgSelectSub.classList.add('seclet-sub-block');//这个class里面包含了opcity，top，hight，z-index.
				for (var i = 0; i < bgSelectSubLi.length; i++) {	//点击点过循环下所有的li，对比下字符串， 把显示出来的颜色变一下。
					if (bgSelectPullDown.innerHTML.charAt(0) == bgSelectSubLi[i].innerHTML.charAt(0)) { 
						bgSelectSubLi[i].style.background = '#e3c0a1';	  //这个循环只用来比较变颜色，其他的都不做	
					}             
				}
				for (var i = 0; i < bgSelectSubLi.length; i++) {
					bgSelectSubLi[i].flag = 0;
					bgSelectSubLi[i].onmouseover = function() {	//给每一个元素添加鼠标移入事件，如果是已经变色的，换个颜色，没有变色的，变不同的颜色
						if (this.style.background) {	//如果本身有颜色，就代表是被当前选中的
							this.style.background = '#dba87a';  //变成更鲜艳的样色
							this.flag = 2;
						}else{
							this.style.background = '#dadada'; //没有被选中的变成灰色
							this.flag = 1;
						}
					}
					bgSelectSubLi[i].onmouseout = function() { 	//离开后根据鼠标的falg还原不同的颜色
						if (this.flag == 2) {
							this.style.background = '#e3c0a1';
						}else{
							this.style = '';
						}
					}
					bgSelectSubLi[i].onmousedown = function() {	//按下时缩放一点点
						this.style.transform = 'scale(.95)';
						this.onmouseup = function() {			
							for (var i = 0; i < bgSelectSubLi.length; i++) {//抬起时循环所有的选项，并把背景色全部清空
								bgSelectSubLi[i].style = '';
							}
							bgSelectPullDown.innerHTML = this.innerHTML + '<span></span>';	//给input的内容替换成点击li里面的内容
							bgSelectSub.classList.remove('seclet-sub-block');		//移出ul选项框的display:block的选项。
							if ( this.innerHTML == '填充') {
								bgPreview.className = 'bg-preview';
								wrap.className = 'wrap';
							}else if( this.innerHTML == '平铺' ){
								bgPreview.className = 'tile';
								wrap.className = 'tile';
							}else if( this.innerHTML == '适应' ){
								// if () {}
							}else if( this.innerHTML == '居中' ){
								//bgPreview.style.backgroundSize = bgPreview.offsetWidth/wrap.offsetWidth*100+'% '+bgPreview.offsetHeight/wrap.offsetHeight*100+'%';
								bgPreview.className = 'center';
								wrap.className = 'center';
							}
						}
					}
				}
			}
		}




				//上面的位置写更换壁纸所需要的一些东西//

	//这里的上面开始写新建出来的菜单的鼠标事件，刷新页面和更换壁纸
}
	//这里的下面写一个元素的鼠标移入和移出的事件，只是为了设开关，给左键点击
	var liElement = document.querySelectorAll('.menu li');
	for (var i = 0; i < liElement.length; i++) {
		liElement[i].addEventListener('mouseover',hoverFlag);
		liElement[i].addEventListener('mouseout',outFlag);
		function hoverFlag() {
			clearMenuFlag = 1;
		}
		function outFlag() {
			clearMenuFlag = 0;
		}
	}
	////这里的上面写一个元素的鼠标移入和移出的事件，只是为了设开关，给左键点击
	window.addEventListener('click',clearMenu);//这个点击事件的作用是，清除点击掉菜单和图标的选中状态
	function clearMenu(ev) {	
		if (ev.button == 2) {	//如果是右键点击，什么不操作。
			return;
		}
		if (ev.ctrlKey) {	
			
		}else{
			var icon = document.querySelectorAll('.main > div');
			for (var i = 0; i < icon.length; i++) {	//	如果鼠标左键按下时，ctrl没按的话，执行
				icon[i].classList.remove('hover');	//	所有的图标清除hover
			}
			if (!clearMenuFlag) {
				menu.style.display = 'none';
			}
		}	
	}
//       以上块内容包含了右键新建立菜单，并清除所有的选中项  ，还有点击空白处关闭菜单    //
