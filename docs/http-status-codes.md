# HTTP Status Codes

NextJS's App Router does not support setting custom [HTTP Status Codes](https://github.com/vercel/next.js/discussions/53225). As a result, requests to a non-existing WordPress page will return a `STATUS 200` code when returning Block Theme's 404 page.

Although Vercel insists [this doesn't affect SEO](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#status-codes), you can choose to opt-out of using the [`TemplateRenderer`](./template-rendering.md#templaterenderer) and provide your own [Not Found page](https://nextjs.org/docs/app/api-reference/functions/not-found) - or even [`redirect()`](https://nextjs.org/docs/app/api-reference/functions/redirect) to a different WordPress - or non-WordPress - route.

## Example: Using `QueryEngine.getTemplateData().is404`

SnapWP's `QueryEngine.getTemplateData()` returns an `is404` boolean to detect routes that resolve to your Block Theme's 404 page. Here's how to use it with Next.js:

```tsx
import { notFound } from 'next/navigation';
import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { QueryEngine } from '@snapwp/query';

export default async function Page( {
  params,
}: {
  params: { path?: string[] };
} ) {
  const { path } = await params;
  const pathname = path?.join( '/' ) || '/';

  const { is404 } = await QueryEngine.getTemplateData( pathname );

  if ( is404 ) {
    notFound();
  }

  return (
    <TemplateRenderer>
      { ( editorBlocks ) => (
        <EditorBlocksRenderer editorBlocks={ editorBlocks } />
      ) }
    </TemplateRenderer>
  );
}
```
