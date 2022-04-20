import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  console.log(router.query);
  console.log(router.pathname);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    console.log(path);
    console.log(query);

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    // console.log(Object.keys(filterValues));
    // query[Object.keys(filterValues)[0]] =
    //   filterValues[Object.keys(filterValues)];

    console.log(path);
    console.log(query);

    router.push({ pathname: path, query: query });
  };

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) => {
              console.log({ [filter.queryName]: e.target.value });
              searchProperties({ [filter.queryName]: e.target.value });
            }}
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
