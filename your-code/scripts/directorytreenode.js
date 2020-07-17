export class DirectoryTreeNode {
  constructor(name, type, lastModifiedTime) {
    this.name = name;
    this.type = type;
    this.lastModifiedTime = lastModifiedTime;
    this.children = [];
  }

  getIconTypeName() {
    if (this.type === 'directory') {
      return this.name;
    }

    if (this.type === 'file') {
      const dotIndex = this.name.lastIndexOf('.');
      if (dotIndex >= 0) {
        return this.name.substring(dotIndex + 1).toLowerCase();
      }
      return this.name;
    }

    return '';
  }

  addChild(child) {
    this.children.push(child);
  }
}
