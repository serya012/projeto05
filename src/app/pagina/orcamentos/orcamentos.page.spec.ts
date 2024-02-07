import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrcamentosPage } from './orcamentos.page';

describe('OrcamentoPage', () => {
  let component: OrcamentosPage;
  let fixture: ComponentFixture<OrcamentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrcamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
