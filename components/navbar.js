import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";

export default function Navbar({}) {
  let userId;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signOut = () => {
    deleteSession();
    deleteCookie("token");
    deleteCookie("userId");
    router.replace("/login");
  };
  const deleteSession = async () => {
    const token = getCookie("token");
    token;
    axios
      .delete(`/api/get-session/${token}`)
      .then((res) => {
        res;
      })
      .catch((err) => {
        err;
      });
  };

  useEffect(() => {
    userId = getCookie("userId");
    fetch(`api/user/${userId}`)
      .then((data) => data.json())
      .then((res) => {
        setUser(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("userSideC", err);
      });
  }, []);
  return !loading ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse ms-5 ,e-5"
          id="navbarTogglerDemo01"
        >
          <Link className="navbar-brand" href="#">
            DK
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Орлого
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/withdraw">
                Зарлага
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="../report">
                Тайлан
              </Link>
            </li>
          </ul>
          <div className="me-5 fs-5">{user.username}</div>
          <div onClick={signOut} className="btn btn-danger">
            Log out
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <div
      className="spinner-border text-secondary position-absolute top-50 start-50 translate-middle"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
