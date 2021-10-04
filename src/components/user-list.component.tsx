import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import IUserData from "../types/user.type";

const UserList = () => {
  const [user, setUser] = useState<IUserData[]>([]);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveUser();
  }, []);

  const onChangeSearchName = (e:React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUser = () => {
    UserService.getAll()
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUser();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (member: IUserData, index: number) => {
    setCurrentUser(member);
    setCurrentIndex(index);
  };

  const findByName = () => {
    UserService.findByName(searchName)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
            <Link to={"/addmember"} className="nav-link">
              <button
                className="btn btn-outline-secondary"
                type="button"
              >
                Add
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Users List</h4>

        <ul className="list-group">
          {user &&
            user.map((u, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(u, index)}
                key={index}
              >
                {u.name}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentUser.name}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentUser.actived ? "Actived" : "Inactived"}
            </div>

            <Link
              to={"/user/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
