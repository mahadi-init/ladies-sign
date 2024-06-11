import React from "react";
import { useSelector } from "react-redux";

function SingleNav({ active = false, id, title, icon }) {
  return (
    <button
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      <span>
        <i className={icon}></i>
      </span>
      {title}
    </button>
  );
}

function SellerNavs() {
  return (
    <>
      <SingleNav id="balance" title="Balance" icon="fa-light fa-wallet" />
      <SingleNav
        id="commission"
        title="Commission"
        icon="fa-light fa-money-bill"
      />
      <SingleNav id="settings" title="Settings" icon="fa-light fa-gear" />
    </>
  );
}

const ProfileNavTab = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
      >
        <SingleNav
          active={true}
          id="profile"
          title="Profile"
          icon="fa-regular fa-user-pen"
        />

        <SingleNav
          id="order"
          title="My Orders"
          icon="fa-light fa-clipboard-list-check"
        />

        {user && <SellerNavs />}
      </div>
    </nav>
  );
};

export default ProfileNavTab;
