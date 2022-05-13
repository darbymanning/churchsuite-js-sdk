import type { AddressBook } from "./modules/addressBook";

export type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;
export type YYYY = `19${d}${d}` | `20${d}${d}`;
export type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
export type DD = `${0}${oneToNine}` | `${1 | 2}${d}` | `3${0 | 1}`;

export type DateString = `${YYYY}-${MM}-${DD}`;
export type EmailString = `${string}@${string}.${string}`;

export type HexString = `${string | number}${string | number}${
  | string
  | number}${string | number}${string | number}${string | number}`;

export declare type BooleanAsNumber = 0 | 1 | "0" | "1";

export declare interface ExternalLink {
  tags: [] | AddressBook.Tag;
  name: string;
  url: string;
}

export interface PaginatedResponse {
  pagination: {
    no_results: number;
    page: number;
    per_page: number;
  };
}

type AssetFormat = "jpg" | "png";
type AssetUrl = `https://cdn.churchsuite.com/${string}.${AssetFormat}"`;

export interface Image {
  thumb: {
    px: 128;
    square: boolean;
    mtime: number;
    url: AssetUrl;
  };
  sm: {
    px: 256;
    square: boolean;
    mtime: number;
    url: AssetUrl;
  };
  md: {
    px: 512;
    square: boolean;
    mtime: number;
    url: AssetUrl;
  };
  lg: {
    px: 1024;
    square: boolean;
    mtime: number;
    url: AssetUrl;
  };
  original_16: AssetUrl;
  original_100: AssetUrl;
  original_500: AssetUrl;
  original_1000: AssetUrl;
  square_16: AssetUrl;
  square_100: AssetUrl;
}
