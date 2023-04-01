import React, {useState, useEffect} from "react";
import { message, Table, Tooltip, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import './Css/Product.css'


export default function Product() {
  const [product, setProduct] = useState([]);
  const [productProperty, setProductProperty] = useState([]);
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
      const res = await fetch(`https://toko.ox-sys.com/variations`, {
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
        message.error("Error while loading data");
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
  }, []);

  const ShowProduct = () => {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        filteredValue:[searchedData],
        onFilter:(value,record)=> {
          const newSearchData= String(record.name)
          return newSearchData.toLowerCase().includes(value.toLowerCase())
        }
      },
      {
        title: "SKU",
        dataIndex: "sku",
        responsive: ["md"],
      },
      {
        title: "Supplier",
        dataIndex: "supplier",
      },
      {
        title: "Unit",
        dataIndex: "unit",
        responsive: ["md"],
      },
    ];
    return (
      <div className="bla">
        <Tooltip title="Search Product" className='searchField'>
          <Input.Search placeholder="Search here..."
          onSearch={(value)=>{setSearchedData(value)}}
          onInput={(e)=>{setSearchedData([...searchedData, e.target.value])}}
          ></Input.Search>
        </Tooltip>

        <Table
          loading={loading}
          columns={columns}
          dataSource={product}
          pagination={{
            pageSize: 8,
            total: total_count,
          }}
        ></Table>
      </div>
    );
  };

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
        <div className="ProductList">
          <ShowProduct />
        </div>
      )}
    </>
  );
}




