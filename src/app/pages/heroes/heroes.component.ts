import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {

    this.cargando = true;

    this.heroeService.getHeroes()
      .subscribe(resp => {
        this.heroes = resp
        this.cargando= false
      });
  }


  deleteHeroe( heroe: HeroeModel , i:number){
    let id = heroe.id ? heroe.id:'';
    Swal.fire(
      {
        title: 'Are you sure?',
        text: ` Are you sure delete to: ${heroe.name}`,
        icon: 'question',
        showConfirmButton:true,
        showCancelButton:true
      }
    ).then( resp => {
      if(resp.value){
        this.heroes.splice(i,1);
        this.heroeService.deleteHeroe(id).subscribe();
      }
    })

    
  }
}
