import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { Cadastro } from '../cadastro/cadastro';
import { Login } from '../login/login';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, Cadastro, Login],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
