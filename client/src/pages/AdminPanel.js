import { Button, Text, Box, Flex } from "@chakra-ui/react";
import React from "react";

import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate("/admin/product");
  };

  const goToOrder = () => {
    navigate("/admin/order");
  };

  const goToCreate = () => {
    navigate("/admin/create");
  };

  return (
    <div>
      <Text
        fontSize={"xl"}
        backgroundColor={"GrayText"}
        p={3}
        color={"Window"}
        mt={5}
      >
        Admin Panel
      </Text>

      <Flex justifyContent={"center"}>
        <Box mb={5} mt={5} justifyContent={"center"} alignItems={"center"}>
          <Button onClick={() => goToOrder()}>
            <Text fontSize={"xl"}>Orders</Text>
          </Button>
          <Button onClick={() => goToProduct()}>
            <Text fontSize={"xl"}>Products</Text>
          </Button>
          <Button onClick={() => goToCreate()}>
            <Text fontSize={"xl"}>Create</Text>
          </Button>
        </Box>
      </Flex>

      <hr />
      <p>
        The admin panel consists of two parts. It should be found by searching
        the product name from "id" in the Orders section.
      </p>
    </div>
  );
};

export default AdminPanel;
