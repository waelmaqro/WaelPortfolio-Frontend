"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function WebinarSearchComponent() {
  const router = useRouter();
  const [webinarCategoryData, setWebinarCategoryData]: any = React.useState();

  React.useEffect(() => {
    fetch(
      `https://mqstrapi-c4c4eea08777.herokuapp.com/api/webinar-categories?sort[0]=id%3Aasc&pagination[page]=1&pagination[pageSize]=51&populate=deep,1`,
      {
        next: { revalidate: 10 },
      }
    )
      .then((res) => res.json())
      .then((data) => setWebinarCategoryData(data));
  }, []);

  if (!webinarCategoryData)
    return (
      <SkeletonTheme>
        <Skeleton width="100%" count={1} height={200} />
      </SkeletonTheme>
    );
  return (
    <Autocomplete
      disablePortal
      id="Search component"
      options={webinarCategoryData.data.map((category: any) => category)}
      getOptionLabel={(option: any) => option.attributes.Category}
      onChange={(e: any, option: any) => {
        router.replace("/webinars/" + option.attributes.slug);
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
      style={{ width: "100%", maxWidth: "1100px" }}
    />
  );
}
