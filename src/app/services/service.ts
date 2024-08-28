import {TreeNode} from '../tree-node/tree-node';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
µ

@Injectable({
  providedIn: 'root',
})
 export class TreeVisService {
    private treeData = new BehaviorSubject<TreeNode | null>(null); // Holds the tree data

  currentTreeData = this.treeData.asObservable(); // Observable for components to subscribe to

  updateTreeData(newData: TreeNode): void {
    this.treeData.next(newData); // Update the BehaviorSubject with the new data
  }
  
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

    public addNode(tree: TreeNode | null, val: number): void {
        let current:TreeNode|null = tree;
        const newNode = new TreeNode(val);
        let parent: TreeNode | null;

        if (tree === null) {
            tree = newNode;
        } else {
            while (true) {
                parent = current!;
                if(current==null){
                    
                    const currentVal = current.getVal();
                }
                
                if( currentVal!==null){
                    if (val < currentVal) {
                        current = current!.getLeft();
                        if (current === null) {
                            parent.setLeft(newNode);
                            break;
                        }
                    } else {
                        current = current!.getRight();
                        if (current === null) {
                            parent.setRight(newNode);
                            break;
                        }
                    }
                }
                else{
                    console.error('Current node value is null');
                    break;
                }
                
            }
        }

        console.log("");
    }

    private searchTree(current: TreeNode, val: number, parent: TreeNode | null): TreeNode | boolean {
        while (true) {
            if (current.getVal() === val) {
                return parent!;
            }
            parent = current;
            if (val < current.getVal()) {
                current = current.getLeft()!;
                if (current === null) {
                    console.log(`Sorry, ${val} doesn't exist`);
                    return false;
                }
            } else {
                current = current.getRight()!;
                if (current === null) {
                    console.log(`Sorry, ${val} doesn't exist`);
                    return false;
                }
            }
        }
    }

    public deleteNode(tree: TreeNode | null, val: number): TreeNode | null {
        let current = tree;
        let parent: TreeNode | null = null;

        if (tree === null) {
            console.log("Tree is empty, nothing to delete");    
        } else {
            const result = this.searchTree(tree, val, parent);
            if (typeof result === 'boolean') {
                return tree;
            } else {
                parent = result;
                if (parent !== null) {
                    if (parent.getLeft() !== null && parent.getLeft()!.getVal() === val) {
                        current = parent.getLeft();
                    }
                    if (parent.getRight() !== null && parent.getRight()!.getVal() === val) {
                        current = parent.getRight();
                    }
                }
            }

            if (current!.getRight() === null && current!.getLeft() === null) {
                if (parent === null) {
                    return null;
                } else if (parent.getLeft() === current) {
                    parent.setLeft(null);
                } else {
                    parent.setRight(null);
                }
                return tree;
            }

            if (current!.getRight() === null && current!.getLeft() !== null) {
                if (parent !== null) {
                    if (parent.getLeft() === current) {
                        parent.setLeft(current!.getLeft());
                    } else {
                        parent.setRight(current!.getLeft());
                    }
                } else {
                    tree = tree!.getLeft();
                }
                return tree;
            } else if (current!.getLeft() === null && current!.getRight() !== null) {
                if (parent !== null) {
                    if (parent.getLeft() === current) {
                        parent.setLeft(current!.getRight());
                    } else {
                        parent.setRight(current!.getRight());
                    }
                } else {
                    tree = tree!.getRight();
                }
            }

            if (current!.getLeft() !== null && current!.getRight() !== null) {
                if (parent === null) {
                    const x = this.searchSmallestNode(current!.getRight()!);
                    current!.setVal(x.getVal());
                    if (x.getLeft() !== null) {
                        x.getLeft()!.setRight(x.getRight());
                        current!.setRight(x.getLeft());
                    } else {
                        current!.setRight(x.getRight());
                    }
                    return tree;
                } else {
                    const treeNode = this.searchSmallestNode(current!.getRight()!);
                    if (treeNode === current!.getRight()) {
                        if (current!.getRight()!.getLeft() !== null) {
                            current!.setVal(current!.getRight()!.getLeft()!.getVal());
                            current!.getRight()!.setLeft(null);
                        } else {
                            current!.setVal(current!.getRight()!.getVal());
                            current!.setRight(current!.getRight()!.getRight());
                        }
                    } else {
                        current!.setVal(treeNode.getLeft()!.getVal());
                        treeNode.setLeft(treeNode.getLeft()!.getRight());
                    }
                }
                return tree;
            }
        }
        return tree;
    }

    public searchTreeDFS(tree: TreeNode | null, val: number, path: number[]): boolean {
        if (tree === null) return false;
        path.push(tree.getVal());
        if (tree.getVal() === val) return true;
        if (this.searchTreeDFS(tree.getRight(), val, path)) return true;
        if (this.searchTreeDFS(tree.getLeft(), val, path)) return true;
        path.pop();
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


