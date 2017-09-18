var main = document.querySelector('.main');
var clone = document.querySelector('.clone');
function clickScreen(){
	document.addEventListener('mousedown',reset);
	function reset(){
		var icon = main.querySelectorAll('div');
		for (var i = 0; i < icon.length; i++) {
			icon[i].active = 0;
			icon[i].classList.remove('active');
			icon[i].classList.remove('hover');
		}
	}
}
function position() {
	var icon = document.querySelectorAll('.main > div');
	for (var i = 0; i < icon.length; i++) {
		icon[i].active = 0;
		icon[i].index = i;
		k = i*104;
		icon[i].style.top = k + 'px';
		icon[i].addEventListener('mouseover',hover);
		icon[i].addEventListener('mouseout',out);
		icon[i].addEventListener('click',down);
		function hover(){
			if(this.active){	
				this.classList.add('active');	
			}else{
				this.classList.add('hover');	
			}
		}
		function out(){
			if (this.active) {	
				this.classList.remove('active')	
				this.classList.add('hover');	
			}else{
				this.classList.remove('hover');
			}
		}
		function down(ev){
			var div = this.cloneNode(true);
			div.classList.remove('active');
			div.classList.remove('hover');
			div.style.top = 0;
			div.style.left = 0;
			clone.appendChild(div);
			clone.style.opacity = '0.7';
			var nowX = ev.clientX;
			var nowY = ev.clientY;
			ev.stopPropagation();
			if(ev.ctrlKey){

			}else{
				for (var i = 0; i < icon.length; i++) {
					icon[i].classList.remove('active');
					icon[i].classList.remove('hover');
					icon[i].active = 0;
				}
			}						
			this.classList.add('active');
			this.active = 1;
			var elTop = css(icon[this.index],'top');
			clone.style.top = css(icon[this.index],'top');
			var elLeft = css(icon[this.index],'left');
			var elIndex = this.index;
			console.log(div);
			document.addEventListener('mousemove',drag);
			function drag(ev){
				clone.style.display = 'block';
				clone.style.top = elTop + (ev.clientY-nowY) + 'px';
				clone.style.left = elLeft + (ev.clientX-nowX) + 'px';

			}
			document.addEventListener('mouseup',up);
			function up(){
				icon[elIndex].style.top = Math.round(css(icon[elIndex],'top')/104)*104+'px';
				icon[elIndex].style.left = Math.round(css(icon[elIndex],'left')/76)*76+'px';
				document.removeEventListener('mousemove',drag);
				clone.innerHTML = '';
				clone.style.display = 'none';
			}
		}
	}
}

position();//里面包含了给元素定位，以及添加的鼠标移入变色事件,鼠标点击事件,ctrl+单机点击事件；
clickScreen();//这个里面让点击屏幕空白处清空所有图标的hover和active的效果,单词点击拖拽的效果；
