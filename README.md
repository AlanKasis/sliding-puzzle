# Sliding Puzzle Game / Alan Kasis for media.monks
## Overview
This project is a sliding puzzle game implemented in JavaScript, HTML, and CSS. The puzzle is a 4x4 grid where each piece can move up, down, left, or right, but only if there is an empty cell next to it. The game ends when all pieces are in the correct position, forming a complete image.

## Specifications
* The puzzle is a 4x4 grid.
* Each piece can move in four directions: up, down, left, right.
* At the start, all pieces are scrambled.
* A piece can move only if there is an empty cell adjacent to it.
* Only one move is possible at a time.
* The game ends when all pieces are correctly positioned, revealing the image clearly.
* The provided image is used for the puzzle.

## Concept

Visually, I looked for inspiration in the sliding puzzles I used to play when I was a kid in the 90s, those with black plastic frame and rounded edges.

On the code side of things I went for a minimalistic implementation, using HTML / CSS / JavaScript and no external librarys or bundler. My thought process was that, for an application this size and with these requirements, one commented and well named index.js file, even if large, would be more readable than multiple folders and modules.

## Project Structure
* index.html: The main HTML file containing the structure of the game.
* styles.css: The CSS file for styling the game.
* script.js: The JavaScript file containing the game logic.
* puzzle-image.jpg: The image used for the puzzle.

## Running project and instructions
Run ```npx live-server ``` on your terminal to serve and run the application
Click the "Shuffle" button to scramble the pieces.
Click on a piece adjacent to the empty cell to move it.
Continue moving pieces until the image is correctly assembled.

## External Resources
No external resources were used for this project.

## Time Spent
I spent approximately 8 hours working on this project.

## Contact
For any questions or issues, please contact alankasis@gmail.com
