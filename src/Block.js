import { useEffect, useState } from 'react';
import {
    DIRECTIONS, SPEED, RERESH_RATE_MS
} from './Constants'

function Block({ blockInfo, pivotPositions, dequePivotPositionQueue }) {

    const {index, position, direction} = blockInfo;
    

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