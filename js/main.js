let homeTaskList = new List("homeTasks", "#HomeTasks");
let workTaskList = new List("workTasks", "#WorkTasks");
let shoppingList = new List("shoppingList", "#Shippinglist");

homeTaskList.addItem();
workTaskList.addItem();
shoppingList.addItem();

// homeTaskList.init();
// workTaskList.init();
// shoppingList.init();

let counter = new Counter(document.querySelector('[name="quantity"]'));
counter.init()

// let watch = new CounterBackwards(document.querySelector('[name="quantity"]'));
// watch.init()


// function checkStorage(type) {
// 	try {
// 		var storage = window[type];
// 		let x = 'storage test';

// 		storage.setItem(x, x), storage.removeItem(x);
// 		return true;
// 	} catch (error) {
// 		console.error(error);
// 		return false;
// 	}
// }