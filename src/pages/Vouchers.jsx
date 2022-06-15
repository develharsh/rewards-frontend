import "./styles/Vouchers.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
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
  const modal = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenProduct, setChosenProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({
    productId: -1,
    quantity: -1,
    denomination: -1,
    imageUrl: "",
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
    const prod = vouchers.filter((each) => each.productId === id)[0];
    setChosenProduct(prod);
  }
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      // console.log(error)
      Swal.fire("Oops", error, "error");
      dispatch(clearErrors());
    }
    if (message) {
      // console.log(message);
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
  }, [dispatch, vouchers, error, message]);

  function toggleModal(id, title) {
    if (!modalVisible) {
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
        return Swal.fire(
          "Oops",
          `Please select quantity of ${title}`,
          "warning"
        );
      }
      modal.current.classList.remove("hidden");
    } else {
      modal.current.classList.add("hidden");
    }
    setModalVisible(!modalVisible);
  }

  function handlePage(newPage) {
    dispatch(fetchVouchers(newPage));
    setPage(newPage);
  }
  function handleSubmit() {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: `Redeem ${title}, ${order.denomination} X ${order.quantity} = ${
    //     order.denomination * order.quantity
    //   }`,
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Redeem!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const selectedProd = vouchers.filter(
    //       (each) => each.productId === order.productId
    //     )[0];
    //     const { imageUrl, name } = selectedProd;
    //     order.imageUrl = imageUrl;
    //     order.name = name;
    //     dispatch(placeOrder(order));
    //   }
    // });
    toggleModal();
    order.imageUrl = chosenProduct.imageUrl;
    order.name = chosenProduct.name;
    dispatch(placeOrder(order));
  }

  return (
    <>
      {loading && <Loader />}

      <div
        ref={modal}
        class="modal show hidden fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      >
        <div class="modal-dialog relative w-auto pointer-events-none">
          <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-body relative p-4">
              <div className="modalImgDiv">
                <img
                  src="/assets/redeemyrvouch.png"
                  className="modalImg"
                  alt="modalImg"
                />
                <p>Redeem your vouchers</p>
              </div>
              {chosenProduct && (
                <div className="ChosenProd mt-7">
                  <img src={chosenProduct.imageUrl} alt="..." />
                  <div className="flex flex-wrap justify-evenly">
                    <p>
                      Denomination: <span>{order.denomination}</span>
                    </p>
                    <p>
                      Quantity: <span>{order.quantity}</span>
                    </p>
                  </div>
                </div>
              )}
              {/* <div style={{ height: "300px" }}></div> */}
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-between p-4 border-t border-gray-200 rounded-b-md">
              <button
                onClick={toggleModal}
                type="button"
                className="modalCloseBtn px-6 py-2.5 text-white font-medium text-xs leading-tight shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="modalCloseBtn px-6 py-2.5 text-white font-medium text-xs leading-tight shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>

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
                    <p className="label">Denomination</p>
                    <Denomination
                      id={each.productId}
                      data={each.valueDenominations}
                      handleChange={handleChange}
                    />
                    <p className="label ml-2">Quantity</p>
                    <Quantity id={each.productId} handleChange={handleChange} />
                  </div>
                  <div className="my-2">
                    <img
                      src="/assets/redeembtn.svg"
                      alt=""
                      className="vouch-select-btn"
                      onClick={() => toggleModal(each.productId, each.title)}
                      // onClick={() => handleSubmit(each.productId, each.name)}
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
    <div className="select-bg">
      <select onChange={(e) => handleChange(id, "quantity", e.target.value)}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((each, idx) => (
          <option key={idx} value={each}>
            {each}
          </option>
        ))}
      </select>
    </div>
  );
}

function Denomination({ id, data, handleChange }) {
  return (
    <div className="select-bg">
      <select
        onChange={(e) => handleChange(id, "denomination", e.target.value)}
      >
        {data.split(",").map((each, idx) => (
          <option key={idx} value={each}>
            {each}
          </option>
        ))}
      </select>
    </div>
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
