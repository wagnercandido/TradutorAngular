import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao: string = 'Traduza a frase';
  public frases: Frase[] = FRASES;
  public resposta: string = '';

  rodada: number = 0;
  rodadaFrase: Frase;

  progresso: number = 0;

  tentativas: number = 3;

  @Output() encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {}

  ngOnDestroy() {}

  atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  verificarResposta() {
    
    if (this.rodadaFrase.frasePtBr == this.resposta) {

      // Trocar Pergunta da rodada
      this.rodada++

      // Atualiza progresso
      this.progresso = this.progresso + ( 100 / this.frases.length)

      if (this.rodada == 4) {
        this.encerrarJogo.emit('vitória')
      }
      
      // Atualiza o objeto rodadaFrase
      this.atualizaRodada();
      
    } else {
      // Diminuir as tentativas
      this.tentativas  = this.tentativas -1
      if (this.tentativas === -1 ) {
        this.encerrarJogo.emit('derrota')
      }
    }
    
  }
  
  atualizaRodada() {
    // Define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]

    // Limpar resposta no TextArea
    this.resposta = ''
  }

}
