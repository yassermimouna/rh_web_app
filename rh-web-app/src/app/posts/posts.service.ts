import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { Jobform } from "./post.model";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Jobform[] = [];
  private postsUpdated = new Subject<{posts: Jobform[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number , currentPage: number){
    const queryParams = '?pagesize=${postsPerPage}&page=&{currentPage}';
    this.http.get<{message:string,posts: any, maxPosts: number}>("http://localhost:3000/api/posts/" + queryParams)
    .pipe(map((postData)=>{
         return {posts: postData.posts.map((post: any) => {
           return {
                   jobtitle: post.jobtitle,
                   description: post.description,
                   id: post._id,
                   skills: post.skills,
                   exp: post.exp,
                   creator: post.creator
                  };
         }),
         maxPosts: postData.maxPosts
         };
        })
    )
    .subscribe(transformedPostData=>{
      console.log(transformedPostData);
    this.posts = transformedPostData.posts;
    this.postsUpdated.next({
      posts : [...this.posts],
      postCount: transformedPostData.maxPosts
    });
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id:string){
   return this.http
   .get<{
     _id:string;
     jobtitle : string;
     description: string;
     skills: string;
     exp: string;
     creator: string;
    }>(
     "http://localhost:3000/api/posts/" + id);
  }


  addPost(jobtitle: string, description: string, skills: string, exp: string) {
    /* const postData = new FormData();
    postData.append("jobtitle",jobtitle);
    postData.append("description",description);
    postData.append("skills", skills);
    postData.append("exp", exp); */
    const postData = {
      jobtitle: jobtitle,
      desc: description,
      skills: skills,
      exp: exp
    }
    this.http.post<{ message: string, post: Jobform }>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, jobtitle: string, description: string, skills:string, exp: string){
     let postData: Jobform | FormData;
    /* if(typeof image ==="object"){
      postData = new FormData();
      postData.append("id",id);
       postData.append("title",title);
       postData.append("content", content);
       postData.append("image",image,title);
     }else { */
       postData = {
         id: id,
         jobtitle: jobtitle,
         description : description,
         skills: skills,
         exp: exp,
         creator: ''
       };
        // }
        this.http.put("http://localhost:3000/api/posts/" + id, postData)
        .subscribe(response =>{
           this.router.navigate(["/"]);
        });
  }

deletePost(postId: string){
  return this.http
  .delete("http://localhost:3000/api/posts/" + postId);
}

}