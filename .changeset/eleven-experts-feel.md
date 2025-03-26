---
"@snapwp/blocks": minor
"@snapwp/query": minor
"@snapwp/types": minor
"@snapwp/core": minor
"@snapwp/next": minor
"snapwp": minor
---

feat!: Add and improve robust WordPress and internal URI handling.

**Breaking Changes:**

The [Environment Variables and Config API](../docs/config-api.md) have been updated, with many of the variables renamed or removed. Please review the updated documentation for the latest changes.

| Old value | Replace with |
|----------|----------|
| NEXT_PUBLIC_URL | NEXT_PUBLIC_FRONTEND_URL |
| NEXT_PUBLIC_WORDPRESS_URL | NEXT_PUBLIC_WP_HOME_URL |
| NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH | NEXT_PUBLIC_WP_UPLOADS_DIRECTORY |
| NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX | NEXT_PUBLIC_REST_URL_PREFIX |
| getConfig().nextUrl | getConfig().frontendUrl |
| getConfig().homeUrl | getConfig().wpHomeUrl |
