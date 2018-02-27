/**
 * class Constructor
 * @constructor
 */
function Container() {
	this.id = 'container';
	this.className = 'container';
}

Container.prototype.render = function() {
	var div = document.createElement('div');
	div.id = this.id;
	div.className = this.className;
};

Container.prototype.remove = function() {
	var menu = document.querySelector('#menu');
	document.body.removeChild(menu);
};

/**
 * class Menu
 * @param id
 * @param className
 * @param items
 * @constructor
 */
function Menu(id, className, items) {
	Container.call(this);

	this.id = id;
	this.className = className;
	this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
	var ul = document.createElement('ul');
	ul.id = this.id;
	ul.className = this.className;

	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
			ul.appendChild(this.items[i].render());
		}
	}

	return ul;
};

/**
 * class MenuItem
 * @param link
 * @param label
 * @constructor
 */
function MenuItem(link, label) {
	Container.call(this);

	this.link = link;
	this.label = label;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.href = this.link;
	a.textContent = this.label;
	li.appendChild(a);

	return li;
};

/**
 * class SubMenu
 * @param link
 * @param label
 * @param subMenu
 * @constructor
 */
function SubMenu(link, label, subMenu) {
	Menu.call(this);

	this.link = link;
	this.label = label;
	this.subMenu = subMenu;
}

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.render = function() {
	var ul = document.createElement('ul');
	var li = document.createElement('li');
	var a = document.createElement('a');
	li.appendChild(a);
	li.appendChild(ul);
	a.href = this.link;
	a.textContent = this.label;

	for (var i = 0; i < this.subMenu.length; i++) {
		ul.appendChild(this.subMenu[i].render());
	}

	return li;
};