declare module "deno" {
  export type File = number;
  export type Reader = { read(p: Uint8Array): Promise<number | null> };
  export type Writer = { write(p: Uint8Array): Promise<number> };
  export type Closer = { close(): void };

  export function open(path: string, options?: OpenOptions): Promise<File>;
  export function create(
    path: string,
    options?: CreateOptions
  ): Promise<File>;

  export interface OpenOptions {
    read?: boolean;
    write?: boolean;
    append?: boolean;
    truncate?: boolean;
    create?: boolean;
    createNew?: boolean;
  }

  export interface CreateOptions {
    read?: boolean;
    write?: boolean;
    append?: boolean;
    truncate?: boolean;
    create?: boolean;
    createNew?: boolean;
  }

  export function read(file: File, p: Uint8Array): Promise<number | null>;
  export function write(file: File, p: Uint8Array): Promise<number>;
  export function close(file: File): void;

  export function copy(src: string | URL, dest: string | URL): Promise<void>;
  export function remove(path: string): Promise<void>;

  export function readDir(path: string): AsyncIterable<DirEntry>;

  export interface DirEntry {
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
  }
}