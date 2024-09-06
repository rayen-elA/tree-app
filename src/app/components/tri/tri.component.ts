import { Component,Input } from '@angular/core';
import { TreeNode } from '../../app.component'
@Component({
  selector: 'app-tree-node',
  templateUrl: './tri.component.html',
  styleUrls: ['./tri.component.css']
})


  export class TreeNodeComponent {
    @Input() node: TreeNode | null = null;
  }
  

