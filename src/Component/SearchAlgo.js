import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Product.css";

function SearchAlgo() {
  //   const [contacts, setContacts] = useState(product);
  const [search, setSearch] = useState("");

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total_count, setTotal_count] = useState(1);
  const tokenn = localStorage.getItem("tokenForOx");
  const [searchedData, setSearchedData] = useState("");

  const getData = async () => {
    const token = localStorage.getItem("tokenForOx");
    setLoading(true);
    try {
      // here we can work with the links as well.
      // Like: https://toko.ox-sys.com/variations?page={pageNum}&size={sizeNum}
      // But as soon as I have AntDesign I will use this. It is a little bit easier )
      const res = await fetch(`https://toko.ox-sys.com/variations?size=12`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setLoading(false);

      if (!data) {
        // message.error("Error while loading data");
        alert("Error while loading data");
      } else {
        setProduct(data.items);
        setTotal_count(data.total_count);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(product);

  useEffect(() => {
    getData();
    // sortName();
  }, []);

  //   const sortName = () => {
  //     setProduct(
  //       product.sort((a, b) => {
  //         return a.name.toLowerCase() < a.name.toLowerCase()
  //           ? -1
  //           : a.name.toLowerCase() > a.name.toLowerCase()
  //           ? 1
  //           : 0;
  //       })
  //     );
  //   };

  return (
    <>
      {!tokenn ? (
        <div className="errorr">
          <div class="maincontainer">
            <div class="bat">
              <img
                class="wing leftwing"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png"
              />
              <img
                class="body"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-body.png"
                alt="bat"
              />
              <img
                class="wing rightwing"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png"
              />
            </div>
            <div class="bat">
              <img
                class="wing leftwing"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png"
              />
              <img
                class="body"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-body.png"
                alt="bat"
              />
              <img
                class="wing rightwing"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png"
              />
            </div>
            <div class="bat">
              <img
                class="wing leftwing"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png"
              />
              <img
                class="body"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-body.png"
                alt="bat"
              />
              <img
                class="wing rightwing"
                src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png"
              />
            </div>
            <img
              class="foregroundimg"
              src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/HauntedHouseForeground.png"
              alt="haunted house"
            />
          </div>
          <h1 class="errorcode">ERROR 403</h1>
          <div class="errortext">This area is forbidden. Turn back now!</div>
        </div>
      ) : (
        <Container className="container">
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Here..."
              />
            </InputGroup>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {product
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().indexOf(search) > -1;
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}

export default SearchAlgo;
