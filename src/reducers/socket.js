import produce from 'immer';

const initialState = {
    socket: [],
}

export const SOCKET_DATA = 'SOCKET_DATA';

export default (state = initialState, action) => {
    return produce(state, (draft) => {
        // eslint-disable-next-line default-case
        switch (action.type) {
            case 'SOCKET_DATA': {
                //draft.loading = true
                draft.socket.push(action.data)
                break;
            }

        }
    })
}
