export interface BlogPost {
  title: string;
}


export interface GitHub {
  title: string;
}

export interface ArticleAuthor {
  name: string;
}


export interface Article {
  id: string;
  title: string;
  abstract: string;
  url: string;
  blog_posts?: BlogPost[];
  githubs?: GitHub[];
  date: Date;
  category: string;
  arxiv_id: string;
  note: string;
  in_lib: string;
  like_dislike: boolean;
  authors: ArticleAuthor[];
}
