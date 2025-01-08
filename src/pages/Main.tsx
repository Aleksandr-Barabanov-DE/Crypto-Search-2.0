import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import mainPageImg from "../assets/stockImg.png";
import TopFiveAssets from "@/components/TopFiveAssets";
import "@/styles/mainPage.scss";

export default function Main(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const moveToTop = (): void => {
    navigate("/top100");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current && buttonRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(
          imageRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          "-=0.5"
        ).fromTo(
          buttonRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <TopFiveAssets />
      <div className="inner-container">
        <div className="container-left-section">
          <h1>Discover More About Popular Cryptocurrencies!</h1>
          <p>
            This section features the most up-to-date cryptocurrencies with
            their prices, trading volumes, and other essential data. We’ve
            compiled information on the most well-known and rapidly growing
            assets in the market, so you can stay informed on the latest trends.
            Want to learn more? Visit the page with all 100 top
            cryptocurrencies, offering detailed and real-time data.
          </p>
          <button
            className="main-page-button"
            onClick={moveToTop}
            ref={buttonRef}
            aria-label="Go to the top 100 cryptocurrencies"
          >
            View Top 100 Cryptos
          </button>
        </div>
        <img src={mainPageImg} alt="crypto trading image" ref={imageRef} />
      </div>
    </div>
  );
}
