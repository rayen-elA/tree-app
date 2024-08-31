import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeComponent } from './tri.component';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
