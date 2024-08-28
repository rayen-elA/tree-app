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
