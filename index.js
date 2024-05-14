import { createElement } from 'react';

const Markdown = ({content}) => {
	if (!content) return null;

	const lines = content.split('\n');
	const elements = [];

	let currentListItems = [];

	const pushCurrentList = (index) => {
		if (currentListItems.length > 0) {
			elements.push(createElement('ul', {key: index}, currentListItems));
			currentListItems = [];
		}
	};

	lines.forEach((line, index) => {
		if (line.startsWith('# ')) {
			pushCurrentList(index);
			elements.push(createElement('h1', {key: index}, line.slice(2)));
		} else if (line.startsWith('## ')) {
			pushCurrentList(index);
			elements.push(createElement('h2', {key: index}, line.slice(3)));
		} else if (line.startsWith('### ')) {
			pushCurrentList(index);
			elements.push(createElement('h3', {key: index}, line.slice(4)));
		} else if (line.startsWith('- ')) {
			currentListItems.push(createElement('li', {key: index}, line.slice(2)));
		} else if (line.match(/\[(.+)\]\((.+)\)/)) {
			pushCurrentList(index);
			const match = line.match(/\[(.+)\]\((.+)\)/);
			elements.push(createElement('p', {key: index}, createElement('a', {href: match[2]}, match[1])));
		} else if (line.trim() === '') {
			pushCurrentList(index);
			elements.push(createElement('br', {key: index}));
		} else {
			pushCurrentList(index);
			elements.push(createElement('p', {key: index}, line));
		}
	});

	// Push any remaining list items
	pushCurrentList(lines.length);

	return elements;
};

export default Markdown;