import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  personForm: FormGroup;

  constructor(private infoServi: InformationService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private perService: PersonaService,
    private alerta: AlertaService) 
  {
    this.personForm = this.fb.group({
      identification: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      phone: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    const identi = Number(this.activeRouter.snapshot.paramMap.get('id'));
    const search: SearchDTO = {
      identification: identi,
      nombre: null
    }
    this.perService.getByIdentification(search).subscribe(dato => {
      this.persona = dato;
      if (this.persona.length > 0) {
        this.personForm.patchValue({
          identification: this.persona[0].identification,
          name: this.persona[0].name,
          phone: this.persona[0].phone,
          email: this.persona[0].email
        });
      }

    })
  }

  enableEditing(): void {
    this.isEditing = true;
    this.personForm.enable(); // Habilitar todos los campos del formulario
    this.personForm.get('identification')?.disable(); //Deshabilita solo Identification
  }

  saveChanges(): void {
    if (this.personForm.valid) {
      this.persona[0] = {
        ...this.persona[0],
        ...this.personForm.value
      }; //Acá sobreescribimos los datos
    }
    this.infoServi.putPersona(this.persona[0]).subscribe(dato => {
      this.persona[0] = dato;
      this.personForm.disable();
      this.alerta.showSuccess('Se actualizo correctamente.','Hecho')
    });
  }

  deletePerson(){
    const identi = Number(this.activeRouter.snapshot.paramMap.get('id'));
    this.infoServi.deletePersona(identi).subscribe({
      next: dato => {
        if (dato){
          this.alerta.showSuccess('Se elimino correctamente', 'Hecho');
          this.router.navigate(['persona']);
        }
      },
      error: error => {
        this.alerta.showError(error.message, 'Error');
      }
    })
  }
}
