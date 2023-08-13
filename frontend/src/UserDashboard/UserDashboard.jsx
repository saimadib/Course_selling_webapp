import React from "react";
import SideNav from "./Userside-Nave";
import Appbar from "./Appbar";



export default function UserDashboard() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "20% 80%", margin: 0, height: "100vh", position: 'absolute', backgroundColor: "lightgrey",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <SideNav />
      <Appbar/>
    </div>
  );
}
