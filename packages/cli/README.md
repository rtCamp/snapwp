# SnapWP Setup

## Prerequisites

-   **Node.js**: v20+ (with `npm and `npx` installed).
-   **A WordPress backend** [configured with SnapWP Helper](https://github.com/rtCamp/snapwp/blob/develop/docs/getting-started.md#backend-setup).

## Using through npx

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
