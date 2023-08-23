import { CategoriesService } from './../categories.service';
import { Component, OnInit } from '@angular/core';
import {ProgramService} from './../program.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent{
  program: [];
  categories$;
  launchSuccess: string;
  landSuccess: string;
  launchYear: string;
  url = 'https://api.spacexdata.com/v3/launches?limit=100';

  constructor(
    route: ActivatedRoute,
    private readonly programService: ProgramService,
    categoriesService: CategoriesService) {
    programService.getAll(this.url).subscribe(res => this.program = res);
    this.categories$ = categoriesService.getCategories();
    route.queryParamMap.subscribe((params: any) => {
      this.launchSuccess = params.get('launch_success');
      this.landSuccess = params.get('land_success');
      this.launchYear = params.get('launch_year');
      let url =this.url ;
      console.log(params);
      if (params.params.launch_success){
        url = url + '&launch_success=' + params.params.launch_success;
      }
      if (params.params.land_success){
        url = url + '&land_success=' + params.params.land_success;
       }
      if (params.params.launch_year){
        url = url + '&launch_year=' + params.params.launch_year;
      }
      console.log(url);
      this.programService.getAll(url).subscribe(res => this.program = res);
    });
    }

    launchSucces(event,launch){
    const value = event.target.innerText;
    if (event.target.innerText !== null){
      let url = this.url + '&launch_success=' + value;
      this.programService.getAll(url).subscribe(res => this.program = res);
       }
     }
}