import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tree-app';
  tree: TreeNode | null = null;
  treeVisService: TreeVisService;
  newValue: number | null = null;  
  searchPath: number[] = [];  
  displayPath: string = ''; 

  constructor() {
    this.treeVisService = new TreeVisService(this.tree);
 
  }

  addNode(): void {
    if (this.newValue !== null) {
      this.tree = this.treeVisService.addNode(this.tree, this.newValue);
    } else {
      console.error('New value is not defined');
    }
  }

  deleteNode(): void {
    if (this.newValue !== null) {
      this.tree = this.treeVisService.deleteNode(this.tree, this.newValue);
    } else {
      console.error('Value to delete is not defined');
    }
  }

  searchNode(): void {
    if (this.newValue !== null) {
      this.searchPath = [];
      const found = this.treeVisService.searchTreeDFS(this.tree, this.newValue, this.searchPath);
      this.displayPath = found ? this.searchPath.join(' -> ') : "Node not found";
    } else {
      console.error('Value to search is not defined');
    }
  }
}

export class TreeNode {
  private val: number|null;
  private left: TreeNode | null;
  private right: TreeNode | null;

  constructor(val: number | null) {
      if (val!==null)
      this.val = val 
      else this.val=null;
      this.left = null;
      this.right = null;
  }

  public getVal(): number | null {
      return this.val;
  }

  public setVal(val: number): void {
      this.val = val;
  }

  public getLeft(): TreeNode | null {
      return this.left;
  }

  public setLeft(left: TreeNode | null): void {
      this.left = left;
  }

  public getRight(): TreeNode | null {
      return this.right;
  }

  public setRight(right: TreeNode | null): void {
      this.right = right;
  }
}

export class TreeVisService {
  
  
  public tree: TreeNode | null;

   constructor(tree: TreeNode | null) {
       this.tree = tree;
   }
  
  public setTreeRoot(val: number, tree: TreeNode | null): TreeNode {
      const tree1 = new TreeNode(val);
      return tree1;
  }

  

  public printTree(tree: TreeNode | null): void {
      if (tree !== null) {
          console.log(tree.getVal() + " | ");
          this.printTree(tree.getRight());
          this.printTree(tree.getLeft());
      } else {
          return;
      }
  }
  public addNode(tree: TreeNode | null, val: number): TreeNode | null {
    let current: TreeNode | null = tree;
    const newNode = new TreeNode(val);

    if (tree === null) {
      return newNode; // Return new node if the tree is empty
    } else {
      while (current !== null) {
        let currentVal = current.getVal();

        if (currentVal !== null) {
          if (val < currentVal) {
            if (current.getLeft() === null) {
              current.setLeft(newNode);
              break;
            } else {
              current = current.getLeft();
            }
          } else {
            if (current.getRight() === null) {
              current.setRight(newNode);
              break;
            } else {
              current = current.getRight();
            }
          }
        } else {
          console.error('Current node value is null');
          break;
        }
      }
    }
    return tree; // Return the updated tree
  }
private searchTree(current: TreeNode | null, val: number, parent: TreeNode | null): TreeNode | boolean | null {
  while (current !== null) {
      const currentValue = current.getVal();
      
      if (currentValue === val) {
          return parent;  // Found the node, return the parent
      }

      parent = current;
      
      if (currentValue !== null && val < currentValue) {
          current = current.getLeft();   
      } else {
          current = current.getRight();  
      }
  }
  
  console.log(`Sorry, ${val} doesn't exist`);
  return false;   
}

public deleteNode(tree: TreeNode | null, val: number): TreeNode | null {
  let current = tree;
  let parent: TreeNode | null = null;

  if (tree === null) {
    console.log("Tree is empty, nothing to delete");
    return null;
  }

  const result = this.searchTree(tree, val, parent);
  if (typeof result === 'boolean') {
    return tree;
  } else {
    parent = result;
    if (parent !== null) {
      // Handle cases when the node to delete is a left or right child
      if (parent.getLeft() !== null && parent.getLeft()!.getVal() === val) {
        current = parent.getLeft();
      } else if (parent.getRight() !== null && parent.getRight()!.getVal() === val) {
        current = parent.getRight();
      }
    }
  }

  // If current is null after this point, the node to delete doesn't exist
  if (current === null) {
    console.log(`Node with value ${val} doesn't exist in the tree`);
    return tree;
  }

  // Case 1: Node to delete is a leaf node (no children)
  if (current.getRight() === null && current.getLeft() === null) {
    if (parent === null) {
      // If the node to delete is the root node
      return null;
    } else if (parent.getLeft() === current) {
      parent.setLeft(null);
    } else {
      parent.setRight(null);
    }
    return tree;
  }

  // Case 2: Node to delete has only one child
  if (current.getRight() === null) {
    if (parent !== null) {
      if (parent.getLeft() === current) {
        parent.setLeft(current.getLeft());
      } else {
        parent.setRight(current.getLeft());
      }
    } else {
      // If the node to delete is the root node
      tree = tree.getLeft();
    }
    return tree;
  } else if (current.getLeft() === null) {
    if (parent !== null) {
      if (parent.getLeft() === current) {
        parent.setLeft(current.getRight());
      } else {
        parent.setRight(current.getRight());
      }
    } else {
      // If the node to delete is the root node
      tree = tree.getRight();
    }
    return tree;
  }

  // Case 3: Node to delete has two children
  if (current.getLeft() !== null && current.getRight() !== null) {
    const smallestRightNode = this.searchSmallestNode(current.getRight()!);
    if (smallestRightNode !== null) {
      const smallestRightVal = smallestRightNode.getVal();
      if (smallestRightVal !== null) {
        current.setVal(smallestRightVal);

        if (smallestRightNode === current.getRight()) {
          if (current.getRight()!.getLeft() !== null) {
            current.getRight()!.setLeft(null);
          } else {
            current.setRight(current.getRight()!.getRight());
          }
        } else {
          if (smallestRightNode.getLeft() !== null) {
            smallestRightNode.setLeft(smallestRightNode.getLeft()!.getRight());
          } else {
            smallestRightNode.setLeft(smallestRightNode.getRight());
          }
        }
      }
    }

    return tree;
  }

  return tree;
}


public searchTreeDFS(tree: TreeNode | null, val: number, path: number[]): boolean {
  if (tree === null) return false;

  const treeVal: number | null = tree.getVal();  

  if (treeVal !== null) {  
    path.push(treeVal); 
    if (treeVal === val) return true; 

    // Recursively search the left and right subtrees
    if (this.searchTreeDFS(tree.getLeft(), val, path)) return true;
    if (this.searchTreeDFS(tree.getRight(), val, path)) return true;

    path.pop();  
  }

  return false;
}


  public searchSmallestNode(tree: TreeNode): TreeNode {
      let treeNode = tree;
      while (treeNode.getLeft() !== null) {
          while (treeNode.getLeft()!.getLeft() !== null) {
              treeNode = treeNode.getLeft()!;
          }
          if (treeNode.getLeft() !== null && treeNode.getLeft()!.getLeft() === null) break;
      }
      return treeNode;
  }
  
}


