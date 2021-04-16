if(document.readyState == "loading"){
	document.addEventListener('DOMContentLoaded', App);
}else{
	App();
}


function App(){
	//common variables
	let defaultIndex = 1,
		defaultPost = 2,
		listData = [
			{
				"title": "Ichigo"
			},
			{
				"title": "Madara"
			},
			{
				"title": "Miku"
			},
			{
				"title": "Zoro"
			},
			{
				"title": "2B"
			},
			{
				"title": "Kirishima"
			}
		]
		pageIndex = Math.ceil(listData.length/defaultPost);

	let	wrapper = document.querySelector('.wrapper');

	//create ul List
	let	listDiv = document.createElement('ul');
		listDiv.classList.add('listStyle01');
		wrapper.append(listDiv);

	//select list container
	let	listWrapper = document.querySelector('.listStyle01');

	//create pagination div
	let pagiDiv = document.createElement('div');
		pagiDiv.classList.add('pagination');
		wrapper.append(pagiDiv);

	//select pagination container
	let pagiWrapper = document.querySelector('.pagination');

	showPosts(listData, 0, defaultPost);
	pagination(defaultIndex, pageIndex);

	function showPosts(listData, startPos, endPost){
		listWrapper.innerHTML = '';

		listData.slice(startPos, endPost).map(post => {
			listWrapper.innerHTML = listWrapper.innerHTML + (`<li data-index=${post.key}><a href="#">${post.title}</a></li>`);
		})
	}

	function getCurrentIndex(){
		let pageButton = document.querySelectorAll('.page');
		let currentIndex;
		pageButton.forEach(button => {
			if(button.classList.contains('current')){
				currentIndex = Number(button.innerText);
			}
		})
		return currentIndex;
	}

	function createControlButton(direction){
		let controlButton = document.createElement('button');
		controlButton.classList.add('controlBtn', `controlBtn-${direction}`);

		(direction == "prev") ? controlButton.innerText = "◄ Prev" : controlButton.innerText = "Next ►";

		controlButton.addEventListener('click', function(){
			controlIndexChange(direction);
		});
		return controlButton;	
	}

	function controlIndexChange(direction){
		let pageList = document.querySelectorAll('.page');
		const current = getCurrentIndex();
		(direction == "next") ? pagination(current+1) : pagination(current-1);
	}

	function pagination(index, pageLen=pageIndex){
		pagiWrapper.innerHTML = '';
		let current = index,
			last = pageLen,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l = null;
		for(let i=1; i<=last; i++){
			if(i == 1 || i == last || i >= left && i < right){
				range.push(i);
			}
		}

		for(let i of range){
			if(l){
				if(i-l === 2){
					rangeWithDots.push(l+1);
				}else if(i-l !== 1){
					rangeWithDots.push('...');
				}
			}
			rangeWithDots.push(i);
			l = i;
		}

		for(let i=0; i<rangeWithDots.length; i++){
			let page = document.createElement('button');
				if(rangeWithDots[i] == current){
					page.classList.add('page', 'current');
				}else if(rangeWithDots[i] == '...'){
					page.addEventListener('click', e => e.preventDefault());
					page.classList.add('page');
				}else{
					page.classList.add('page');
					page.addEventListener('click', changePageIndex);
				}	
				page.innerHTML = rangeWithDots[i];
				pagiWrapper.append(page);
		}
		//re-render Post
		showPosts(listData, (current*defaultPost)-defaultPost, (current*defaultPost));

		//Show control button
		if(pageIndex >= 1){
			pagiWrapper.append(createControlButton("next"));
			pagiWrapper.prepend(createControlButton("prev"));
		}
    
		//handle button display
		let prevButton = document.querySelector('.controlBtn-prev');
		let nextButton = document.querySelector('.controlBtn-next');
		if(pageLen <= 1){
			prevButton.style.display = "none";
			nextButton.style.display = "none";
		}else if(current == 1){
			prevButton.style.display = "none";
			nextButton.style.display = "inline-block";
		}else{
			prevButton.style.display = "inline-block";
			nextButton.style.display = "inline-block";
			if(pageLen == current){
				nextButton.style.display = "none";
			}
		}

	}

	function changePageIndex(event){
		let clickedItem = Number(event.target.innerText);
		pagination(clickedItem);
	}

	function listDataGenerator(){
		let listDataArray = [];

		ajaxPromise("module/shop/controller/controller_shop.php", "POST", {order: 'mostVisited'})
		.then((data)=>{
			console.log(data[0].name);
			for(let i=0; i<6; i++){
				listDataArray[i] = {key: i, title: data[i].name};
			}
			console.log(listDataArray);
			return listDataArray;
		})
	}
}