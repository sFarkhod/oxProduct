import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./Css/Test.css";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

export default function SearchData() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total_count, setTotal_count] = useState(1);
  const tokenn = localStorage.getItem("tokenForOx");
  const [searchedData, setSearchedData] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

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
  }, []);

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
        <div className="Test">
          <div className="anotherSearch">
            <InputText
              className="inputSearch"
              placeholder="Search Here..."
              onInput={(e) => {
                setSearchedData({
                  global: {
                    value: e.target.value,
                    matchMode: FilterMatchMode.STARTS_WITH,
                  },
                });
              }}
            />
            <Button type="primary">
              <NavLink to="/searchproduct2">Another Search</NavLink>
            </Button>
          </div>

          <DataTable
            className="dataTable"
            value={product}
            sortMode="multiple"
            filters={searchedData}
            paginator
            rows={7}
            rowsPerPageOptions={[3, 4, 5]}
          >
            <Column field="name" header="Name" sortable />
            <Column field="supplier" header="Supplier" sortable />
          </DataTable>
        </div>
      )}
    </>
  );
}
