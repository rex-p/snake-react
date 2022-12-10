import Block from './Block';
import { useSnake } from './UseSnake';

function Snake() {
    const blocks = useSnake();
    return <div className='snake'>
        {blocks.map((block) =>
            < Block
                key={block.index}
                blockInfo={block}
            >
            </Block>
        )}
    </div >
}


export default Snake;
