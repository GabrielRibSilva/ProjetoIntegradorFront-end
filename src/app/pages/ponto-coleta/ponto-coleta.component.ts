import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PontoColetaService } from '../../services/ponto-coleta.service';
import { BairroService } from '../../services/bairro.service';
import { UsuarioService } from '../../services/usuario.service';
import { ResiduoService } from '../../services/residuo.service';
import { PontoColeta } from '../../models/ponto-coleta.model';
import { Bairro } from '../../models/bairro.model';
import { Usuario } from '../../models/usuario.model';
import { Residuo } from '../../models/residuo.model';

@Component({
  selector: 'app-ponto-coleta',
  templateUrl: './ponto-coleta.component.html',
  styleUrls: ['./ponto-coleta.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PontoColetaComponent implements OnInit {
  pontosColeta: PontoColeta[] = [];
  bairros: Bairro[] = [];
  usuarios: Usuario[] = [];
  residuos: Residuo[] = [];
  pontoColeta: PontoColeta = {
    id: 0,
    nome: '',
    endereco: '',
    bairro: {
      id: 0,
      nome: ''
    },
    usuario: {
      id: 0,
      nome: '',
      email: '',
      telefone: ''
    },
    residuo: {
      id: 0,
      tipo: ''
    }
  };

  constructor(
    private pontoColetaService: PontoColetaService,
    private bairroService: BairroService,
    private usuarioService: UsuarioService,
    private residuoService: ResiduoService
  ) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.pontoColetaService.listarPontosColeta().subscribe(
      data => this.pontosColeta = data,
      error => console.error('Erro ao carregar pontos de coleta:', error)
    );

    this.bairroService.listarBairros().subscribe(
      data => this.bairros = data,
      error => console.error('Erro ao carregar bairros:', error)
    );

    this.usuarioService.listarUsuarios().subscribe(
      data => this.usuarios = data,
      error => console.error('Erro ao carregar usuários:', error)
    );

    this.residuoService.listarResiduos().subscribe(
      data => this.residuos = data,
      error => console.error('Erro ao carregar resíduos:', error)
    );
  }

  salvarPontoColeta(): void {
    if (this.pontoColeta.id) {
      this.pontoColetaService.atualizarPontoColeta(this.pontoColeta.id, this.pontoColeta).subscribe(
        () => {
          this.carregarDados();
          this.limparFormulario();
        },
        error => console.error('Erro ao atualizar ponto de coleta:', error)
      );
    } else {
      this.pontoColetaService.criarPontoColeta(this.pontoColeta).subscribe(
        () => {
          this.carregarDados();
          this.limparFormulario();
        },
        error => console.error('Erro ao criar ponto de coleta:', error)
      );
    }
  }

  editarPontoColeta(ponto: PontoColeta): void {
    this.pontoColeta = { ...ponto };
  }

  deletarPontoColeta(id: number): void {
    if (confirm('Tem certeza que deseja excluir este ponto de coleta?')) {
      this.pontoColetaService.deletarPontoColeta(id).subscribe(
        () => this.carregarDados(),
        error => console.error('Erro ao deletar ponto de coleta:', error)
      );
    }
  }

  limparFormulario(): void {
    this.pontoColeta = {
      id: 0,
      nome: '',
      endereco: '',
      bairro: {
        id: 0,
        nome: ''
      },
      usuario: {
        id: 0,
        nome: '',
        email: '',
        telefone: ''
      },
      residuo: {
        id: 0,
        tipo: ''
      }
    };
  }
} 