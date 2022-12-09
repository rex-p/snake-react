import Block from './Block';
import { useEffect, useState } from 'react';
import {
    DIRECTIONS, KEYCODES,
    INITIAL_BLOCKS_LENGTH,
    INITIAL_POSITION,
    BLOCK_DIAMETER,
    DIRECTION_KEYCODE_MAP,
    SPEED, RERESH_RATE_MS
} from './Constants'


// Constants

const getInitialBlocks = () => {
    let blocks = [];
    for (let i = 0; i < INITIAL_BLOCKS_LENGTH; i++) {
        const block = {
            position: {
                index: i,
                top: INITIAL_POSITION.top,
                left: INITIAL_POSITION.left + (i * BLOCK_DIAMETER)
            },
            direction: DIRECTIONS.RIGHT
        }
        blocks.push(block);
    }
    return blocks;
}

function Snake() {
    const [blocks, setBlocks] = useState(getInitialBlocks());
    const [pivotPositions, setPivotPositions] = useState({});

    const moveRight = (currentPosition) => {
        const { top, left } = currentPosition;
        const newPosition = {
            top,
            left: left + SPEED
        }
        return newPosition;
    }

    const moveLeft = (currentPosition) => {

        const { top, left } = currentPosition;
        const newPosition = {
            top,
            left: left - SPEED
        }
        return newPosition;
    }

    const moveUp = (currentPosition) => {
        const { top, left } = currentPosition;
        const newPosition = {
            top: top - SPEED,
            left
        }
        return newPosition;
    }

    const moveDown = (currentPosition) => {
        const { top, left } = currentPosition;
        const newPosition = {
            top: top + SPEED,
            left
        }
        return newPosition;
    }

    useEffect(() => {
        /**
         * Logic to move the snake
         */
        const interval = setInterval(() => {
            const newBlocks = [];
            for (let i = 0; i < blocks.length; i++) {
                const block = { ...blocks[i] };
                const { index, position } = block;

                //Logic to change direction
                //Find if new Position is overlapping the pivot position
                const { top, left } = position;
                const key = `${top}-${left}`;
                const pivot = pivotPositions[key];
                if (pivot) {
                    //change the position based on the pivot position
                    block.direction = pivot.direction;
                    if (index === 0) {
                        dequePivotPositionQueue(key);
                    }
                }
                //Logic to move in given direction
                switch (block.direction) {
                    case DIRECTIONS.LEFT:
                        block.position = moveLeft(position);
                        break;

                    case DIRECTIONS.RIGHT:
                        block.position = moveRight(position);
                        break;

                    case DIRECTIONS.DOWN:
                        block.position = moveDown(position);
                        break;

                    case DIRECTIONS.UP:
                        block.position = moveUp(position);
                        break;

                    default:
                        break;
                }
                newBlocks.push(block);
            }
            setBlocks(newBlocks);
        }, RERESH_RATE_MS);

        //Cleanup function of this hook
        return () => {
            clearInterval(interval);
        }

    },[blocks, pivotPositions])

    //======================================================Change Direction=============================================


    const handleChangeDirection = (event) => {
        const snakeHeadPosition = blocks[blocks.length - 1].position;
        const { top, left } = snakeHeadPosition;
        const key = `${top}-${left}`;
        const newBlocks = [...blocks];
        newBlocks[newBlocks.length-1].direction = DIRECTION_KEYCODE_MAP[event.keyCode];
        setBlocks(newBlocks);
        setPivotPositions(pp => {
            let x = { ...pp }
            x[key] = {
                position: snakeHeadPosition,
                direction: DIRECTION_KEYCODE_MAP[event.keyCode]
            };
            return x;
        })
    }

    useEffect(() => {
        document.addEventListener("keydown", handleChangeDirection);
        return () => {
            document.removeEventListener("keydown", handleChangeDirection);
        }
    }, [])



    console.log(JSON.stringify(blocks));

    const dequePivotPositionQueue = (key) => {
        setPivotPositions(x => {
            delete x[key];
            return { ...x };
        })
    }

    return <div className='snake'>
        {blocks.map((block) =>
            < Block
                key={block.index}
                blockInfo={block}
                pivotPositions={pivotPositions}
                dequePivotPositionQueue={dequePivotPositionQueue} >
            </Block>
        )}
    </div >
}


export default Snake;
