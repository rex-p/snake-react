import Block from './Block';
import { useEffect, useState } from 'react';
import {
    DIRECTIONS, KEYCODES, INITIAL_BLOCKS_LENGTH, INITIAL_POSITION, BLOCK_DIAMETER
} from './Constants'


// Constants

const getInitialBlocks = () => {
    let blocks = [];
    let position = INITIAL_POSITION;
    for (let i = 0; i < INITIAL_BLOCKS_LENGTH; i++) {
        const block = {
            position:{
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
    const [currentDirection, setCurrentDirection] = useState(DIRECTIONS.DOWN);

    // const handleChangeDirection = (event) => {
    //     switch (event.keyCode) {
    //         case KEYCODES.LEFT:
    //             setCurrentDirection(DIRECTIONS.LEFT);
    //             break;
    //         case KEYCODES.RIGHT:
    //             setCurrentDirection(DIRECTIONS.RIGHT);
    //             break;
    //         case KEYCODES.UP:
    //             setCurrentDirection(DIRECTIONS.UP);
    //             break;
    //         case KEYCODES.DOWN:
    //             setCurrentDirection(DIRECTIONS.DOWN);
    //             break;
    //         default:
    //             break;
    //     }

    // }

    // useEffect(() => {
    //     document.addEventListener("keydown", handleChangeDirection);
    //     return () => {
    //         document.removeEventListener("keydown", handleChangeDirection);
    //     }
    // }, [])



    console.log({ blocks })
    return <div className='snake'>
        {blocks.map((block, i) =>
            < Block key={i} currentDirection={block.direction} initialPosition={block.position} ></Block>
        )}
    </div >
}


export default Snake;
