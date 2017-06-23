const through = require('through2');
const gutil = require('gulp-util');
const flatmap = require('gulp-flatmap');
const path = require('path');

function compareNavItems(a, b) {
	if (a.order === b.order) {
		return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());
	}
	return a.order - b.order;
}

function findNavigationItem(navItem) {
	return this && this.title === navItem.title
}

function NavigationBuilder() {
	const _navigation = [];

	this.build = flatmap((stream, file) => {
		const data = file.data;
		data.permalink = data.permalink || path.join(path.dirname(file.path), path.basename(file.path, path.extname(file.path)) + '.html').replace(file.base, '');

		const navigationPath = data.navigationPath;
		const navigationNodes = navigationPath ? navigationPath.split(' > ').map((node) => new NavigationNode(node)) : [];
		navigationNodes.push(data);

		let workingNavigation = _navigation;

		navigationNodes.forEach((navigationNode, index, array) => {
			let navigationItem = workingNavigation.find(findNavigationItem, navigationNode);

			if (!navigationItem) {
				navigationItem = new NavigationItem(navigationNode);
				workingNavigation.push(navigationItem);
			} else {
				NavigationItem.init(navigationNode, navigationItem);
			}

			workingNavigation = navigationItem.navigation;
		});
		return stream;
	});

	Object.defineProperty(this, 'navigation', {
		get: function() {
			return _navigation;
		}
	});
}

NavigationBuilder.sortNavigation = function(navigation) {
	navigation.sort(compareNavItems).forEach((navigationItem) => {
		NavigationBuilder.sortNavigation(navigationItem.navigation);
	});

	return navigation;
};

function NavigationItem(data) {
	NavigationItem.init(data, this);
}

NavigationItem.init = function(data, navigationItem) {
	navigationItem.title = data.title || navigationItem.title || null;
	navigationItem.permalink = data.permalink || navigationItem.permalink || null;
	navigationItem.order = Number.isFinite(data.order) ? data.order : data.order || navigationItem.order || Number.MAX_VALUE;
	navigationItem.navigation = data.navigation || navigationItem.navigation || [];
}

function NavigationNode(title) {
	this.title = title || null;
}

module.exports = NavigationBuilder;
