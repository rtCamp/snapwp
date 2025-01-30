# Global Styles

Global styles can be mutated by passing `getGlobalStyles` attribute to `RootLayout` in `src/app/layout.tsx`.

`getGlobalStyles` takes an async callback function that returns an object containing global styles.

The default definition for `getGlobalStyles` function passed in `getGlobalStyles` attribute to `RootLayout` in `src/app/[[...path]]/layout.tsx`, can be found in [@snapwp/query](../packages/next/README.md) package.

Type Definition of `getGlobalStyles`:

```typescript
() => Promise< GlobalHeadProps >
```

Type definition of `GlobalHeadProps` can be found in [@snapwp/core](../packages/next/README.md) package.

# Template Data

Template data can be mutated by passing `getTemplateData` attribute to `TemplateRenderer` in `src/app/[[...path]]/page.tsx`.

`getTemplateData` takes an async callback to get template styles and content.

The default definition for `getTemplateData` function passed in `getTemplateData` attribute to `TemplateRenderer` in `src/app/[[...path]]/page.tsx`, can be found in [@snapwp/query](../packages/next/README.md) package.

Type Definition of `getTemplateData`:

```typescript
( uri: string ) => Promise< TemplateData >
```

Type definition of `TemplateData` can be found in [@snapwp/core](../packages/next/README.md) package.
