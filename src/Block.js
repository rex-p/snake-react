import { useEffect, useState } from 'react';
import {
    DIRECTIONS, SPEED, RERESH_RATE_MS
} from './Constants'

function Block({ currentDirection, initialPosition }) {
    const [position, setPosition] = useState(initialPosition);

    const moveRight = () => {
        setPosition(currentPosition => {
            const { top, left } = currentPosition;
            const newPosition = {
                top,
                left: left + SPEED
            }
            return newPosition;
        })
    }

    const moveLeft = () => {
        setPosition(currentPosition => {
            const { top, left } = currentPosition;
            const newPosition = {
                top,
                left: left - SPEED
            }
            return newPosition;
        })
    }

    const moveUp = () => {
        setPosition(currentPosition => {
            const { top, left } = currentPosition;
            const newPosition = {
                top: top - SPEED,
                left
            }
            return newPosition;
        })
    }

    const moveDown = () => {
        setPosition(currentPosition => {
            const { top, left } = currentPosition;
            const newPosition = {
                top: top + SPEED,
                left
            }
            return newPosition;
        })
    }

    useEffect(() => {
        /**
         * Logic to move the snake
         */
        const interval = setInterval(() => {
            switch (currentDirection) {
                case DIRECTIONS.LEFT:
                    moveLeft();
                    break;

                case DIRECTIONS.RIGHT:
                    moveRight();
                    break;

                case DIRECTIONS.DOWN:
                    moveDown();
                    break;

                case DIRECTIONS.UP:
                    moveUp();
                    break;

                default:
                    break;
            }
        }, RERESH_RATE_MS);

        //Cleanup function of this hook
        return () => {
            clearInterval(interval);
        }
    }, [position, currentDirection])

    const { top, left } = position;
    const style = {
        top: `${top}px`,
        left: `${left}px`
    }
    return (
        <div className="block" 
        style={style}
        >
        </div>
    );
}


export default Block;