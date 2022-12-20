import Line from "../components/line";
import { getCookie, setCookie } from "cookies-next";
import AddChart from "../components/addChart";

export const getServerSideProps = async (req, res) => {
  let withdraws = [];
  let deposit = [];
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  console.log(userId);

  if (userId == undefined) {
    withdraws = [];
    deposit = [];
  } else {
    withdraws = await fetch(
      `${
        process.env.NODE_ENV != "production"
          ? "http://localhost:3000"
          : "https://web-8-qq8c.vercel.app"
      }/api/with-list/${userId}`
    );
    withdraws = await withdraws.json();
    deposit = await fetch(
      `${
        process.env.NODE_ENV != "production"
          ? "http://localhost:3000"
          : "https://web-8-qq8c.vercel.app"
      }/api/depo-list/${userId}`
    );
    deposit = await deposit.json();
  }

  if (
    typeof withdraws === "object" &&
    typeof deposit === "object" &&
    withdraws.length === 0
  ) {
    withdraws = [];
    deposit = [];
  }
  //   console.log(withdraws);
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      withdraws: withdraws.length === 0 ? [] : withdraws,
      deposit: deposit.length === 0 ? [] : deposit,
    },
  };
};

export default function Report({ token, withdraws, userId, deposit }) {
  return (
    <div className="container mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="./">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Charts
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <Line withdraws={withdraws} deposit={deposit}></Line>
          <AddChart withdraws={withdraws} deposit={deposit}></AddChart>
        </div>
      </div>
    </div>
  );
}
