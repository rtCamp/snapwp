# Introduction

🚀 SnapWP is a turnkey solution that brings the power of modern web development to WordPress, combining the flexibility of Next.js with WordPress's robust content management capabilities.

🎨 It uses Block Themes as the complete source of truth for both design and content on the frontend.

🛠️ With an additive developer experience layer powered by WPGraphQL, it makes headless customizations a progressive enhancement rather than a complete rewrite.

## Background

Headless WordPress is tough to get right. Dozens of Headless “starters” and “frameworks” have been launched over the years, yet most become abandoned sources of tech debt - including our own. Worse, almost none have had a real impact on the ecosystem.

#### Why should our solution have a different fate?

#### More importantly, how can we ensure this different fate?

The following document attempts to loosely explain our core principles and USP.

## Core Principles

### Composable Architecture

The biggest risk to any headless project is cumulative tech debt. Both the WordPress and frontend ecosystems are evolving rapidly, and we need to prevent any one feature from becoming a blocker. Similarly, we need to contend with “knowledge tech debt”, as there is little prior ecosystem art to draw on at the scope we have defined.

Adopting Composable Architecture - the development of many different libraries over a monolithic solution - addresses these risks by allowing work on individual features to occur independently. Developers don’t require knowledge of the other packages to get onboarded; features can be iterated on separately and without blocking each other; we can easily pivot while minimizing duplicate work; and we make it easier for our users to build an ecosystem around us.

_PS: Composable Architecture extends to the components and APIs themselves, too. The more pluggable/extendable our code is, the easier it is for us and the user to iterate on or adapt to specific use cases without the additional cost of tech debt or duplicate work._

### WordPress as the Source of Truth

The biggest barrier to entry for Headless WordPress is the amount of initial investment involved - manually recreating in parallel everything WordPress core gives you for free. Existing frameworks are so busy reinventing the wheel that they never get past the “basic starter” set of features, leaving end users to manually recreate the rest. Exacerbated by non-composable architecture, this initial investment is rarely made to be reusable, which leads to the process repeating itself afresh each project, or as a single project tries to maintain future-compatibility and adopt new features.

The disjointed experience also hurts the user experience, by depriving content managers of essential WordPress features and workflows. Clients are forced to choose between handicapping WordPress’s backend or continuously and meticulously replicating designs and functionality in both WordPress and their frontend of choice. This further raises the barrier to entry by limiting ideal use cases to projects with large teams and budgets, or simple projects for which Headless WordPress - in its current state is overkill.

Our approach is to use WordPress as the `source of truth` for both design and functionality. By leveraging WordPress’s existing WYSIWYG functionality to abstract away complexity from the user, we can build our solution once, and reuse the same solution across multiple projects. With the Site Editor and Global Styles, there’s no reason why Headless WordPress can’t be turn-key, and every reason that it should.

### Headless as Progressive Enhancement

No two problems are the same, and solutions are equally varied. The promise of Headless WordPress is the ability to create truly tailored solutions for your clients needs that a traditional site cannot offer, yet this is consistently hindered by existing frameworks. In the few instances that users make it past reinventing the WordPress wheel to implement unique features, they are usually required to “opt out” entirely of the framework’s functionality, leading to yet another source of tech debt and frustration.

With WordPress already as our source of truth, we’re able to make DX a first-party priority, where the goal is extending the framework instead of replacing it. Custom development becomes additive - aided by our Composable Architecture - and can focus on creating value and exploring unique use cases and experiences that don’t make sense for us to invest in on a framework level or without a paying client, but can be contributed back to feed the framework and ecosystem.

## FAQ

<details>
    <summary> Why Headless over traditional WordPress ?</summary>
    <p>
    <ul>
        <li>Frontend Flexibility: Decoupled backend (WordPress CMS) from frontend, allowing any technology for the UI (React, Next.js, etc.).</li>
        <li>Performance: Can use static site generation (SSG) or server-side rendering (SSR) for faster page loads.</li>
        <li>Content Delivery: Content can be delivered via APIs to multiple platforms (web, mobile, IoT, etc.).</li>
        <li>Customization: Full control over frontend design and integration with external services.</li>
    </ul>
    </p>
</details>

<details>
    <summary> Why React ?</summary>
    <p>In addition to it being the most popular headless frontend framework (build where the people are), it’s also WordPress’s language-of-choice.</p>
</details>

<details>
    <summary>Why NextJS ?</summary>
    <p>It’s currently the most popular React meta-framework, so the familiarity and feature completeness provide a strong extensibility DX and onramp to our project. Our use of Composable Architecture limits NextJS’s effects as a dependency, mitigating the associated tech debt risks, and allow the project to expand or even pivot to other frontends (build where the people are) at relatively minimal cost.</p>
</details>

<details>
    <summary>Why TypeScript ?</summary>
    <p>In order to prevent shipping bugs and improve developer experience (DX) and adoption, a strict type system is essential for any robust library. TypeScript, which is more powerful than JSDoc, is widely favored by enterprise clients. By writing our source code in TypeScript, we can continue to ship as .cjs/mjs while also providing TypeScript types for consumers who require them.</p>
</details>

<br/>
