// internal
import Loader from "@/components/loader/loader";
import ProfileArea from "@/components/my-account/profile-area";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";

const ProfilePage = () => {
  const { data: orderData, isError, isLoading } = useGetUserOrdersQuery();

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Profile" />
      <HeaderTwo style_2={true} />
      <ProfileArea orderData={orderData} />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default ProfilePage;
