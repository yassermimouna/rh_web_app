import { Component , OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { PostsService } from "../posts.service";
import { Post } from "../post.model";

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
posts: Post[] = [];
  private postsSub: Subscription = new Subscription;

constructor(public postsService: PostsService){}

ngOnInit(){
   this.postsService.getPosts();
   this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
         this.posts = posts ; });
}
ngOnDestroy(){
  this.postsSub.unsubscribe();
}
}