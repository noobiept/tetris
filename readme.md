# [Try it out](http://nbpt.eu/games/tetris/)

![Screen shot](/images/tetris_screenshot.png)

# Description

- Each piece/element has 4 square blocks.
- A random sequence of pieces falls down.
- We can rotate it (90 degrees each time, both ways).
- Need to create a horizontal line to clear the line.
- When a certain number of lines is cleared, we change the level of the game, which increases the speed of the falling pieces.
- Game ends when a piece reaches the top.

# Movement

- move left : `left arrow`
- move right : `right arrow`
- soft drop : `down arrow`
- hard drop : `space`
- rotate left : `a`
- rotate right : `d` or `up arrow`

# Reference

- http://en.wikipedia.org/wiki/Tetris

# Development

- `corepack enable`
- `pnpm run start`: Run the typescript compiler and a local server (in `localhost:8000`).
- `pnpm run build`: Run the release build (output located at `/release/(name)_(version)/`).
