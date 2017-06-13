const through = require('through2');
const gutil = require('gulp-util');
const flatmap = require('gulp-flatmap');
const path = require('path');

function findParent(navItem) {
	return flat.find((_nav) => {
		return _nav.title === navItem.parent;
	});
}

function compareNavItems(a, b) {
	if (a.order === b.order) {
		return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());
	}
	return a.order - b.order;
}

function NavigationBuilder() {
	this.navigation = [];
	this.flat = [];
	this.orphaned = [];

	const init = (file) => {
		const data = file.data;
		const baseName = path.basename(file.path, path.extname(file.path));
		const navItem = {
			title: file.data.title || baseName,
			parent: file.data.parent || null,
			permalink: file.data.permalink || path.relative('./', baseName  + '.html'),
			order: file.data.order || Number.MAX_VALUE,
			navigation: []
		}
		this.flat.push(navItem);

		if (navItem.parent) {
			const parentNav = findParent(navItem);
			if (parentNav) {
				parentNav.navigation.push(navItem);
			} else {
				this.orphaned.push(navItem);
			}
		} else {
			this.navigation.push(navItem);
		}

		// If there are orphans associated with this navigation item,
		// let's pull them into the fold.
		const foundOrphans = this.orphaned.filter((_nav) => {
			return _nav.parent === navItem.title
		});
		foundOrphans.forEach((orphanedItem) => {
			navItem.navigation.push(orphanedItem);
		});

		navItem.navigation.sort(compareNavItems);
		this.navigation.sort(compareNavItems);

	}

	this.build = flatmap((stream, file) => {
		init(file);
		return stream
	})
}

module.exports = NavigationBuilder
