// import React from "react";
import "./styles/Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLogs } from "../actions/logs";
import moment from "moment";

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { logs } = useSelector((state) => state.logs);

  useEffect(() => {
    if (!logs) {
      // alert("a")
      dispatch(fetchLogs());
    }
    // else console.log("B",logs)
  }, [dispatch, logs]);

  return (
    <>
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
            <p style={{ color: "#db716d" }}>Dashboard</p>
            <p className="dash-rewards-hr"></p>
            <p>Redeemed Vouchers</p>
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
                <p>{user && user.points}</p>
              </div>
              <div>
                <img src="/assets/gold.svg" alt="" />
              </div>
            </div>
            <div className="dash-card ml-12">
              <div>
                <p>Rewards</p>
                <p>Redeemed</p>
                <p>{user && user.totalRedeemed}</p>
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
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <tbody>
                        {logs && <Table rows={logs} />}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Table({ rows }) {
  return (
    <>
      {rows.map((each, idx) => (
        <tr class="border-b" keye={idx}>
          <td class="dash-date">
            {moment(each.createdAt).format("Do MMMM YYYY")}
          </td>
          <td class="dash-text">
            {each.points < 0
              ? "You redeemed points from your balance."
              : `You earned points for ${each.activity.title}.`}
          </td>
          <td class="dash-points py-2">
            {each.points > 0 ? (
              <img src="/assets/up.svg" alt="..." className="dash-profit" />
            ) : (
              <img src="/assets/down.svg" alt="..." className="dash-loss" />
            )}
            <span>{each.points < 0 ? -each.points : each.points}</span>
          </td>
        </tr>
      ))}
    </>
  );
}

export default Dashboard;
