import {
    DIRECTIONS,
    INITIAL_BLOCKS_LENGTH,
    INITIAL_POSITION,
    BLOCK_DIAMETER,
} from './Constants'

export const moveRight = (currentPosition) => {
    const { top, left } = currentPosition;
    const newPosition = {
        top,
        left: left + BLOCK_DIAMETER
    }
    return newPosition;
}

export const moveLeft = (currentPosition) => {

    const { top, left } = currentPosition;
    const newPosition = {
        top,
        left: left - BLOCK_DIAMETER
    }
    return newPosition;
}

export const moveUp = (currentPosition) => {
    const { top, left } = currentPosition;
    const newPosition = {
        top: top - BLOCK_DIAMETER,
        left
    }
    return newPosition;
}

export const moveDown = (currentPosition) => {
    const { top, left } = currentPosition;
    const newPosition = {
        top: top + BLOCK_DIAMETER,
        left
    }
    return newPosition;
}


export const getInitialBlocks = () => {
    let blocks = [];
    for (let i = 0; i < INITIAL_BLOCKS_LENGTH; i++) {
        const block = {
            index: i + 1,
            position: {
                top: INITIAL_POSITION.top,
                left: INITIAL_POSITION.left + (i * BLOCK_DIAMETER)
            },
            direction: DIRECTIONS.RIGHT
        }
        blocks.push(block);
    }
    return blocks;
}

export const getInitialPivotPositions = () => {
    const initialPivotPos = {
        top: INITIAL_POSITION.top,
        left: INITIAL_POSITION.left + (3 * BLOCK_DIAMETER)
    }
    const { top, left } = initialPivotPos;
    const key = `${top}-${left}`;
    const initialPivot = {};
    initialPivot[key] = {
        position: initialPivotPos,
        direction: DIRECTIONS.DOWN
    };
    return initialPivot;
}
