import { createSlice } from "@reduxjs/toolkit";
import type { ProductParams } from "../../app/models/ProductParams";

const initialState : ProductParams = {
    pageNumber: 1,
    pageSize: 8,
    types: [],
    brands: [],
    orderBy:'name',
    searchTerm: ''
}

export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setPageNumber(state, action){
            state.pageNumber  =action.payload;
        },
        setPageSize(state,action){
            state.pageSize =action.payload;
        },
        setOrderBy(state, action){
            state.orderBy =action.payload;
            state.pageNumber = 1;
        },
        SetSearchTerm(state,action){
            state.searchTerm = action.payload;
            state.pageNumber=1;
        },
        setBrands(state,action){
            state.brands = action.payload;
            state.pageNumber = 1;
        },
        setTypes(state,action){
            state.types = action.payload;
            state.pageNumber=1;
        },
        resetParams(){
            return initialState;
        }
    }
});

export const  {setBrands, setTypes, setOrderBy, SetSearchTerm, setPageSize, setPageNumber,resetParams} = catalogSlice.actions;