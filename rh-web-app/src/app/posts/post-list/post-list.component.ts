import { Component , OnDestroy, OnInit} from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { PostsService } from "../posts.service";
import { Jobform } from "../post.model";
import { AuthService } from "src/app/auth/auth.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})
export class Postlistcomp implements OnInit,OnDestroy{
/* posts = [
    {title: 'First post', content: 'This is the first post\'s content'},
    {title: 'Second post', content: 'This is the second post\'s content'},
    {title: 'Third post', content: 'This is the third post\'s content'}
  ]; */
posts: Jobform[] = [];
isLoading = false;
currentPage = 1;
totalPosts = 0;
postsPerPage= 2;
userId: any;
userIsAuthenticated = false;
private authStatusSub: Subscription = new Subscription;
pageSize = [1,2,5,10];
  private postsSub: Subscription = new Subscription;

constructor(public postsService: PostsService, private authService: AuthService){}

ngOnInit(){
  this.isLoading = true;
   this.postsService.getPosts(this.postsPerPage,this.currentPage);
   this.userId = this.authService.getUserId();
   this.postsSub = this.postsService.getPostUpdateListener()
   .subscribe((postData:{posts : Jobform[], postCount: number}) => {
         this.isLoading = false;
         this.totalPosts = postData.postCount;
         this.posts = postData.posts ;
        });
        this.userIsAuthenticated= this.authService.getIsAuth();
      this.authStatusSub =  this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
         this.userIsAuthenticated = isAuthenticated ;
         this.userId = this.authService.getUserId();
      });
}

onChangedPage(pageData: PageEvent){
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1 ;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
}
onDelete(postId: string){
  this.isLoading = true;
  this.postsService.deletePost(postId).subscribe(()=> {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  });
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
  this.authStatusSub.unsubscribe();
}
}