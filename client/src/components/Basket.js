import {
  Alert,
  Box,
  Center,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
  Textarea,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useBasket } from "../context/BasketContext";
import BasketDetail from "./BasketDetail";
import { createOrder } from "../api";
import { useAuth0 } from "@auth0/auth0-react";

const Basket = () => {
  const { user, isAuthenticated } = useAuth0();
  const { basket, basketEmpty } = useBasket();
  const [order, setOrder] = useState("");
  const toast = useToast();

  const total = basket.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const productsId = basket.map((product) => {
    return product._id;
  });

  const items = {
    address: order,
    user: isAuthenticated ? user.email : "",
    product: JSON.stringify(productsId),
    total: total,
    createdAt: new Date(),
  };

  const orderSubmit = () => {
    createOrder(items)
      .then(() => {
        setOrder("");
      })
      .catch(() => {
        alert("Error");
      })
      .finally(() => {
        toast({
          title: "Order created",
          description: "Your order has been created",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });

    basketEmpty();
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Center fontSize={"4xl"} border={"2px"}>
        Basket
      </Center>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
        {basket.length > 0 ? (
          basket.map((item) => (
            <Box key={item._id}>
              <BasketDetail item={item} />
            </Box>
          ))
        ) : (
          <Flex>
            <Alert
              status="warning"
              alignItems={"center"}
              justifyContent={"center"}
            >
              Your basket is empty. Please add some products.
            </Alert>
          </Flex>
        )}
      </SimpleGrid>
      <Box>
        <Center>
          <Box
            w="full"
            alignItems="center"
            justifyContent="center"
            width={"22rem"}
          >
            <Alert status="info">Total: {total} &#36;</Alert>
          </Box>
        </Center>
      </Box>

      {basket.length > 0 ? (
        <Box
          w="full"
          alignItems="center"
          justifyContent="center"
          width={"22rem"}
        >
          <Button onClick={onOpen}>Order now</Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Please enter the address</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    onChange={(e) => setOrder(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => orderSubmit()}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : null}
    </>
  );
};

export default Basket;
