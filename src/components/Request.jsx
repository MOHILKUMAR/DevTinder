import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  // GET API call once
  //Create the slice and methods which i have store in the appStore
  //check the data than dispatch to the store
  //fetch the data from the appStore by the use of useSelector
  //than render the data
  //call the post API which send the request accept or ignore request of the user
  //passing the data in API, status , _id
  //Create the button of the accepted or rejected and pass the parameters
  //create the remove Requests from the requestSlice
  // add the dispatch and action on.

  const dispatch = useDispatch();
  const requestReceived = useSelector((store) => store.requestReceived);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
    //   console.log(res?.data?.data);
      dispatch(removeRequest(_id))
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchResqests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
    //   console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchResqests();
  }, []);

  if (!requestReceived) return;

  if (requestReceived.length === 0) return <h1>No Resquest is Found</h1>;

  return (
    <div>
      {requestReceived.map((req) => {
        const { firstName, lastName, photoUrl } = req.fromUserId;
        const { status, createdAt } = req;

        const date = new Date(createdAt);
        const year = date.getFullYear();
        const months = String(date.getMonth() + 1).padStart(2, "0");
        const dates = String(date.getMonth()).padStart(2, "0");
        const weaks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const days = weaks[date.getDay()];

        // Time at the format of AM / PM

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // 0 ==> 12

        // console.log({days, date, months, year, hours, minutes, ampm})

        return (
          <div key={req._id} className="flex  flex-col">
            <h1 className="text-center text-3xl mt-10">Requests</h1>
            <div className="flex justify-center py-3">
              <div className="flex bg-base-300 shadow-sm  my-10 w-fit p-5">
                <figure>
                  <img className="w-30 h-30 mr-4" src={photoUrl} alt="Movie" />
                </figure>
                <div className="flex flex-col  ">
                  <h2 className=" flex items-start text-2xl ">
                    {firstName.toUpperCase() + " " + lastName.toUpperCase()}
                  </h2>
                  <p className="w-fit text-start ">{status.toUpperCase()}</p>
                  <p className="w-fit text-start">{`${days}, ${dates}-${months}-${year} ${hours}:${minutes} ${ampm}`}</p>
                  <div className="my-2 ">
                    <button className="btn btn-outline btn-primary mr-2"
                      onClick={()=>{reviewRequests("rejected", req._id)}}
                     >
                      Reject
                    </button>

                    <button className="btn btn-outline btn-success"
                    onClick={()=>{reviewRequests("accepted", req._id)}}>
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
