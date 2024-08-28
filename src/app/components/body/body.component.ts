import { Component } from '@angular/core';
import { TreeNode } from '../../tree-node/tree-node';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  root: TreeNode = new TreeNode(5);

}
