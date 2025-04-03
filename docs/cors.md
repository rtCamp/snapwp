# Handling CORS Issues with Static Assets

## Overview

When running a headless frontend on a different domain than your WordPress site, you may encounter [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues with static assets served directly from the WordPress server.

By default, browsers block requests to resources from a different origin unless explicitly allowed.

Built-in WordPress hooks and 3rd-party plugins such as [WPGraphQL CORS](https://github.com/funkhaus/wp-graphql-cors) or [WPGraphQL Headless Login](https://github.com/axewp/wp-graphql-headless-login) can help set proper `Access-Control-*` headers for requests generated _via_ WordPress, but loading assets such as images, fonts, and other static files accessed directly from the server may require manual configuration.

## Local Development

For local development, the easiest thing to do is to use a browser extension to disable CORS restrictions (e.g., a Chrome extension).

However, while this is a quick fix for development, it is not a viable solution for production. Instead, you should configure your web server to include the necessary CORS headers.

## Configuring CORS Headers on Server Assets

To resolve CORS issues in a production environment, configure your web server to include the necessary CORS headers. Below are configurations for **Nginx** and **Apache**.

### Apache

If using Apache, add the following configuration to your `.htaccess` file or Apache configuration:

```apacheconf
<FilesMatch "\.(js|css|woff2?|ttf|eot|svg|gif|jpg|jpeg|png|ico|webp)$">
    Header always set Access-Control-Allow-Origin "https://example.com" # Replace example.com with the frontend domain.
</FilesMatch>
```

After updating the configuration, reload Apache. E.g.,

```sh
sudo systemctl reload apache2
```

### Nginx

Add the following configuration to your Nginx server block to allow CORS for static assets:

```nginx
location ~* \.(js|css|woff2?|ttf|eot|svg|gif|jpg|jpeg|png|ico|webp)$ {
	set $cors_origin "";

	if ($http_origin ~* "^https?://(www\.)?example\.com$") {  # Replace example.com with the frontend domain
		set $cors_origin $http_origin;
	}

	add_header 'Access-Control-Allow-Origin' "$cors_origin";
}
```

After updating the configuration, reload Nginx. E.g.,

```sh
sudo systemctl reload nginx
```

## Using SnapWP CORS Middleware

To further mitigate CORS issues, SnapWP includes a CORS middleware that proxies requests for script modules to the WordPress server. This bypasses CORS restrictions by routing requests through the Next.js server.

### Enabling the CORS Middleware

To enable the CORS proxy feature, update your `.env` file:

```dotenv
NEXT_PUBLIC_CORS_PROXY_PREFIX={prefix-value}
```
