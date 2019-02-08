import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMatchEditorComponent } from './quick-match-editor.component';

describe('QuickMatchEditorComponent', () => {
  let component: QuickMatchEditorComponent;
  let fixture: ComponentFixture<QuickMatchEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickMatchEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickMatchEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
