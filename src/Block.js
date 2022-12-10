function Block({ blockInfo }) {

    const { position } = blockInfo;


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