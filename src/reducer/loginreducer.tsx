export const initialState = {
    email: '',
    password: ''
}

export type loginred = {
    email : string,
    password : string
}

export type loginaction ={
    type : 'EMAIL' | "PASSWORD"
    'value' : string
}

export const reducer = (state:loginred, action:loginaction) => {

    switch (action.type) {
        case 'EMAIL':
            return {
                ...state,
                email: action.value
            }
        case 'PASSWORD':
            return {
                ...state,
                password: action.value
            }
    }

}