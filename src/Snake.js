import Block from './Block';
import { useEffect, useState } from 'react';

function Snake() {
    const [blocks, setBlocks] = useState([1]);
    const [currentDirection, setCurrentDirection] = useState('left');
    const [position, setPosition] = useState({ top: 100, left: 100 });

    const moveSnake = () => {

    }

    useEffect(() => {
        /**
         * Logic to move the snake
         */
        const interval = setInterval(() => {
            setPosition(currentPosition => {
                const { top, left } = currentPosition;
                const newPosition = {
                    // top: top + 1,
                    left: left + 10
                }
                return newPosition;
            })
        }, 1000);

        //Cleanup function of this hook
        return () => {
            clearInterval(interval);
        }
    }, [position])

    const { top, left } = position;
    const style = {
        top: `${top}px`,
        left: `${left}px`
    }
    return <div className='snake' style={style}>{blocks.map(block => <Block key={block}></Block>)}</div>
}


export default Snake;
