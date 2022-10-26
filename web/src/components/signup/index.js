import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

  useEffect(() => {
    let getAllUsers = async () => {
      let response = await axios.get("https://react-project-12.herokuapp.com/users");
      setUsers(response.data.data);
    };
    getAllUsers();
  }, [toggleRefresh]);

  const doSignup = async (e) => {
    e.preventDefault();

    var profilePictureInput = document.getElementById("profilePictureInput");
    console.log("fileInput: ", profilePictureInput.files); // local url

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

    formData.append("name", Name); // this is how you add some text data along with file
    formData.append("email", Email); // this is how you add some text data along with file
    formData.append("password", Password); // this is how you add some text data along with file
    formData.append("profilePicture", profilePictureInput.files[0]); // file input is for browser only, use fs to read file in nodejs client

    axios({
      method: "post",
      url: "https://react-project-12.herokuapp.com/signup",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(`upload Success` + res.data);
        setToggleRefresh(!toggleRefresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="form">
        <h1>SIGNUP FORM</h1>
        <form onSubmit={doSignup}>
          Name:{" "}
          <input
            name="name"
            type="text"
            placeholder="Name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          Email:{" "}
          <input
            name="email"
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          Password:{" "}
          <input
            name="password"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          Profile Picture:{" "}
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={() => {
              ////// to display imager instantly on screen
              var profilePictureInput = document.getElementById(
                "profilePictureInput"
              );
              var url = URL.createObjectURL(profilePictureInput.files[0]);
              console.log("url: ", url);
              document.getElementById(
                "img"
              ).innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `;
            }}
          />
          <div id="img"></div>
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>

      <h1>Users List: </h1>

      <div className="userlist">
        {users.map((eachUser) => (
          <div key={eachUser.id} className="user">
            <h4>{eachUser.name}</h4>
            <p>{eachUser.email}</p>
            <img width="100px" src={eachUser.profilePicture} alt="" />
            <button
              onClick={() => {
                axios({
                  url: `https://react-project-12.herokuapp.com/user/${eachUser._id}`,
                  method: "delete",
                })
                  .then(function (response) {
                    console.log(response.data);
                    setToggleRefresh(!toggleRefresh);
                  })
                  .catch(function (error) {
                    console.log("error", error);
                  });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
