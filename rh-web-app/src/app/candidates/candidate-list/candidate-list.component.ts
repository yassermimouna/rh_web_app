import { Component , OnDestroy, OnInit} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Candidates } from "../candidates.model";
import { CandidatesService } from "../candidates.service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidates: Candidates[] = [];
  postId : any;
  isLoading = false;
  candidateId: any;
  currentPage = 1;
  totalcandidates = 0;
  candidatesPerPage = 10;
  pageSize = [1,2,5,10];
  jobTitle: any;

  constructor(public candidatesService: CandidatesService,
    public route: ActivatedRoute) { }

  ngOnInit(){
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
         this.postId = paramMap.get('postId');
         this.jobTitle = paramMap.get('title');
         this.isLoading = true;
         this.candidatesService.getCandidates(this.candidatesPerPage,this.currentPage,this.postId)
     .subscribe( candidatesData => {

      this.totalcandidates = candidatesData.maxCandidates;
      this.candidates = candidatesData.candidates ;
      this.isLoading = false;
     /*  console.log(this.candidates[0].id); */
     });
    });
  }

  onDelete(candidateId: string){
  /*   console.log(candidateId); */
    this.isLoading = true;
    this.candidatesService.deleteCandidate(candidateId).subscribe(()=> {
      this.candidatesService.getCandidates(this.candidatesPerPage, this.currentPage,this.postId)
      .subscribe( candidatesData => {

        this.totalcandidates = candidatesData.maxCandidates;
        this.candidates = candidatesData.candidates ;
        this.isLoading = false;
       /*  console.log(this.candidates[0].id); */
       });

    });

  };


}
