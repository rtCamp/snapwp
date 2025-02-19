# 🫰 SnapWP

A better way to build headless WordPress applications.

## What is SnapWP?

[SnapWP](https://snapwp.io) is a composable framework of JavaScript libraries for building headless WordPress applications.

-   🎨 It uses WordPress's [Block Themes](https://wordpress.org/documentation/article/block-themes/) as the default source of truth for both design and content on the frontend.

-   🛠️ It provides an additive and adaptable DX layer / API / tooling that lets developers granularly override just the parts of their app they care about.

SnapWP treats headless WordPress as a progressive enhancement, providing a "turn-key" experience for parity with traditional WordPress sites, so you can focus on building the unique and custom features that make your project stand out.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.
> Learn more in the [SnapWP monorepo](https://github.com/rtCamp/snapwp).

## Prerequisites

-   **Node.js**: v20+ (with `npm and `npx` installed).
-   **A WordPress backend** [configured with SnapWP Helper](https://github.com/rtCamp/snapwp/blob/develop/docs/getting-started.md#backend-setup).

## Commands

### `npx snapwp`

To create a new headless WordPress app using SnapWP, follow these steps:

1. Run the scaffolding wizard:

    ```bash
    npx snapwp
    ```

2. Answer the CLI prompts:

    1. Enter the path to the directory where you want to create the app, e.g. `./my-headless-app`
    2. Create an Environment File:

        1. Paste the .env contents from `Dashboard > WPGraphQL > Settings > SnapWP Helper into the file created.

         <a href="https://github.com/rtCamp/snapwp/blob/develop/docs/images/snapwp-helper-env.png">
           <!--@todo: link to snapwp-helper repo for image-->
           <img src="https://raw.githubusercontent.com/rtCamp/snapwp/refs/heads/develop/docs/images/snapwp-helper-env.png" alt="Example environment variables from SnapWP Helper plugin screen." style="width: 300px;">
           <p> Example environment variables from SnapWP Helper plugin screen. (Click for full screen)</p>
         </a>

        2. Uncomment and update the `NEXT_PUBLIC_URL` variable to match the URL of your frontend app, and adjust any other environment variables as needed.
        3. Save the file and close the editor.

    3. Return to the terminal and press `Enter` to continue the setup process.

3. Start your SnapWP app:
    1. Navigate to the newly created app.
    2. Run `npm install`.
    3. Run `npm run dev` (for development) or `npm run build && npm run start` (for production)
    4. Visit the `NEXT_PUBLIC_URL` from `.env` (updated in Step 2), in your browser to see SnapWP in action!

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## BTW, We're Hiring!

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions"></a>
