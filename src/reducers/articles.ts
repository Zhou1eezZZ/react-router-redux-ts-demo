interface actionType {
    payload: {
        title: string
    },
    type: string
}

const initialState: any = {
    articles: [
        {
            id: 1,
            title: 'article 1'
        },
        {
            id: 2,
            title: 'article 2'
        },
        {
            id: 3,
            title: 'article 3'
        },
        {
            id: 4,
            title: 'article 4'
        }
    ]
}

const reducer = (state = initialState, action: actionType): any => {
    if (action.type === 'ADD_ARTICLE') {
        return Object.assign({}, state, {
            articles: state.articles.concat({ id: state.articles.length + 1, title: action.payload.title })
        })
    }
    return state
}

export default reducer