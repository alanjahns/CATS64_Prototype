# CATS Prototype

`CATS` is a top-down action-strategy game about managing a fenced yard full of hungry cats before the situation turns into total chaos.

This `prototype` directory is for the modern first-pass version of the game. We will use JavaScript or Python here to quickly test gameplay, pacing, controls, crowd behavior, and overall fun before deciding how to port the project back to a more C64-authentic implementation.

## Game Summary

The player moves around a fenced yard and tries to keep order while cats gather around food, crowd the play space, and create escalating problems. Some cats are friendly and mainly need feeding and management. Others are feral and eventually need to be trapped, processed through TNVR, and released. Ear-tipped cats show which ones have already been handled.

The game should feel hectic, readable, and strategic rather than realistic or slow. The tension comes from placing food at the right moments, moving carefully, preventing traffic jams, and recovering quickly when a food spill or cat crowd throws the yard out of control.

## Core Pillars

- Top-down retro-style action with readable movement and clear spatial decisions
- Crowd management instead of direct combat
- Escalation from calm feeding to layered chaos
- Distinct cat states: friendly, feral, trapped, processed, ear-tipped
- Short feedback loops so the player is always reacting, repositioning, or planning ahead

## Core Gameplay

- The play area is a fenced yard viewed from above
- The player moves with keyboard or joystick-style controls
- Food can be placed to attract cats toward a target location
- Cats path toward nearby food and bunch up around it
- Placed food now ages through fresh, drying, and spoiled states instead of vanishing on a short timer
- The run now begins from a start screen with `Easy`, `Medium`, and `Hard` starting pressure choices
- Overcrowding can block movement, surround the player, or create risk
- A cat can trip the feeder and spill food, causing sudden disorder
- Additional cats appear over time, increasing yard pressure
- Friendly cats and feral cats should feel behaviorally different
- Traps can be placed to capture feral cats
- Captured cats are processed and released through the TNVR loop
- Ear-tipped cats visually indicate previously fixed cats
- The challenge comes from timing, movement, placement, and crowd control

## Player Goals

- Keep the yard manageable
- Feed cats efficiently without creating impossible crowding
- Avoid getting trapped, blocked, or overwhelmed
- Use traps intelligently on feral cats
- Gradually improve the state of the yard through TNVR
- Survive increasing pressure long enough to feel mastery over the system

## Failure Pressure

- Too many cats on screen at once
- Bad food placement that pulls cats into choke points
- Spilled food creating extra clustering and disorder
- Movement paths blocked by cat crowds
- Feral cats remaining unmanaged for too long
- The player losing control of the yard's flow and tempo

## Main Systems To Prototype

### 1. Movement and space

- Player movement speed and responsiveness
- Yard layout and choke points
- Collision rules between player, cats, fences, traps, and feeders
- How crowding affects pathing and player navigation

### 2. Cat behavior

- Idle wandering
- Food detection radius
- Attraction and pathing toward placed food
- Grouping behavior around food
- Friendly vs feral behavioral differences
- State changes after trapping and release

### 3. Chaos events

- Feeder trip or food spill event
- Cat fights that briefly pull cats away from normal behavior and create a short response window
- Temporary disorder spikes
- Recovery windows for the player
- How often chaos happens and whether it feels fair

### 4. Trap and TNVR loop

- Trap placement rules
- Capture conditions
- Processing flow
- Return or release state
- Ear-tip visual state and persistent identity for handled cats

### 5. Difficulty ramp

- Start-screen difficulty choice that sets initial cat count and initial spawn burst size
- Spawn rate over time
- Ratio of friendly to feral cats
- Increasing crowd density
- Overlapping events creating higher stress
- Balancing pressure so the game gets tense without becoming unreadable

## Difficulty And Levels

The browser prototype now treats difficulty in two layers:

- Starting difficulty: `Easy`, `Medium`, or `Hard` sets the opening pressure of the yard.
- Pressure tiers: the run ramps upward from that starting point every time the player earns another 100 points.

Current intended rules:

- `Easy` starts with 2 cats in play and new arrivals enter 1 at a time. Pressure rises every 100 points.
- `Medium` starts with 3 cats in play and can send in up to 2 cats at once. Pressure rises every 100 points.
- `Hard` starts with 4 cats in play and begins with 2-cat bursts right away. Pressure rises every 100 points.

When the player hits the current point target, the game does not jump to another named mode. Instead, it increases an internal pressure tier for that run:

- active cat cap rises
- cat entry bursts can get larger
- spawn cooldown shortens

That keeps `Easy` as a gentler starting curve, `Medium` as the default pressure curve, and `Hard` as a high-pressure opening, while all three still ramp over time.

## Planned Bonus And Achievement Ideas

- Herding bonus: if the player successfully leads a large enough group of cats into a designated feeding area and feeds them there, award bonus points. The group size requirement should scale from the chosen starting difficulty and continue scaling with pressure tiers.
- `Peacemaker` achievement: if two cats are visibly distracted because they are fighting, the player can rush over and drop food in time to break up the fight. Doing so awards bonus points or an achievement-style reward. If the player arrives too late, the fight ends as a missed opportunity instead of a reward.

Current prototype note:

- `Peacemaker` is now implemented as a first-pass scoring event worth 50 points. A visible cat fight can break out, it makes a noticeable sound, and dropping food near the fight in time shows a one-second `PEACEMAKER +050` reward flash.

## Prototype Goals

The first prototype is not meant to look like a finished C64 game. It is meant to answer the following questions:

- Is the core loop fun?
- Does feeding plus crowd control create meaningful decisions?
- Does the yard become tense in a good way instead of just frustrating?
- Can the player read what is happening when many cats are active?
- Does the trap and TNVR loop feel naturally connected to the feeding loop?
- Which mechanics are essential enough to survive a later C64 port?

## Development Approach

We will build this in a modern environment first, but with C64-aware design habits from the beginning.

That means:

- Keep the game readable with simple sprites and strong silhouettes
- Prefer a fixed playfield over camera-heavy scrolling
- Limit system complexity early
- Avoid mechanics that would obviously be impossible or unpleasant on a C64
- Treat this prototype as a design laboratory, not as the final shipping version

## Why Prototype In Modern Tech First

Using JavaScript or Python here gives us faster iteration on:

- movement feel
- cat behavior tuning
- spawn pacing
- food attraction logic
- food aging and spoilage timing
- trap interactions
- failure states
- UI and readability

Once the design is proven, we can decide what gets ported directly, what gets simplified, and what needs a more C64-specific redesign.

## Planned Workflow

1. Build a simple playable yard with one player, one food source, and a few cats
2. Tune movement and cat attraction until the loop feels good
3. Add crowding and blocking behavior
4. Add feeder trip or spill chaos events
5. Add feral cats, traps, and a basic TNVR loop
6. Add progression and difficulty ramping with a start screen, named opening difficulties, and rising pressure tiers tied to cats fed
7. Identify the minimum fun version of the game
8. Review the design against real C64 constraints
9. Plan the eventual C64 implementation based on what proved fun

## Likely Tech Direction

JavaScript is a strong default choice for this prototype because it is fast to iterate, easy to run locally in a browser, and works well for top-down 2D gameplay. Python remains an option if we want a quick desktop-first prototype instead, but browser-based JS is likely the easiest path for rapid testing.

## Porting Mindset

When we eventually move toward the C64 version, we should expect to preserve:

- the core loop
- the role of food placement
- crowd control pressure
- friendly versus feral cat distinction
- traps and TNVR as the long-term objective
- the retro top-down presentation

We should also expect to revisit:

- number of simultaneous cats
- movement smoothness
- collision complexity
- pathfinding sophistication
- event frequency
- presentation and HUD details

## Art and Tools

The sprite workshop in the parent `C64` directory is part of the long-term pipeline. We can use it to experiment with cat, player, trap, and yard object sprites as the prototype becomes more concrete.

## Audio Plan

For now, the prototype can use generated placeholder effects and short retro-style cues so we can tune timing and feedback quickly.

Planned audio approach:

- Keep placeholder sounds in `ASSETS/audio/` for trip, level-up, feeding, and other event hooks
- Allow those placeholders to be replaced later with real recorded or designed sound files you provide
- Prefer simple browser-friendly formats such as `wav`, `ogg`, or `mp3`
- Treat event timing and clarity as part of gameplay tuning, not just polish

Short-term goal:

- Generate and wire placeholder audio assets now so the game has a stable audio pipeline
- Swap in real sounds later without changing the surrounding gameplay code much

## Publishing Path

The long-term goal is still a real C64 game, but the practical near-term publishing target is a browser-playable HTML5 version that can be hosted on `itch.io`. That gives us a low-friction way to share the prototype, gather feedback, support donations, and show real project progress in public before the C64 version is ready.

See `ITCH_IO_PLAN.md` for the working publishing and readiness checklist.

## Immediate Next Steps

- Choose JavaScript or Python for the prototype implementation
- Define the minimum playable slice
- Create placeholder player and cat visuals
- Build the yard movement and food attraction loop first
- Delay polish until the core chaos-management gameplay feels strong

## Repo Note

This repository is public and is also intended to show clean development progress over time.
