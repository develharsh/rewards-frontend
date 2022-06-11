// import React from "react";
import "./styles/Dashboard.css";
import Header from "../components/Layout/Header";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

function Dashboard() {
  return (
    <>
      <Header />
      <div className="dash-main flex">
        <div className="dash-sidepane">
          <div className="dash-sidep-items ml-5 pt-10">
            <h1>MY PROFILE</h1>
            <p>Profile Details</p>
            <p>Account settings</p>
          </div>
          <div className="dash-sidep-items ml-5 pt-10">
            <h1>MY WORKSPACES</h1>
            <p>My teleconsultations</p>
            <p>Content workspace</p>
          </div>
          <div className="dash-sidep-items ml-5 pt-10">
            <h1>MY REWARDS</h1>
          </div>
          <div className="ml-5">
            <p className="dash-rewards-hr"></p>
          </div>
          <div className="flex space-x-4 dash-social-media">
            <img src="/assets/insta.png" alt="a" />
            <img src="/assets/twitter.png" alt="b" />
            <img src="/assets/facebook.png" alt="c" />
            <img src="/assets/linkedin.png" alt="d" />
          </div>
        </div>
        <div className="dash-body">
          <div className="flex flex-wrap">
            <div className="dash-card ml-28">
              <div>
                <p>Rewards</p>
                <p>Balance</p>
                <p>530</p>
              </div>
              <div>
                <img src="/assets/gold.svg" alt="" />
              </div>
            </div>
            <div className="dash-card ml-12">
              <div>
                <p>Rewards</p>
                <p>Redeemed</p>
                <p>125</p>
              </div>
              <div>
                <img src="/assets/rewards.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="ml-28 mt-8 dash-activity">
            <p>Recent Activity</p>
            <p></p>
          </div>
          <div className="ml-28 mt-5" style={{ width: "62vw" }}>
            <hr />
            <p className="flex justify-between dash-logs my-3">
              <span>1st June 2022</span>
              <span>You earned points for referring a connection.</span>
              <span>
                <BsArrowUpCircle
                  style={{
                    fontSize: "1.4em",
                    marginRight: "8px",
                  }}
                />{" "}
                10
              </span>
            </p>
            <hr />
            <p className="flex justify-between dash-logs my-3">
              <span>25th May 2022</span>
              <span>You redeemed points from your balance.</span>
              <span>
                <BsArrowDownCircle
                  style={{ fontSize: "1.4em", marginRight: "8px" }}
                />{" "}
                50
              </span>
            </p>
            <hr />
            <p className="flex justify-between dash-logs my-3">
              <span>1st June 2022</span>
              <span>You redeemed points from your balance.</span>
              <span>
                <BsArrowDownCircle
                  style={{ fontSize: "1.4em", marginRight: "8px" }}
                />{" "}
                400
              </span>
            </p>
            <hr />
            <p className="flex justify-between dash-logs my-3">
              <span>1st June 2022</span>
              <span>You earned points for loggin in daily.</span>
              <span>
                <BsArrowUpCircle
                  style={{ fontSize: "1.4em", marginRight: "8px" }}
                />{" "}
                10
              </span>
            </p>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
