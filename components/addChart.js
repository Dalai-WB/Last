import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";

export default function AddChart({ withdraws, deposit }) {
  const [zarlaga, setZarlaga] = useState(withdraws);
  const [orlogo, setOrlogo] = useState(deposit);
  const [zarlagaTotal, setTotalZarlaga] = useState(0);
  const [orlogoTotal, setTotalOrlogo] = useState(0);
  const [ogogd, setOgogd] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const cpmt = () => {
    if (loading) {
      if (zarlagaTotal == 0 && orlogoTotal == 0) {
        zarlaga.map((elm) => {
          let a = zarlagaTotal;
          a += elm.value;
          setTotalZarlaga(a);
        });
        orlogo.map((elm) => {
          let a = orlogoTotal;
          a += elm.value;
          setTotalOrlogo(a);
        });
        setLoading(false);
      }
    } else {
      const labels = ["Орлого", "Зарлага"];
      setOgogd({
        labels: labels,
        datasets: [
          {
            label: "Орлого ба Зарлага",
            backgroundColor: ["rgba(149, 76, 233, 1)", "rgb(255, 0, 0)"],
            borderColor: "rgb(0,0,255)",
            data: [zarlagaTotal, orlogoTotal],
          },
        ],
      });
      setLoading2(false);
    }
  };

  useEffect(() => {
    cpmt();
    if (zarlagaTotal > 0) return;
  }, [loading]);
  return !loading2 ? (
    <div className="mt-5 d-flex justify-content-center">
      <div style={{ width: "40vw" }}>
        <Pie data={ogogd} />
      </div>
    </div>
  ) : (
    <div className="bg-primary">unshjin</div>
  );
}
