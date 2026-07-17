import{createSlice,PayloadAction}from'@reduxjs/toolkit';
export const filtersSlice=createSlice({name:'filters',initialState:{sortBy:'title' as'title'|'id'},reducers:{setSortBy:(s,a:PayloadAction<'title'|'id'>)=>{s.sortBy=a.payload;}}});
export const{setSortBy}=filtersSlice.actions;export default filtersSlice.reducer;