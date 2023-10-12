import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    info : {
        isLogged: false,
        id: "Jhon Doe",
    }
}
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signin:(state,action)=>{
            state.info = {isLogged: true, id:action.payload.name};
        },
        signout:(state,action)=>{
            state.info = {
                isLogged: false,
                id:""
            };
            
        }
    }
});
export const {signin, signout} = userSlice.actions

export default userSlice.reducer