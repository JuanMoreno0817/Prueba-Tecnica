import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchDTO } from './search-dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { AlertaService } from '../alerta/alerta.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent implements OnInit{

  personas: Persona[] = [];
  page: number = 1;

  filterForm: FormGroup;

  selectedFile: File | null = null;

  constructor(private personaServicio: PersonaService,private alerta: AlertaService, private router: Router,private fb: FormBuilder){
    this.filterForm = this.fb.group({
      searchTerm: [null]
    })
  }

  ngOnInit(): void {
    this.personaServicio.getInfo().subscribe(datos =>{
      this.personas = datos;
    });

    this.filterForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.getPersonsByFilter(); 
    });
  }

  information(identification: number) : void{
    this.router.navigate(['/information', identification]);
  }

  getPersonsByFilter(){
    const searchTerm = this.filterForm.get('searchTerm')?.value;

    const filters: SearchDTO = {
      identification: null,
      nombre: null
    };

    if (searchTerm && !isNaN(searchTerm)) {
      filters.identification = Number(searchTerm);
      this.personaServicio.getByIdentification(filters).subscribe(data => {
        this.personas = data;
      })
    } else {
      filters.nombre = searchTerm;
      this.personaServicio.getByName(filters).subscribe(data => {
        this.personas = data;
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.personaServicio.uploadCsv(this.selectedFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            const responseMessage = event.body as string;
            this.alerta.showSuccess('Archivo cargado con éxito', responseMessage);
          }
        },
        error: (err) => {
          this.alerta.showError('Error al cargar el archivo:', err);
        }
      });
    } else {
      this.alerta.showError('No haz seleccionado ningún archivo.', 'Error');
    }
  }
}
