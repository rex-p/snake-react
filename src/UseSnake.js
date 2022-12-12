import { useEffect, useState } from 'react';
import {
    DIRECTIONS,
    DIRECTION_KEYCODE_MAP,
    RERESH_RATE_MS,
    BLOCK_DIAMETER,
    KEYCODES
} from './Constants'

import { moveDown, moveLeft, moveRight, moveUp, getInitialBlocks, getInitialPivotPositions } from './helper'

// Constants

let pivotPositions = {};

export const useSnake = () => {
    const [blocks, setBlocks] = useState(getInitialBlocks());

    const calculateNewBlocksPosition = () => {
        console.log(pivotPositions);
        console.log(blocks[0].position, blocks[0].direction);
        const newBlocks = [];
        for (let i = 0; i < blocks.length; i++) {
            let block = { ...blocks[i] };
            let { index, position, direction } = block;

            //Logic to change direction
            //Find if new Position is overlapping the pivot position
            const { top, left } = position;
            const key = `${top}-${left}`;
            const pivot = pivotPositions[key];
            if (pivot) {
                //change the position based on the pivot position
                direction = pivot.direction;
                debugger;
                if (index === 1) {
                    dequePivotPositionQueue(key);
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

            newBlocks.push({ index, position, direction });
        }
        setBlocks(newBlocks);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleChangeDirection);

        /**
         * Logic to move the snake
         */
        const interval = setInterval(calculateNewBlocksPosition, RERESH_RATE_MS);

        //Cleanup function of this hook
        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", handleChangeDirection);
        }

    }, [blocks])

    //======================================================Change Direction=============================================

    const handleChangeDirection = (event) => {
        if (!Object.values(KEYCODES).includes(event.keyCode)) {
            return;
        }
        const snakeHead = blocks[blocks.length - 1];
        const { top, left } = snakeHead.position;
        debugger;
        const key = `${top}-${left}`;
        const direction = DIRECTION_KEYCODE_MAP[event.keyCode]
        pivotPositions[key] = {
            position: { top, left },
            direction
        };
        console.log("added new pivot")
    }


    const dequePivotPositionQueue = (key) => {
        delete pivotPositions[key];
    }

    return blocks;
}