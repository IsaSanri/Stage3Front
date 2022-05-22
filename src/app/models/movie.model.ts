export interface MovieListResponse {
  Response: string;
  data: { results: any; totalResults: number };
  error: boolean;
}

export interface MovieInfoInterface {
  id: string;
  poster: string;
  title: string;
  type: string;
  year: string;
  registerDate?: Date;
  comments?: string;
}

export interface MovieInterface {
  id: string;
  poster: string;
  title: string;
  type: string;
  year: string;
  registerDate?: Date;
  comments?: string;
}

export interface Options {
  value: string;
  viewValue: string;
}
