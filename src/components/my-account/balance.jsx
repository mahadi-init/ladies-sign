import { BACKEND_BASE_URL } from "@/consts/site-data";
import {
  useAddDepositMutation,
  useAddWithdrawMutation,
} from "@/redux/features/transactionApi";
import {
  useGetSellerDataQuery,
  useGetSellerLastTransactionQuery,
  useGetSellerLastWithdrawQuery,
} from "@/redux/features/sellerApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";

export default function Balance() {
  const { user } = useSelector((state) => state.auth);
  const { data: info } = useGetSellerDataQuery();
  const { data: transaction } = useGetSellerLastTransactionQuery();
  const { data: withdraw } = useGetSellerLastWithdrawQuery();

  const [doDeposit, setDoDeposit] = useState(false);
  const [doWithdraw, setDoWithdraw] = useState(false);
  const [addDeposit, {}] = useAddDepositMutation();
  const [addWithdraw, {}] = useAddWithdrawMutation();
  const [inputValue, setInput] = useState();
  const router = useRouter();

  console.log(transaction);
  console.log(withdraw);

  const submitHandler = async () => {
    if (doDeposit) {
      await depositHandler();
    } else {
      await withdrawHandler();
    }
  };

  const depositHandler = async () => {
    if (inputValue <= 0) {
      notifyError("Withdraw must be greater than 0");
      return;
    }

    const customData = {
      mode: "0011",
      payerReference: "123",
      callbackURL: `${BACKEND_BASE_URL}/bkash/execute-payment?seller=${user._id}`,
      amount: inputValue,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: user._id,
    };

    const res = await addDeposit(customData);

    if (res?.data?.success) {
      await router.push(res?.data?.data?.bkashURL);
    } else {
      notifyError("Deposit Failed");
    }
  };

  const withdrawHandler = async () => {
    if (inputValue < 100) {
      notifyError("Withdraw Amount can't be less than 100");
      return;
    }

    const res = await addWithdraw({
      seller: user._id,
      amount: inputValue,
      bkash: user.phone,
    });

    if (res?.data?.success) {
      notifySuccess("Withdraw request send");
    } else {
      notifyError("Withdraw request failed");
    }
  };

  return (
    <>
      <div className="card w-full">
        <div className="card-body">
          <h5 className="card-title">Balance : {info?.data?.balance ?? 0} Tk.</h5>
          <h6 style={{ textAlign: "center", marginTop: "24px" }}>
            Last Transactions
          </h6>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Time</th>
                <th scope="col">Date</th>
                <th scope="col">Payment ID</th>
                <th scope="col">Status</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>
                  {new Date(transaction?.data?.createdAt).toLocaleTimeString()}
                </td>
                <td>{new Date(transaction?.data?.createdAt).toDateString()}</td>
                <td>{transaction?.data?.paymentID}</td>
                <td style={{ color: "green", fontWeight: "700" }}>
                  {transaction?.data?.transactionStatus.toUpperCase()}
                </td>
                <th scope="row" style={{ color: "blue" }}>
                  Deposit
                </th>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>
                  {new Date(withdraw?.data?.createdAt).toLocaleTimeString()}
                </td>
                <td>{new Date(withdraw?.data?.createdAt).toDateString()}</td>
                <td>{transaction?.data?._id}</td>
                <td
                  style={{
                    color:
                      withdraw?.data?.status === "PENDING" ? "red" : "green",
                    fontWeight: "700",
                  }}
                >
                  {withdraw?.data?.status.toUpperCase()}
                </td>
                <th scope="row" style={{ color: "red" }}>
                  Withdraw
                </th>
              </tr>
            </tbody>
          </table>
          <div className="mt-20 d-flex gap-5">
            <a
              className="btn btn-primary"
              onClick={() => {
                setDoWithdraw(false);
                setDoDeposit(!doDeposit);
              }}
            >
              Deposit
            </a>
            <a
              className="btn btn-secondary"
              onClick={() => {
                setDoDeposit(false);
                setDoWithdraw(!doWithdraw);
              }}
            >
              Withdraw
            </a>
          </div>
          <div className="input-group mb-3 mt-10">
            {(doDeposit || doWithdraw) && (
              <>
                <input
                  type="text"
                  className="form-control"
                  placeholder={doDeposit ? "Deposit Amount" : "Withdraw Amount"}
                  aria-label={doDeposit ? "Deposit Amount" : "Withdraw Amount"}
                  aria-describedby="basic-addon1"
                  onChange={(e) => setInput(e.target.value)}
                />
                <a
                  className="btn btn-primary"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={submitHandler}
                >
                  Submit
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
