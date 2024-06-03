import BannerArea from "@/components/banner/banner-area";
import BlogArea from "@/components/blog/electronic/blog-area";
import ElectronicCategory from "@/components/categories/electronic-category";
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
import InstagramArea from "@/components/instagram/instagram-area";
import React from "react";

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <HomeHeroSlider />
      <FeatureArea />
      <ElectronicCategory />
      <BannerArea />
      <ProductArea />
      <ProductBanner />
      <NewArrivals />
      <ProductSmArea />
      <BlogArea />
      <InstagramArea />
      <Footer />
    </Wrapper>
  );
}
