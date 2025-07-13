import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useEffect, useState } from "react";
import { SetSearchTerm } from "./catalogSlice";

export default function Search() {
    const {searchTerm} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [term , setTerm] = useState(searchTerm);
    useEffect(() => {
        setTerm(searchTerm);
    }, [searchTerm])

    const debounceSearch = debounce(event => {
        dispatch(SetSearchTerm(event.target.value));
    })
  return (
    <TextField
           label='Search Products'
           variant="outlined"
           fullWidth
           value={term}
           type='search'
           onChange={e => {
                setTerm(e.target.value);
                debounceSearch(e);
           } }
           
    />
  )
}
