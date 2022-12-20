import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

export default function Login() {
  console.log(__dirname);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const router = useRouter();
  const signIn = async () => {
    const isExist = await axios.post("/api/check", {
      email: login.email,
      password: login.password,
    });
    if (isExist.data.user) {
      console.log("Yesss!!!");
      let token = await axios.post("/api/session", {
        user_id: isExist.data.user._id,
      });
      token;
      setCookie("token", token.data.token);
      setCookie("userId", token.data.user_id);
      setErr("");
      router.replace("/");
    } else {
      setErr("email эсвэл password буруу байна.");
    }
  };

  return (
    <section className="w-100 p-4 d-flex justify-content-center pb-4">
      <div
        className="shadow-lg p-3 mb-5 bg-body rounded p-5 mt-5"
        style={{ width: "26rem" }}
      >
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link active"
              id="tab-login"
              data-mdb-toggle="pill"
              href="#"
              role="tab"
              aria-controls="pills-login"
              aria-selected="false"
              tabIndex={-1}
            >
              Login
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              id="tab-register"
              data-mdb-toggle="pill"
              href="./register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="true"
            >
              Register
            </Link>
          </li>
        </ul>
        <div>{err}</div>

        <div className="tab-content">
          <div
            className="tab-pane fade active show"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="loginName"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="loginPassword"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
              </div>

              <div onClick={signIn} className="btn btn-primary btn-block mb-4">
                Sign in
              </div>
              {/* Register buttons */}
              <div className="text-center">
                <p>
                  Not a member?{" "}
                  <Link className="text-primary" href="./register">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* Pills content */}
      </div>
    </section>
  );
}
