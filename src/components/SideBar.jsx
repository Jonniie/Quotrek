/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import User from "./User";

export default function SideBar({ locations, loading }) {
  // console.log("locations", locations);
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <User />
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Outlet />
        </>
      )}

      <Footer />
    </div>
  );
}
