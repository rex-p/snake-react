import { useCallback, useEffect, useState } from 'react';
import {
    DIRECTIONS,
    DIRECTION_KEYCODE_MAP,
    RERESH_RATE_MS,
    VALID_DIRECTIONS,
    KEYCODES
} from './Constants'

import { moveDown, moveLeft, moveRight, moveUp, getInitialBlocks } from './helper'

// Constants

const pivotPositions = {};


const isGameOver = (blocks) => {
    // Check if snake has touched it's own body
    const map = {}
    for (let i = 0; i < blocks.length; i++) {
        const { top, left } = blocks[i].position;
        const key = `${top}-${left}`;
        if (map[key]) {
            return true;
        } else {
            map[key] = 1;
        }
    }

    return false;
}

const removePivot = (key) => {
    delete pivotPositions[key];
}


const getNewBlock = (oldBlock) => {
    let { index, position, direction } = { ...oldBlock };

    //Logic to change direction
    //Find if new Position is overlapping the pivot position
    const { top, left } = position;
    const key = `${top}-${left}`;
    const pivot = pivotPositions[key];

    if (pivot) {
        //change the position based on the pivot position
        direction = pivot.direction;
        if (index === 1) {
            removePivot(key);
        }
    }

    //Logic to move in given direction
    switch (direction) {
        case DIRECTIONS.LEFT:
            position = moveLeft(position);
            break;

        case DIRECTIONS.RIGHT:
            position = moveRight(position);
            break;

        case DIRECTIONS.DOWN:
            position = moveDown(position);
            break;

        case DIRECTIONS.UP:
            position = moveUp(position);
            break;

        default:
            break;
    }

    if (pivot && index === 1) {
        console.log({ direction });
    }

    return { index, position, direction }
}

const calculateNewBlocksPositions = (blocks) => {
    console.log(pivotPositions);
    console.log(blocks[0].position, blocks[0].direction);
    const newBlocks = [];
    for (let i = 0; i < blocks.length; i++) {
        const newBlock = getNewBlock(blocks[i]);
        newBlocks.push(newBlock);
    }

    return newBlocks;
}

export const useSnake = () => {
    const [blocks, setBlocks] = useState(getInitialBlocks());

    const isValidDirection = (nextDirection, previousDirection) => {
        return VALID_DIRECTIONS[previousDirection].includes(nextDirection);
    }

    const handleChangeDirection = useCallback((event) => {
        if (!Object.values(KEYCODES).includes(event.keyCode)) {
            return;
        }
        const snakeHead = blocks[blocks.length - 1];
        const nextDirection = DIRECTION_KEYCODE_MAP[event.keyCode]
        const previousDirection = snakeHead.direction;

        if (!isValidDirection(nextDirection, previousDirection)) {
            return;
        }

        const { top, left } = snakeHead.position;
        const key = `${top}-${left}`;
        pivotPositions[key] = {
            position: { top, left },
            direction: nextDirection
        };
        console.log("added new pivot");
    }, [blocks])

    useEffect(() => {
        document.addEventListener("keydown", handleChangeDirection);
        console.log("useEffect triggered");
        /**
         * Logic to move the snake
         */
        const interval = setInterval(() => {
            console.log("set interval triggered");
            const newBlocks = calculateNewBlocksPositions(blocks);
            //If any new position overlap, restart game
            if (isGameOver(newBlocks)) {
                alert("oops! Game Over");
                return setBlocks(getInitialBlocks());
            }
            setBlocks(newBlocks);

        }, RERESH_RATE_MS);

        //Cleanup function of this hook
        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", handleChangeDirection);
        }

    }, [blocks, handleChangeDirection])

    return blocks;
}