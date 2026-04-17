# itch.io Plan

This project's long-term goal is a real Commodore 64 game, but the practical near-term publishing goal is a browser-playable HTML5 version that can be hosted on `itch.io`.

## Publishing Direction

- Primary near-term release target: `itch.io` HTML5 browser build
- Primary early deployment mode: private draft upload for hosted testing
- Primary monetization model: donations / tip jar
- Long-term stretch goal: C64-native version informed by the prototype

## Why itch.io Fits

- The current prototype is already built as a lightweight web project using `index.html`, `CSS`, and `JavaScript`
- It can be uploaded as an HTML5 game with a ZIP file
- It supports browser play with no install friction
- It is useful for portfolio visibility, public playtesting, and interview-ready proof of execution
- It allows donation-style support even when the game is browser playable

## Current Technical Fit

The project already aligns well with itch.io's HTML5 requirements:

- Entry point is `index.html`
- Assets are local and referenced with relative paths
- The project is currently very small and far below file-count and size limits
- No external backend or API dependency is required right now

## Packaging Plan

When ready for upload:

1. Ensure the playable build lives in a clean folder with `index.html` at the top level
2. Include all required local assets in that folder
3. ZIP the folder contents, making sure `index.html` is inside the ZIP root
4. Upload it to itch.io as an `HTML Game`
5. Keep the first upload in draft / restricted-visibility mode
6. Test the embed on the itch.io project page before any public release

## Product Strategy

### Near-term

- Build a stable and fun browser prototype
- Validate the core loop with real playtesting
- Keep controls simple and readable
- Improve presentation enough for public sharing
- Reach a state that is safe to upload privately in draft form for hosted testing

### Mid-term

- Upload a draft itch.io build and test the hosted version privately
- Use restricted sharing if we want feedback from a small test group before a public page
- Publish on itch.io as a browser-playable HTML5 game when the hosted build feels stable and presentable
- Accept donations / tips
- Use public feedback to tune systems and difficulty

### Long-term

- Decide what carries over into the C64 version
- Preserve the strongest mechanics and player behaviors
- Simplify or redesign anything that does not map well to the platform constraints

## itch.io Readiness Checklist

- Game launches correctly from `index.html`
- All assets use relative paths
- No broken file-case mismatches
- Controls are clearly explained on-screen
- The first 30 seconds are understandable without extra explanation
- The prototype is readable at embedded page size
- The game functions without relying on external services
- The ZIP build is tested locally before upload

## Hosted Test Stages

### Stage 1: Draft Upload

- Upload the game privately as a draft
- Confirm that the ZIP structure works correctly on itch.io
- Verify that the game loads, scales, and accepts input inside the hosted embed
- Catch any path, sizing, focus, or browser-hosting issues before outside testing

### Stage 2: Restricted Testing

- Share access only with selected testers if needed
- Gather feedback on clarity, controls, pacing, and first-time play experience
- Fix problems that only show up when people play without direct guidance

### Stage 3: Public Release

- Publish the page when the game is stable enough for strangers
- Add screenshots, description, controls summary, and donation framing
- Treat the public build as both a portfolio piece and an audience test

## Monetization Notes

- Browser-playable HTML5 projects on itch.io are best treated as donation-supported by default
- If we ever want stricter paid access, a downloadable build may be the better route
- For this project, donations are a good fit because they support visibility and low-friction playtesting

## Design Guidance For Future Work

- Keep the prototype lightweight
- Avoid unnecessary dependencies
- Preserve responsive layout and browser compatibility
- Treat public presentation as part of the product, not just an afterthought
- Build toward something that strangers can understand quickly

## Release Assets We Will Likely Need Later

- Cover image
- At least 2–4 screenshots or animated GIFs
- Short project description
- Control summary
- One-paragraph pitch for the game loop
- Version notes / devlog text
