declare module 'gray-matter' {
  export interface GrayMatterResult<D = Record<string, unknown>> {
    data: D;
    content: string;
    excerpt?: string;
    orig: string | Buffer;
  }

  export default function matter(
    input: string | Buffer,
    options?: Record<string, unknown>
  ): GrayMatterResult;
}
