import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import ListedCrypto from "./ListedCrypto";

import { useSelector } from "react-redux";
import MarketCarouselItem from "./MarketCarouselItem";

const siteConfig = require("../siteConfig");
const listedcrypto = require("./ListedCrypto");

export default function MarketCarousel() {
  const { walletInfo } = useSelector((state) => state.wallet);

  const settings = {
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="market-carousel">
        <Slider {...settings}>
          {walletInfo &&
            walletInfo
              .filter((wallet) => {
                if (!wallet.currency.includes("INR")) {
                  return wallet;
                }
              })
              .map((item) => {
                return <MarketCarouselItem item={item} />;
              })}
        </Slider>
      </div>
    </>
  );
}
