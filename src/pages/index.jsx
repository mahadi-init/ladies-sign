import BannerArea from "@/components/banner/banner-area";
import FeatureArea from "@/components/features/feature-area";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import NewArrivals from "@/components/products/electronics/new-arrivals";
import ProductArea from "@/components/products/electronics/product-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import ProductSmArea from "@/components/products/electronics/product-sm-area";
import SEO from "@/components/seo";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import React from "react";
import CategoryView from "@/components/categories/category-view";
import OfferProducts from "@/components/products/electronics/offer-products";

// TODO: SEARCH, BANNER, ADD MORE PRODUCTS
export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <HomeHeroSlider />
      <FeatureArea />
      <CategoryView />
      <BannerArea />
      <ProductArea />
      <ProductBanner />
      <NewArrivals />
      <ProductSmArea />
      <Footer />
    </Wrapper>
  );
}
