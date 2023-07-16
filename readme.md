# [Try it out](http://nbpt.eu/games/tetris/)

# Description

-   Each piece/element has 4 square blocks.
-   A random sequence of pieces falls down.
-   We can rotate it (90 degrees each time, both ways).
-   Need to create a horizontal line to clear the line.
-   When a certain number of lines is cleared, we change the level of the game, which increases the speed of the falling pieces.
-   Game ends when a piece reaches the top.

# Movement

-   left arrow : move left
-   right arrow : move right
-   down arrow : soft drop
-   space : hard drop
-   a : rotate left
-   d : rotate right

# Reference

-   http://en.wikipedia.org/wiki/Tetris

# Development

-   `npm run start`: Run the typescript compiler and a local server (in `localhost:8080`).
-   `npm run build`: Run the release build (output located at `/release/(name)_(version)/`).
