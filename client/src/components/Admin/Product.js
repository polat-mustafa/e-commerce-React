import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRepoData, deleteProduct } from "../../api";
import "./Product.css";
import { Table, Button, Popconfirm } from "antd";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery("admin:products", getRepoData);
  const navigate = useNavigate();

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <span className="ant-divider" />
            <Button onClick={() => navigate(`/admin/product/${record._id}`)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure delete this product?"
              onConfirm={() => deleteProductMutation.mutate(record._id)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          </span>
        ),
      },
    ];
  }, [navigate, deleteProductMutation]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <>
      <Text
        fontSize={"xl"}
        backgroundColor={"GrayText"}
        p={3}
        color={"Window"}
        mt={5}
      >
        PRODUCTS
      </Text>
      <Table columns={columns} dataSource={data} key={data._id} />
    </>
  );
};

export default Product;
