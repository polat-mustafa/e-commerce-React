import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import { useBasket } from "../context/BasketContext";

function Products({ product }) {
  const data = {
    isNew: true,
    imageURL: product.image,
    name: product.name,
    price: product.price,
    description: product.description,
    _id: product._id,
  };

  const { addToBasket, basket } = useBasket();

  const findProduct = basket.find((items) => items._id === data._id);

  return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
      width={"22rem"}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Link to={`product/${product._id}`}>
          <Box>
            <Image
              src={data.imageURL}
              alt={`Picture of ${data.name}`}
              roundedTop="lg"
            />

            <Box p="6">
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  {data.name}
                </Box>
              </Flex>
              <Box>
                <Text fontSize="sm" fontWeight="semibold" lineHeight="tight">
                  {data.description}
                </Text>
              </Box>
              <Flex justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  color={useColorModeValue("gray.800", "white")}
                >
                  <Box as="span" color={"gray.600"} fontSize="lg">
                    $
                  </Box>
                  {data.price.toFixed(2)}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Link>
        <Box position="absolute" bottom={0} right={0}>
          <Button
            size="sm"
            icon={<AddIcon />}
            onClick={() => addToBasket(data, findProduct)}
          >
            {findProduct ? "Remove from Basket" : "Add to Basket"}
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default Products;
