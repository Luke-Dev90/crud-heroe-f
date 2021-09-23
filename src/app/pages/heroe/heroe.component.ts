import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroeService: HeroesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
  
    if(id == null){
      id = '';
    }

    if(id !== 'nuevo'){
      this.heroeService.getHeroe(id)
        .subscribe( (resp:any) => {
          this.heroe = resp;
          this.heroe.id = resp.id;
        });
    }
  }

  guardar( form: NgForm){

    if(form.invalid){
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando información',
      icon:'info',
      allowOutsideClick:false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id){
      peticion = this.heroeService.updatedHeroe(this.heroe);
    }else{
      peticion = this.heroeService.createHero(this.heroe);
    }
    
    peticion.subscribe( resp => {
      Swal.fire({
        title:this.heroe.name,
        text: 'Update successfully',
        icon:'success'
      });
    });
    
  }
}
