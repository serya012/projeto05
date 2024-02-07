import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddorcamentoPage } from './addorcamento.page';

describe('AddorcamentoPage', () => {
  let component: AddorcamentoPage;
  let fixture: ComponentFixture<AddorcamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddorcamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
