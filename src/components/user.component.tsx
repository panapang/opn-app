import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import IUser from "../types/user.type";
//TODO
const User = (props: any) => {
  const initialUserState = {
    _id: null,
    name: "",
    actived: true
  };
  const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = (id: string) => {
    UserService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateStatus = (status: boolean) => {
    var data: IUser = {
      name: currentUser.name,
      actived: status
    };

   /*  UserService.update(currentUser._id, data)
      .then(response => {
        setCurrentUser({ ...currentUser, actived: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      }); */
  };

  const updateUser = () => {
  /*   UserService.update(currentUser._id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      }); */
  };

  const deleteUser = () => {
    /* UserService.remove(currentUser._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/user");
      })
      .catch(e => {
        console.log(e);
      }); */
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentUser.actived ? "Published" : "Pending"}
            </div>
          </form>

          {currentUser.actived ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;