import Link from "next/link";
import { use, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [regist, setRegist] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    rPassword: "",
  });
  const [err, setErr] = useState("");

  const signUp = () => {
    if (
      regist.name.length != 0 &&
      regist.userName.length != 0 &&
      (regist.email.indexOf("@") != -1 || regist.email.indexOf(".") != -1) &&
      regist.password.length > 5 &&
      regist.password == regist.rPassword
    ) {
      setErr("");
      axios
        .post("/api/users", {
          name: regist.name,
          username: regist.userName,
          email: regist.email,
          password: regist.password,
        })
        .then((res) => {
          res;
        })
        .catch((err) => {
          err;
        });
      router.replace("/login");
      return;
    }
    if (regist.name.length === 0) {
      setErr("name алдаатай байна.");
      return;
    }
    if (regist.lastname.length === 0) {
      setErr("lastname алдаатай байна.");
      return;
    }
    if (regist.email.indexOf("@") === -1 || regist.email.indexOf(".") === -1) {
      setErr("email алдаатай байна.(example@gmail.com)");
      return;
    }

    if (regist.password.length < 5) {
      setErr("нууц үг 5-аас их тэмдэгттэй байх ёстой.");
      return;
    }
    if (regist.password != regist.rPassword) {
      setErr("нууц үгүүд өөр байна");
      return;
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
              className="nav-link "
              id="tab-login"
              data-mdb-toggle="pill"
              href="./login"
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
              className="nav-link active"
              id="tab-register"
              data-mdb-toggle="pill"
              href="#"
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
            id="pills-register"
            role="tabpanel"
            aria-labelledby="tab-register"
          >
            <form>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="registerName"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) =>
                    setRegist({ ...regist, name: e.target.value })
                  }
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="registerUsername"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) =>
                    setRegist({ ...regist, userName: e.target.value })
                  }
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="registerEmail"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) =>
                    setRegist({ ...regist, email: e.target.value })
                  }
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) =>
                    setRegist({ ...regist, password: e.target.value })
                  }
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="registerRepeatPassword"
                  className="form-control"
                  placeholder="Repeat password"
                  onChange={(e) =>
                    setRegist({ ...regist, rPassword: e.target.value })
                  }
                />
              </div>

              <div onClick={signUp} className="btn btn-primary btn-block mb-3">
                Sign up
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
