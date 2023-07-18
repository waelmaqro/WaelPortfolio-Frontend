"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const router = useRouter();
  const [categoryData, setCategoryData]: any = React.useState();
  const pathname = usePathname();

  React.useEffect(() => {
    fetch(`${process.env.getAllCategories}`, { next: { revalidate: 10 } })
      .then((res) => res.json())
      .then((data) => setCategoryData(data));
  }, []);
  
  if (!categoryData) return <div>Loading...</div>;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categoryData.data.map((category: any) => category)}
      getOptionLabel={(option) => option.attributes.Category}
      onChange={(event: any, option: any) => {
        router.replace("/blogs/" + option.attributes.slug);
      }}
      forcePopupIcon={false}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          sx={{ border: 0 }}
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      style={{width: "100%", maxWidth: "1100px"}}
    />
  );
}
