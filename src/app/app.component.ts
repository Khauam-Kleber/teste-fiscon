import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource,} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
 
  form: any;
  listaCadastrados: any = []
  displayedColumns: string[] = ['id', 'nome', 'telefone'];
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<any>();

  constructor(private formBuilder:FormBuilder) { 
    this.criarForm();
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  criarForm(){
    this.form = this.formBuilder.group({
      id: [],
      nome:  ['', Validators.required ],
      telefone: ['', Validators.required ],
    });
  }

  get formControls() { return this.form.controls; }

  criarEPreencherTabela(){
    if (this.form.invalid) {
      return;
    }

    this.form.get('id').setValue(this.listaCadastrados.length + 1)
    this.listaCadastrados.push(this.form.value)
    this.form.reset()
    this.dataSource = new MatTableDataSource(this.listaCadastrados );
    this.table.renderRows();

    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  limparForm(){
    this.form.reset()
  }

  removeData() {
    this.listaCadastrados.pop();
    this.dataSource = new MatTableDataSource(this.listaCadastrados );
    this.table.renderRows();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}