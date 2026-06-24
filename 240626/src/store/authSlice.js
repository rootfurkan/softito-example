import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    user : null,
    isAuth : false,
    activeTab : 'login',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login : (state, action)=>{
            state.isAuth = true
            state.user = {
                name : 'Furkan Y.',
                role : action.payload, // admin , muhasebe, teknik 
            }
            state.activeTab = 'dashboard'
        },
        logout : (state)=>{
            state.isAuth = false
            state.user = null
            state.activeTab  = 'login'
        },
        setActiveTab : (state,action)=>{
            state.activeTab = action.payload;
        },
    },
});

export const {login, logout, setActiveTab} = authSlice.actions
export default authSlice.reducer