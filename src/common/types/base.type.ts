export interface LiteralObject<T> {
  [key: string]: T;
}

export interface IOrder {
  sort: string;
  order?: 'ASC' | 'DESC';
  nulls?: 'NULLS FIRST' | 'NULLS LAST';
}

export interface IPagination {
  skip?: number;
  take?: number;
}

export interface IServiceOptions {
  throwException?: boolean;
}

export interface IError {
  field: string | null;
  ctx: 'app' | 'field';
  message: string;
}
