import Header from "../components/Layout/Header";
import "./styles/Vouchers.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchVouchers,
  clearErrors,
  placeOrder,
  clearMessages,
} from "../actions/voucher";
import { loadUser } from "../actions/user";
import Loader from "../components/Layout/Loader";
import { useNavigate } from "react-router-dom";

function Vouchers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, vouchers } = useSelector(
    (state) => state.voucher
  );
  const { user } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({
    productId: -1,
    quantity: -1,
    denomination: -1,
  });
  function handleChange(id, key, value) {
    value = Number(value);
    if (order.productId === id) {
      setOrder({ ...order, [key]: value });
    } else if (order.productId === -1) {
      setOrder({ ...order, productId: id, [key]: value });
    } else {
      setOrder({ productId: id, quantity: -1, denomination: -1 });
    }
  }
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user) {
      if (error) {
        // console.log(error)
        Swal.fire("Oops", error, "error");
        dispatch(clearErrors());
      }
      if (message) {
        // console.log(message)
        Swal.fire({
          icon: "success",
          title: "Congrats",
          html: `Please Take Screenshot of Below:<br/>Deliver Status: <b>${message.deliveryStatus}</b><br/>Order Status: <b>${message.orderStatus}
            </b><br/>Validity: <b>${message.vouchers[0].validity}</b><br/>Voucher Code: <b>${message.vouchers[0].voucherCode}</b>`,
        }).then(() => dispatch(clearMessages()));
        dispatch(loadUser());
      }
      if (!vouchers) {
        dispatch(fetchVouchers(page));
      }
    }
  }, [dispatch, vouchers, error, message, user]);

  function handlePage(newPage) {
    dispatch(fetchVouchers(newPage));
    setPage(newPage);
  }
  function handleSubmit(id, title) {
    if (order.productId !== id) {
      return Swal.fire(
        "Oops",
        `Please select denomination and quantity of ${title}`,
        "warning"
      );
    }
    if (order.denomination === -1) {
      return Swal.fire(
        "Oops",
        `Please select denomination of ${title}`,
        "warning"
      );
    }
    if (order.quantity === -1) {
      return Swal.fire("Oops", `Please select quantity of ${title}`, "warning");
    }
    Swal.fire({
      title: "Are you sure?",
      text: `Redeem ${title}, ${order.denomination} X ${order.quantity} = ${
        order.denomination * order.quantity
      }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Redeem!",
    }).then((result) => {
      if (result.isConfirmed) dispatch(placeOrder(order));
    });
  }

  return (
    <>
      <Header />
      {loading && <Loader />}
      <div className="vouch-main flex">
        <div className="vouch-sidepane">
          <div className="vouch-sidep-items ml-5 pt-10">
            <h1 className="flex">
              <BsArrowLeftCircle
                style={{ fontSize: "1.3em", marginRight: "8px" }}
              />{" "}
              My rewards
            </h1>
          </div>
          <div className="vouch-sidep-items ml-5 pt-10">
            <h1>Top Categories</h1>
            {vouchers ? (
              Array.from(new Set(vouchers.map((each) => each.categories))).map(
                (each, idx) => (
                  <p>
                    <img key={idx} src="/assets/circle.svg" alt="" /> {each}
                  </p>
                )
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="vouch-body w-full">
          <div className="flex justify-between ml-10 mr-5 mt-3">
            <p className="vouch-explore">Explore vouchers</p>
            <p className="vouch-points">
              Points available: {user ? user.points : <Loader />}
            </p>
          </div>
          <div className="flex flex-wrap justify-evenly space-x-2 mx-2 vouch-div">
            {vouchers ? (
              vouchers.map((each, idx) => (
                <div key={idx} className="mt-3 vouch-card rounded shadow-2xl">
                  <img src={each.imageUrl} alt="" />
                  <p>{each.name}</p>
                  <div className="flex justify-evenly my-2">
                    <Denomination
                      id={each.productId}
                      data={each.valueDenominations}
                      handleChange={handleChange}
                    />
                    <Quantity id={each.productId} handleChange={handleChange} />
                  </div>
                  <div className="my-2">
                    <img
                      src="/assets/select.svg"
                      alt=""
                      className="vouch-select-btn"
                      onClick={() => handleSubmit(each.productId, each.name)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ margin: "30vh auto 0 auto" }}>
                <Loader />
              </div>
            )}
          </div>
          {vouchers && <Pagination page={page} handlePage={handlePage} />}
        </div>
      </div>
    </>
  );
}
function Quantity({ id, handleChange }) {
  return (
    <select
      className="form-select appearance-none
      block
      px-1.5
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      onChange={(e) => handleChange(id, "quantity", e.target.value)}
    >
      <option value="-1">Quantity</option>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((each, idx) => (
        <option key={idx} value={each}>
          {each}
        </option>
      ))}
    </select>
  );
}

function Denomination({ id, data, handleChange }) {
  return (
    <select
      className="form-select appearance-none
      block
      px-1.5
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      onChange={(e) => handleChange(id, "denomination", e.target.value)}
    >
      <option value="-1">Denominations</option>
      {data.split(",").map((each, idx) => (
        <option key={idx} value={each}>
          {each}
        </option>
      ))}
    </select>
  );
}

function Pagination({ page, handlePage }) {
  return (
    <div className="flex justify-center my-10">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <a
              onClick={() => handlePage(1)}
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              First
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={() => handlePage(page - 1)}
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              Previous
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md">
              {page}
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={() => handlePage(page + 1)}
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              Next
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={() => handlePage(32)}
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              Last
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Vouchers;
