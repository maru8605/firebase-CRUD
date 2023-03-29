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

  heroe = new HeroeModel();
  property: any;

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

      if ((id !== null && id) !== 'nuevo') {
        this.heroesService.getHeroe(id).subscribe((heroe: any) => {
          this.heroe = heroe;
          console.log(id)
          const idStr = id?.toString()
          this.heroe.id = idStr;
          console.log(this.heroe)
        });
      }
    
  }

  guardar(form: NgForm) {
    
    if (form.invalid) {
      console.log('Formulario no valido')
      return;
    }

    Swal.fire({
      title: 'Aguarde',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading()

    let peticion: Observable<any>

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe)
      
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe)    
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      })
    })
      
  }

}
