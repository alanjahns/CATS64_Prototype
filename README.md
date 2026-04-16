# CATS Prototype

`CATS` is a top-down action-strategy game about managing a fenced yard full of hungry cats before the situation turns into total chaos.

This `prototype` directory is for the modern first-pass version of the game. We will use JavaScript or Python here to quickly test gameplay, pacing, controls, crowd behavior, and overall fun before deciding how to port the project back to a more C64-authentic implementation.

## Game Summary

The player moves around a fenced yard and tries to keep order while cats gather around food, crowd the play space, and create escalating problems. Some cats are friendly and mainly need feeding and management. Others are feral and eventually need to be trapped, processed through TNR, and released. Ear-tipped cats show which ones have already been handled.

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
- Overcrowding can block movement, surround the player, or create risk
- A cat can trip the feeder and spill food, causing sudden disorder
- Additional cats appear over time, increasing yard pressure
- Friendly cats and feral cats should feel behaviorally different
- Traps can be placed to capture feral cats
- Captured cats are processed and released through the TNR loop
- Ear-tipped cats visually indicate previously fixed cats
- The challenge comes from timing, movement, placement, and crowd control

## Player Goals

- Keep the yard manageable
- Feed cats efficiently without creating impossible crowding
- Avoid getting trapped, blocked, or overwhelmed
- Use traps intelligently on feral cats
- Gradually improve the state of the yard through TNR
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
- Temporary disorder spikes
- Recovery windows for the player
- How often chaos happens and whether it feels fair

### 4. Trap and TNR loop

- Trap placement rules
- Capture conditions
- Processing flow
- Return or release state
- Ear-tip visual state and persistent identity for handled cats

### 5. Difficulty ramp

- Spawn rate over time
- Ratio of friendly to feral cats
- Increasing crowd density
- Overlapping events creating higher stress
- Balancing pressure so the game gets tense without becoming unreadable

## Prototype Goals

The first prototype is not meant to look like a finished C64 game. It is meant to answer the following questions:

- Is the core loop fun?
- Does feeding plus crowd control create meaningful decisions?
- Does the yard become tense in a good way instead of just frustrating?
- Can the player read what is happening when many cats are active?
- Does the trap and TNR loop feel naturally connected to the feeding loop?
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
- trap interactions
- failure states
- UI and readability

Once the design is proven, we can decide what gets ported directly, what gets simplified, and what needs a more C64-specific redesign.

## Planned Workflow

1. Build a simple playable yard with one player, one food source, and a few cats
2. Tune movement and cat attraction until the loop feels good
3. Add crowding and blocking behavior
4. Add feeder trip or spill chaos events
5. Add feral cats, traps, and a basic TNR loop
6. Add progression and difficulty ramping
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
- traps and TNR as the long-term objective
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

## Immediate Next Steps

- Choose JavaScript or Python for the prototype implementation
- Define the minimum playable slice
- Create placeholder player and cat visuals
- Build the yard movement and food attraction loop first
- Delay polish until the core chaos-management gameplay feels strong
