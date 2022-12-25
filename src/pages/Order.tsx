import NavBar from "../components/NavBar";
import StoreItem from "../components/StoreItem";
import { Container, Row, Carousel, Button } from "react-bootstrap";
import carousel from "../data/carousel.json";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import { useEffect } from "react";
import { useCartContext } from "../context/UseStateContext";
import { productProps } from "../types/types";

type categorizedDataAcumProps = {
  [key: string]: object[];
};

const Order = () => {
  const { products, setProducts } = useCartContext();

  //Group items by type in an array (associative) to display them.
  const categorizedData = products.reduce(
    (acc: categorizedDataAcumProps, curr: productProps) => {
      const { product_category } = curr;
      if (!acc[product_category]) {
        acc[product_category] = [];
      }
      acc[product_category].push(
        Object.fromEntries(
          Object.entries(curr).filter(
            (key) => !key.includes("product_category")
          )
        )
      );
      return acc;
    },
    []
  );

  //Fetching Products from database.
  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts([]);
      snapshot.docs.forEach((doc) => {
        setProducts((prevProducts: any) => [...prevProducts, doc.data()]);
      });
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Carousel fade>
          {carousel.map((item) => (
            <Carousel.Item key={item.title}>
              <img
                className="d-block w-100"
                src={item.imgUrl}
                alt={item.title}
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Button variant="info">
                  <a href={`#${item.title}`}>Go To Item</a>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container className="mt-5">
        {Object.keys(categorizedData).map((key) => (
          <div key={key} className="pt-5" id={key}>
            <h1 className="m-4 text-center">{key}</h1>
            <Row md={1} xs={1} lg={2} xl={3} className="g-3">
              {categorizedData[key].map((item: productProps) => (
                <Container
                  className="mt-5"
                  key={item.product_id}
                  id={item.product_name}
                >
                  <StoreItem {...item} />
                </Container>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Order;
