# SnapWP Frontend Framework

A turn-key Headless WordPress framework that transforms any WordPress site into a decoupled application while maintaining full Block Theme compatibility.

## Table of Contents

- [Overview](#overview)
- [System Requirements](#system-requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Documentation](#documentation)
- [Local Development & Contributing Guidelines](#local-development--contributing-guidelines)
- [License](#license)

## Overview

SnapWP is a modern headless WordPress framework that uses Block Themes as the complete source of truth for both design and content on the frontend. With an additive developer experience layer powered by WPGraphQL, it makes headless customizations a progressive enhancement rather than a complete rewrite.

## System Requirements

- Node.js 18.x or higher
- WordPress 6.0 or higher
- WPGraphQL 1.28.0 or higher
- WPGraphQL Content Blocks 4.1.0 or higher

## Getting Started

1. Install the package:
```bash
npm install @snapwp/core
```

2. Create a new Next.js project with SnapWP:
```bash
npx create-next-app@latest --example https://github.com/rtcamp/snapwp/tree/main/examples/nextjs/starter my-snapwp-app
```

3. Configure your WordPress connection:
```javascript
// snapwp.config.mjs
export default {
  wordpress: {
    url: process.env.WORDPRESS_URL
  }
}
```

4. Start development:
```bash
npm run dev
```

## Usage

SnapWP is structured as a monorepo with the following packages:

- `@snapwp/core`: Core functionality and utilities
- `@snapwp/blocks`: Block rendering and management system
- `@snapwp/next`: Next.js integration layer
- `@snapwp/query`: GraphQL query management
- Additional utility packages for development

## Features

- **Full Block Theme Support**: 
  - Complete theme.json implementation
  - All default Gutenberg content blocks
  - Global elements (headers, footers, sidebars, menus)
  - Templates, template parts, and archive pages
  - Seamless Twenty Twenty-Four theme support

- **Advanced Block Management**:
  - Built-in support for essential block types
  - Block Visibility integration
  - ACF blocks compatibility
  - Custom block development framework
  - Comprehensive block testing utilities

- **Developer Experience**:
  - Next.js-based frontend architecture
  - Flexible API approach (GraphQL/REST)
  - Extensible plugin system
  - Comprehensive testing framework
  - TypeScript support
  - Hot module replacement for development

- **WordPress Integration**:
  - Perfect FSE editor synchronization
  - Real-time preview capabilities
  - Maintains all WordPress editorial workflows
  - Complete template hierarchy support

## Documentation

- [Getting Started](docs/getting-started.md)
- [Configuration API](docs/config-api.md)
- [Middleware](docs/middleware.md)

## Local Development & Contributing Guidelines

1. Clone the repository:
```bash
git clone https://github.com/rtcamp/snapwp.git
```

2. Install dependencies:
```bash
npm install
```

For detailed development instructions and contribution guidelines, please see [DEVELOPMENT.md](DEVELOPMENT.md).

We welcome and encourage contributions from the community to help improve this project. To contribute, please follow our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## BTW, We're Hiring!

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions"></a>