import React from "react";
import { useBasket } from "../context/BasketContext";
import { Box, Image, Text, Button, Link } from "@chakra-ui/react";
import moment from "moment";
const BasketDetail = ({ item }) => {
  const { removeFromBasket } = useBasket();

  return (
    <>
      <Box
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        width={"22rem"}
      >
        <Link to={`/product/${item._id}`}>
          <Image
            src={item.imageURL}
            alt={`Picture of ${item.name}`}
            htmlHeight={200}
            htmlWidth={200}
          />
          <Text as="h2" fontSize="2xl">
            {item.name}
          </Text>
          <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
          <p>{item.description}</p>
          <Text as="h3" fontSize="xl">
            {item.price} &#36;
          </Text>
        </Link>
        <Button variant="outline" onClick={() => removeFromBasket(item)}>
          Remove from Basket
        </Button>
      </Box>
    </>
  );
};

export default BasketDetail;
