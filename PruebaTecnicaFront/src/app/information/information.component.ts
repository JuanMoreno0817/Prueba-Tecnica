import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from './information.service';
import { PersonaService } from '../persona/persona.service';
import { Persona } from '../persona/persona';
import { SearchDTO } from '../persona/search-dto';
import { AlertaService } from '../alerta/alerta.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  persona: Persona[] = [];
  isEditing: boolean = false;

  constructor(private infoServi: InformationService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private perService: PersonaService,
    private alerta: AlertaService) {}

  enableEditing(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    this.infoServi.putPersona(this.persona[0]).subscribe(dato => {
      this.persona[0] = dato;
    });
    this.isEditing = false;
  }

  deletePerson(){
    const identi = Number(this.activeRouter.snapshot.paramMap.get('id'));
    this.infoServi.deletePersona(identi).subscribe({
      next: dato => {
        if (dato)
          this.alerta.showSuccess('Se elimino correctamente', 'Hecho');
        this.router.navigate(['persona']);
      },
      error: error => {
        this.alerta.showSuccess('Se elimino correctamente', 'Hecho');
        this.router.navigate(['persona']);
      }
    })
  }

  ngOnInit(): void {
    const identi = Number(this.activeRouter.snapshot.paramMap.get('id'));
    const search: SearchDTO = {
      identification: identi,
      nombre: null
    }
    this.perService.getByIdentification(search).subscribe(dato => {
      this.persona = dato;
    })
  }
}
