import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../components/item";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

export const getServerSideProps = async (req, res) => {
  let withdraws = [];
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);

  if (userId == undefined) {
    withdraws = [];
  } else {
    withdraws = await fetch(
      `${
        process.env.NODE_ENV != "production"
          ? "http://localhost:3000"
          : "https://web-8-qq8c.vercel.app"
      }/api/with-list/${userId}`
    );
    withdraws = await withdraws.json();
  }

  if (typeof withdraws === "object" && withdraws.length === 0) {
    withdraws = [];
  }
  // console.log(withdraws)
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      withdraws: withdraws.length === 0 ? [] : withdraws,
    },
  };
};

export default function Withdraw({ token, userId, withdraws }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
      return;
    }
    console.log(userId);
    fetch(`api/with-list/${userId}`)
      .then((data) => data.json())
      .then((res) => {
        setLists(res);
        // console.log(res)
      })
      .catch((err) => {
        console.log("userSideC", err);
      });
    setLoading(false);
  }, [loading]);
  const [lists, setLists] = useState(withdraws);
  const addWithDraw = async () => {
    if (
      withdraw.value === 0 ||
      withdraw.category === "" ||
      withdraw.date === ""
    ) {
      alert("та мэдээллээ бүрэн гүйцэт оруулна уу");
      return;
    }
    axios
      .post("/api/with-lists", {
        value: withdraw.value,
        description: withdraw.description,
        category: withdraw.category,
        type: "WITHDRAW",
        inserted: withdraw.inserted,
        user_id: userId,
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(true);
    setWithdraw({ value: 0, description: "", category: "", inserted: "" });
  };
  const [withdraw, setWithdraw] = useState({
    value: "",
    category: "",
    description: "",
    inserted: "",
  });
  console.log(withdraws);
  return (
    <div>
      <Navbar />
      <div className="d-flex mt-3 mb-3 justify-content-center">
        <button
          style={{ width: "10rem" }}
          type="button"
          className="btn btn-primary d-flex justify-content-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Зарлага
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="col d-flex flex-column align-items-center">
                <div className="row-1 mb-2">
                  <label className="me-2">Үнийн дүн:</label>
                  <input
                    className="form-control"
                    value={withdraw.value}
                    type="number"
                    onChange={(e) =>
                      setWithdraw({ ...withdraw, value: e.target.value })
                    }
                  ></input>
                </div>
                <div className="row-1 mb-2">
                  <label className="me-2">Ангилал:</label>
                  <input
                    className="form-control"
                    value={withdraw.category}
                    type="text"
                    onChange={(e) =>
                      setWithdraw({ ...withdraw, category: e.target.value })
                    }
                  ></input>
                </div>
                <div className="row-1 mb-2">
                  <label className="me-2">Тайлбар:</label>
                  <input
                    className="form-control"
                    value={withdraw.description}
                    type="text"
                    onChange={(e) =>
                      setWithdraw({ ...withdraw, description: e.target.value })
                    }
                  ></input>
                </div>
                <div className="row-1 mb-2">
                  <label className="me-2">Он сар:</label>
                  <input
                    className="form-control"
                    value={withdraw.inserted}
                    type="date"
                    onChange={(e) =>
                      setWithdraw({ ...withdraw, inserted: e.target.value })
                    }
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addWithDraw}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl">
        {lists.map((e, i) => {
          return <Item data={e} key={i}></Item>;
        })}
      </div>
    </div>
  );
}
