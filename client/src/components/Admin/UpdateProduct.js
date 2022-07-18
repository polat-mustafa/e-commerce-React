import { useState } from "react";
import { Input, Text } from "@chakra-ui/react";
import { Form, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { updateProduct } from "../../api";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, product)
      .then(() => {
        navigate("/admin");
        console.log("Product updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFile = (file) => {
    setProduct({
      ...product,
      image: file.base64,
    });
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
        UPDATE PRODUCT
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
          <FileBase64 type="file" multiple={false} onDone={getFile} />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
