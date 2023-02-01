import React, { useRef, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Center,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";

export const UpdateProductComp = ({ data }) => {
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputDistributor = useRef("");
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const onUpdate = async (id) => {
    try {
      const updateProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
        distributor: inputDistributor.current.value,
      };

      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/update/${id}`,
        updateProduct
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        text: "Product Updated",
        width: "370px",
      });
      setTimeout(() => window.location.replace("/admin"), 900);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel color="#285430">Nama Produk</FormLabel>
          <Input
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            ref={inputProductName}
            defaultValue={data?.productName}
          ></Input>
        </FormControl>
        <FormLabel color="#285430">Distributor</FormLabel>
        <Input
          _placeholder={{ color: "#5F8D4E" }}
          borderColor="#285430"
          textColor="black"
          ref={inputDistributor}
          defaultValue={data?.distributor}
        ></Input>
        <FormControl>
          <FormLabel color="#285430">Description</FormLabel>
          <Textarea
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            ref={inputDescription}
            defaultValue={data?.description}
          ></Textarea>
        </FormControl>
        <Center>
          <Button
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="18px"
            color="gray.800"
            width={"100%"}
            justifyContent="center"
            onClick={
              () => {
                // setOverlay(<OverlayOne />);
                // onOpen();
                onUpdate(data.id)
              }
            }
          >
            Edit Product
          </Button>
          {/* <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Custom backdrop filters!</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal> */}
        </Center>
      </Stack>
    </div>
  );
};
