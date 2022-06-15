import "./styles/Myvouchers.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyVouchers } from "../actions/voucher";
import { BsArrowLeftCircle } from "react-icons/bs";

import moment from "moment";

function Myvouchers() {
  const dispatch = useDispatch();
  const { myvouchers } = useSelector((state) => state.voucher);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!myvouchers) dispatch(fetchMyVouchers());
  }, [dispatch, myvouchers]);

  return (
    <>
      <div className="flex">
        <div className="vouch-sidepane">
          <div className="vouch-sidep-items ml-5 pt-10">
            <a className="flex" href="/dashboard">
              <BsArrowLeftCircle
                style={{ fontSize: "1.3em", marginRight: "8px" }}
              />{" "}
              Dashboard
            </a>
          </div>
        </div>
        <div className="myv-body">
          <div className="flex justify-between ml-10 mr-5 mt-3 mb-3">
            <p className="vouch-explore">My vouchers</p>
            <p className="vouch-points">Points available: {user?.points}</p>
          </div>
          <div className="flex flex-wrap justify-evenly">
            {myvouchers &&
              myvouchers.map((each, idx) => <Card key={idx} data={each} />)}
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ data }) {
  return (
    <>
      <div className="myv-card rounded-lg shadow-lg bg-white">
        <a href="#!">
          <img className="myv-cardimg" src={data.details.imageUrl} alt="" />
        </a>
        <div className="px-2 pb-6 pt-3">
          <h5 className="myv-card-title">{data.details.name}</h5>
          <p className="myv-card-desc">
            Amount: {data.details.amount}
            <br />
            Voucher Code: {data.details.voucherCode}
            <br />
            Expires on: {moment(data.details.validity).format("Do MMMM YYYY")}
            <br />
            Redeemed on: {moment(data.createdAt).format("Do MMMM YYYY")}
          </p>
        </div>
      </div>
    </>
  );
}

export default Myvouchers;
