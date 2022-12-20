import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import("flowbite/dist/flowbite")).default;
    };
    use();
  }, []);

  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  if (pageLoading) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>Түр хүлээнэ үү </div>
      </div>
    );
  } else {
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  }
}

export default MyApp;
