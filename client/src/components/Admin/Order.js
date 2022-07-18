import React from "react";
import { useQuery } from "react-query";
import { getOrders } from "../../api";
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tfoot,
  Tbody,
  Text,
} from "@chakra-ui/react";

import moment from "moment";

const Order = () => {
  const { data, isLoading, isError } = useQuery("orders", getOrders);
  console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <TableContainer>
      <Text fontSize={"xl"} backgroundColor={"GrayText"} p={3} color={"Window"}>
        ORDERS
      </Text>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>USER</Th>
            <Th>ADDRESS</Th>
            <Th isNumeric>PRODUCTS</Th>
            <Th isNumeric>ORDER TİME</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order) => (
            <Tr key={order._id}>
              <Td>{order.user}</Td>
              <Td>{order.address}</Td>
              <Td isNumeric>{JSON.stringify(order.product)}</Td>
              <Td isNumeric>
                {moment(order.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Order;
