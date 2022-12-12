export const DIRECTIONS = {
    LEFT: "left",
    UP: "up",
    RIGHT: "right",
    DOWN: "down"
}

export const INITIAL_POSITION = { top: 100, left: 100 }
export const RERESH_RATE_MS = 100;
export const BLOCK_DIAMETER = 25;

export const KEYCODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}
export const INITIAL_BLOCKS_LENGTH = 10;

const DIRECTION_KEYCODE_MAP = {
    37: DIRECTIONS.LEFT,
    38: DIRECTIONS.UP,
    39: DIRECTIONS.RIGHT,
    40: DIRECTIONS.DOWN
};

export const VALID_DIRECTIONS = {
    left: ["up", "down"],
    right: ["up", "down"],
    up: ["left", "right"],
    down: ["left", "right"],
}


export { DIRECTION_KEYCODE_MAP };