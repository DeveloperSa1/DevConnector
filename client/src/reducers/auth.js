    import{
        REGISTER_SUCCESS,
        REGISTER_FAIL
    } from '../actions/type';

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user : null,
    }


    export default function(state = initialState, action) {
        const { type,payload } = action;
        switch(type){
        case REGISTER_SUCCESS :
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false
            }

            case REGISTER_FAIL:
                localStorage.removeItem('token');
                return{
                    ...state,
                    token : null,
                    isAuthenticated : false,
                    loading : false
                }
                default : 
                return state;

        }
    }

    // ألى الدقيقه 8 سكشون 8 فيديو 40
    // السبب ماني ف مود كويس ثانيا احتاج افهم ريدكس واتعمق فيه واراجع
    // يعني يا اما المود حق دراسه أو اكون فاهم على الاقل