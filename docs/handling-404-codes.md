# Handling 404 Pages in SnapWP

SnapWP's `QueryEngine.getTemplateData()` returns an `is404` boolean to detect 404s. Here's how to use it with Next.js.

## 1. Fetch `is404`

In your catch-all route (`app/[[...path]]/page.tsx`), call:

```ts
const { is404 } = await QueryEngine.getTemplateData(pathname);
```

If is404 is true, call notFound() from next/navigation:

```ts
if (is404) {
  notFound();
}
```

Example:

```ts
import { notFound } from 'next/navigation';
import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { QueryEngine } from '@snapwp/query';

export default async function Page({ params }: { params: { path?: string[] } }) {
  const pathname = params.path?.join('/') || '/';
  const { is404 } = await QueryEngine.getTemplateData(pathname);

  if (is404) {
    notFound();
  };

  return (
    <TemplateRenderer>
      {({ editorBlocks }) => <EditorBlocksRenderer editorBlocks={editorBlocks} />}
    </TemplateRenderer>
  );
}
````
