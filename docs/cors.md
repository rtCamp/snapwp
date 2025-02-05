# Handling CORS Issues with Static Assets

## Overview

When deploying a Next.js application to a different domain than your WordPress site, you may encounter Cross-Origin Resource Sharing (CORS) issues with static assets served directly from the WordPress server. By default, browsers block requests to resources from a different origin unless explicitly allowed.

WordPress plugins can help set CORS headers for certain requests, but assets such as images, fonts, and other static files accessed directly from the server may require manual configuration.

## Local Development Workarounds

For local development, you can use a browser extension to disable CORS restrictions (e.g., a Chrome extension). However, this approach is only suitable for development and should never be used in production environments.

## Configuring CORS Headers in Production

To resolve CORS issues in a production environment, configure your web server to include the necessary CORS headers. Below are configurations for **Nginx** and **Apache**.

### Nginx Configuration

Add the following configuration to your Nginx server block to allow CORS for static assets:

```nginx
location ~* \.(js|css|woff2?|ttf|eot|svg|gif|jpg|jpeg|png|ico|webp)$ {
    set $cors_origin "";
    if ($http_origin ~* "^https?://(www\.)?example\.com$") {  # Replace example.com with the frontend domain
        set $cors_origin $http_origin;
    }

    add_header 'Access-Control-Allow-Origin' "$cors_origin" always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;

    expires max;
    log_not_found off;
    access_log off;
}
```

After updating the configuration, reload Nginx:

```sh
sudo systemctl reload nginx
```

### Apache Configuration

If using Apache, add the following configuration to your `.htaccess` file or Apache configuration:

```apacheconf
<IfModule mod_headers.c>
    <FilesMatch "\.(js|css|woff2?|ttf|eot|svg|gif|jpg|jpeg|png|ico|webp)$">
        Header set Access-Control-Allow-Origin "https://example.com" # Replace example.com with the frontend domain
        Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Header set Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"
    </FilesMatch>
</IfModule>
```

After updating the configuration, reload Apache:

```sh
sudo systemctl reload apache2
```

## Using SnapWP CORS Middleware

To further mitigate CORS issues, SnapWP includes a CORS middleware that proxies requests for script modules to the WordPress server. This bypasses CORS restrictions by routing requests through the Next.js server.

### Enabling the CORS Middleware

To enable the CORS proxy feature, update your `snapwp.config.mjs` file:

```javascript
/** @type {import('@snapwp/core/config').SnapWPConfig} */
const config = {
	// Other configuration options
	useCorsProxy: true,
};

export default config;
```

### Customizing the Proxy Prefix

By default, the proxy prefix is set to `/proxy`. If needed, you can override this by specifying `corsProxyPrefix` in the configuration.

```javascript
const config = {
	useCorsProxy: true,
	corsProxyPrefix: '/custom-proxy', // Optional custom prefix
};
```
