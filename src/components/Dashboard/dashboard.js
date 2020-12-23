import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [groupline, setGroupline] = useState([]);
  const [usergroupline, setUsergroupline] = useState([]);
  const [userstatusjoin, setUserstatusjoin] = useState([]);
  const [userstatusleft, setUserstatusleft] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
    let userId = "Bot";

    axios
      .get("http://localhost:1338/userlines/?userId=" + userId)
      .then((res) => {
        let rooms = res.data;
        let statusJ = res.data;
        let statusL = res.data;
        console.log("res.data :>> ", rooms);
        setUsergroupline((usergroupline) => []);
        setUserstatusjoin((userstatusjoin) => []);
        setUserstatusleft((userstatusleft) => []);

        Promise.all(
          rooms.map((room) => getUsers(room.groupId, "memberJoined"))

          //  [getUsers(room.groupId, "memberJoined"),getUsers(room.groupId, "memberJoined")]
        ).then((users) => {
          let userId = users.map((user) => user.data);
          console.log("testest", userId);
          setUsergroupline(userId);
        });

        Promise.all(
          statusJ.map((userjoined) =>
            getStatusUserjoined(userjoined.groupId, "memberJoined")
          )
        ).then((usersjoin) => {
          let userId_j = usersjoin.map((user_j) => user_j.data);
          console.log("userId_j", userId_j);
          setUserstatusjoin(userId_j);
        });

        Promise.all(
          statusL.map((userleft) =>
            getStatusUserleft(userleft.groupId, "memberleft")
          )
        ).then((usersleft) => {
          let userId_l = usersleft.map((user) => user.data);
          console.log("userId_l", userId_l);
          setUserstatusleft(userId_l);
        });

        setGroupline(res.data);
        setLoad(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getUsers = (groupId) => {
    return axios.get(
      "http://localhost:1338/user-line-statuses/?groupId=" + groupId
    );
  };
  const getStatusUserjoined = (groupId, status) => {
    return axios.get(
      "http://localhost:1338/user-line-statuses/count?groupId=" +
        groupId +
        "&status=" +
        status
    );
  };
  const getStatusUserleft = (groupId, status) => {
    return axios.get(
      "http://localhost:1338/user-line-statuses/count?groupId=" +
        groupId +
        "&status=" +
        status
    );
  };

  if (load) {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {error ? (
              <li>{error.message}</li>
            ) : (
              groupline.map((group, index) => {
                return (
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header border-0">
                        <div className="text-center">
                          <img
                            className="profile-user-img img-fluid img-circle"
                            key={index}
                            src={group.pictureUrl}
                            alt="profile"
                          />
                        </div>
                        <h3 className="text-muted text-center" key={index}>
                          {group.displayName}
                        </h3>
                        <div className="row text-center">
                          <div className="col-md-6 textin">
                            <h3>เข้า</h3>
                            {userstatusjoin.map((status_j, i) => {
                              if (index === i)
                                return (
                                  <div>
                                    <h3 key={i}>{status_j}</h3>
                                  </div>
                                );
                            })}
                          </div>
                          <div className="col-md-6 textout">
                            <h3>ออก</h3>
                            {userstatusleft.map((status_l, i) => {
                              if (index === i)
                                return (
                                  <div>
                                    <h3 key={i}>{status_l}</h3>
                                  </div>
                                );
                            })}
                          </div>
                        </div>
                        <ul className="list-group list-group-unbordered mb-3">
                          <div className="row">
                            {(usergroupline[index] || []).map((user, i) => {
                              if (user.status === "memberJoined") {
                                return (
                                  <div
                                    className="col-sm-6 border-right"
                                    key={i}
                                  >
                                    <div className="description-block">
                                      <img
                                        className="profile-user img-fluid img-circle"
                                        key={index}
                                        src={user.pictureUrl}
                                        alt="profile"
                                      />
                                      <span className="description-text">
                                        {user.displayName}
                                      </span>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    className="col-sm-6 border-right"
                                    key={i}
                                  >
                                    <div className="description-block">
                                      <img
                                        className="profile-user img-fluid img-circle"
                                        key={index}
                                        src={user.pictureUrl}
                                        alt="profile"
                                      />
                                      <span className="description-text">
                                        {user.displayName}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="d-flex flex-row justify-content-end"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Dashboard;
