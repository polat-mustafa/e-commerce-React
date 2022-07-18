import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, Text, Image, Box, Center } from "@chakra-ui/react";
import moment from "moment";
import { useBasket } from "../context/BasketContext";
import axios from "axios";
const ProductDetail = () => {
  const { addToBasket, basket } = useBasket();
  const { _id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ["product", _id],
    async () => {
      const res = await axios.get(`http://localhost:3001/product/${_id}`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  if (isLoading) return "Loading...";
  if (isError) return "Error";

  const findProduct = basket.find((product) => product._id === data._id);

  return (
    <Center>
      <Box
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        width={"22rem"}
      >
        <Image
          src={data.image}
          alt={`Picture of ${data.name}`}
          htmlHeight={200}
          htmlWidth={200}
        />

        <Text as="h2" fontSize="2xl">
          {data.name}
        </Text>
        <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
        <p>{data.description}</p>
        <Text as="h3" fontSize="xl">
          {data.price} &#36;
        </Text>

        <Button
          variant="outline"
          onClick={() => addToBasket(data, findProduct)}
        >
          {findProduct ? "Remove from Basket" : "Add to Basket"}
        </Button>
      </Box>
    </Center>
  );
};

export default ProductDetail;
