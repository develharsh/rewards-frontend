import "./styles/Myvouchers.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyVouchers } from "../actions/voucher";
import moment from "moment";

function Myvouchers() {
  const dispatch = useDispatch();
  const { myvouchers } = useSelector((state) => state.voucher);
  useEffect(() => {
    if (!myvouchers) dispatch(fetchMyVouchers());
  }, [dispatch, myvouchers]);

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        {myvouchers &&
          myvouchers.map((each, idx) => <Card key={idx} data={each} />)}
      </div>
    </>
  );
}

function Card({ data }) {
  return (
    <>
      <div className="myv-card rounded-lg shadow-lg bg-white">
        <a href="#!">
          <img
            className="myv-cardimg"
            src={data.details.imageUrl}
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="myv-card-title">Card title</h5>
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
