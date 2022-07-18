import React from "react";
import Products from "../components/Products";

import { useQuery } from "react-query";
import { SimpleGrid } from "@chakra-ui/react";

import { getRepoData } from "../api";

const Home = () => {
  const { isLoading, error, data } = useQuery(
    "repoData", // name of the query
    getRepoData, // function to get the data
    {
      retry: false, // don't retry on failure
      retryDelay: 1000, // retry after 1 second
      staleTime: 1000, // don't use stale data
    }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
        {data.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Home;
