import { AfterViewInit, Component,OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserGetDTO } from 'src/app/models/userGetDTO.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule]
})
export class UsersViewComponent implements OnInit  {
  users: UserGetDTO[]
  dataSource:MatTableDataSource<UserGetDTO>;
  displayedColumns: string[] = ['Id', 'First Name', 'Last Name', 'Username','Role','Address','Phone number','Status'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: UserService) {

  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: UserGetDTO[]) => {
        this.users = data
        this.dataSource = new MatTableDataSource<UserGetDTO>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      
    })
  }
}


