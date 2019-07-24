interface actionType {
    payload: {
        content: string
    },
    type: string
}

const initialState: any = {
    jokes: [
        {
            id: 1,
            content: 'joke 1'
        },
        {
            id: 2,
            content: 'joke 2'
        },
        {
            id: 3,
            content: 'joke 3'
        },
        {
            id: 4,
            content: 'joke 4'
        }
    ]
}

const reducer = (state = initialState, action: actionType): any => {
    if (action.type === 'ADD_JOKE') {
        return Object.assign({}, state, {
            jokes: state.jokes.concat({ id: state.jokes.length + 1, content: action.payload.content })
        })
    }
    return state
}

export default reducer