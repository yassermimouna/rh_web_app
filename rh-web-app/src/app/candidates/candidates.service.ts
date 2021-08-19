import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Candidates } from "./candidates.model";

@Injectable({providedIn: 'root'})
export class CandidatesService {
   private candidates: Candidates[] = [];

   constructor(private http: HttpClient, private router: Router) {}


   getCandidates(candidatesPerPage: number , currentPage: number){
     this.http.get<{message: string , candidates: Candidates[]}>('http://localhost:3000/api/candidates');
   }
   
   addCandidat(email: string , fullname: string, cin: string, age: string){
    /* const postData = new FormData();
    postData.append("jobtitle",jobtitle);
    postData.append("description",description);
    postData.append("skills", skills);
    postData.append("exp", exp); */
     const candidatData = {
        email : email,
        fullname: fullname,
        cin: cin,
       age: age
     }
     this.http.post<{message: string, candidat : Candidates}>('http://localhost:3000/api/candidates', candidatData)
     .subscribe((responseData)=> {
       this.router.navigate(["/"]);
     });
    }



  }