import React from "react";
import { useState } from "react";
import { Input, Text } from "@chakra-ui/react";
import { Form, Button } from "antd";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { createProduct } from "../../api";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    createProduct(product)
      .then(() => {
        navigate("/admin/product");
        console.log("Product created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFile = (file) => {
    setProduct({ ...product, image: file.base64 });
  };

  return (
    <div>
      <Text
        fontSize={"xl"}
        backgroundColor={"GrayText"}
        p={3}
        color={"Window"}
        pb={3}
      >
        CREATE PRODUCT
      </Text>
      <Form layout="vertical" onSubmit={onSubmit}>
        <Form.Item label="Name">
          <Input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Image">
          <FileBase64 onDone={getFile} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
