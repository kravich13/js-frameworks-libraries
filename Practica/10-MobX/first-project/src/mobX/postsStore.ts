import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { IPost } from '../interfaces';

class PostsStore {
  posts: IPost[] = [];
  asyncPosts: IPost[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  downloadPosts() {
    this.loading = true;

    setTimeout(() => {
      this.asyncPosts = [
        { id: nanoid(), title: 'Vlad' },
        { id: nanoid(), title: 'Max' },
        { id: nanoid(), title: 'Kate' },
        { id: nanoid(), title: 'Kravich' },
        { id: nanoid(), title: 'What is your salary?' },
      ];
      this.loading = false;
    }, 2000);
  }

  createPost(value: string) {
    this.posts.push({ id: nanoid(), title: value });
  }

  get total() {
    return this.asyncPosts.length + this.posts.length;
  }
}

export const postsStore = new PostsStore();
