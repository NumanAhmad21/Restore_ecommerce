import { Grid } from "@mui/material";
import type { Product } from "../../app/models/product"
import ProductCard from "./ProductCard";

type Props = {
    products: Product [];
}

export default function ProductList({products}:Props) {
  return (
    <Grid container spacing={3}>
      {products.map((item) => (
        <Grid size={3} display='flex' key={item.id}>
          <ProductCard  product={item} />
        </Grid>
      ))}
    </Grid>
  )
}
