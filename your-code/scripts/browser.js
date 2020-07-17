import { DirectoryTreeNode } from './directorytreenode.js';
let rootNode = new DirectoryTreeNode();

function addChildren(rootNode, children){
  for(let child of children){
    let newNode = new DirectoryTreeNode(child.name, child.type, child.lastModifiedTime);
    rootNode.addChild(newNode);
  }
}

function updateVisualTree(element, directoryTreeNode) {

  // Create an unordered list to make a UI for the directoryTreeNode
  const ul = document.createElement('ul');
  ul.classList.add('tree');

  // Create a list element for every child of the directoryTreeNode
  for (let child of directoryTreeNode.children) {
    updateVisualTreeEntry(ul, child);
  }

  // Update the tree with the newly created unordered list.
  element.appendChild(ul);
}

function updateVisualTreeEntry(treeElement, child) {
  const li = document.createElement('li');
  li.classList.add('tree-entry');

  // Create a list element with a file icon
  if (child.type === 'file') {
    li.innerHTML = `
    <div class="tree-entry__disclosure tree-entry__disclosure--disabled></div>
    <img class="tree-entry__icon" src="./icons/file_type_${child.getIconTypeName()}.svg">
    <div class="tree-entry__name">${child.name}</div>
    <div class="tree-entry__time">${child.lastModifiedTime}</div>
    `;

    // Or create a list element with a folder icon
  } else if (child.type === 'directory') {
    li.innerHTML = `
    <div class="tree-entry__disclosure tree-entry__disclosure--closed"></div>
    <img class="tree-entry__icon" src="./icons/folder_type_${child.getIconTypeName()}.svg">
    <div class="tree-entry__name">${child.name}</div>
    <div class="tree-entry__time">${child.lastModifiedTime}</div>
    `;
  }

  // Add the newly created list element into the unordered list
  treeElement.appendChild(li);
}

function updateOverlay(status) {
  let overlay = document.getElementsByClassName('overlay')[0];
  if(status === 'error') overlay.classList.add('overlay--error');
  else overlay.classList.add('overlay--hidden');
}

window.addEventListener('DOMContentLoaded', async () =>{
  const uiTreeRoot = document.getElementById('tree-section');
  try{
    let res = await fetch("http://localhost:3001/api/path/");
    if(res.ok){
      let data = await res.json();
      addChildren(rootNode, data);
      updateOverlay();
    }
    updateVisualTree(uiTreeRoot, rootNode);
  } catch (e) {
    console.error(e);
    updateOverlay('error');
  }
});
