export interface BlogPost {
  title: string;
}


export interface GitHub {
  title: string;
}

export interface ArticleAuthor {
  name: string;
}


export interface ArticleResourceInfo {
  title?: string;
  description?: string;
  n_stars?: number;
  framework?: string;
  topics?: string[];
}


export interface ArticleResource {
  id: string;
  url: string;
  rating: number;
  type: string;
  is_like: boolean;
  info: ArticleResourceInfo;
}

export interface SummarySentence {
  id: string;
  sentence: string;
  isLike?: boolean;
  nLikes: number;
}


export interface Article {
  id: string;
  title: string;
  abstract: string;
  url: string;
  blog_posts?: ArticleResource[];
  githubs?: ArticleResource[];
  date: Date;
  category: string;
  arxiv_id: string;
  note: string;
  in_lib: string;
  like_dislike: boolean;
  authors: ArticleAuthor[];
  has_neighbors: boolean;
  summary?: SummarySentence[];
}
