import React, { useEffect, useState } from "react";
import "./profile.scss";
import instance from "../../../utility/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigation = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  const [trigger, setTrigger] = useState(false);

  const [profile, setProfile] = useState();

  // -------------------------------------

  const [motherName, setMotherName] = useState("");

  const [fatherName, setFatherName] = useState("");

  const [guardianName, setGuardianName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [oldPass, setOldPass] = useState("");

  const [newPass, setNewPass] = useState("");

  const [confirmPass, setConfirmPass] = useState("");

  const handleMotherName = (e) => {
    setMotherName(e.target.value);
  };

  const handleFatherName = (e) => {
    setFatherName(e.target.value);
  };

  const handleGuardianName = (e) => {
    setGuardianName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOldPassword = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      alert("Password don't match");
      return;
    }

    const formData = {
      motherName: motherName,
      fatherName: fatherName,
      guardianName: guardianName,
      phone: phone,
      address: address,
      old_password: oldPass,
      new_password: newPass,
    };

    try {
      // Make PATCH request to update category
      await instance.put(`/parent/profile`, formData);
      alert("Update Successful");
      // Close the update popup
      setTrigger(!trigger);
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await instance.get("/parent/check-auth");
        console.log(res.data);
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
        console.log({ error: err });
        navigation("/");
      }
    };
    checkAuth();
  }, [trigger]);

  useEffect(() => {
    instance
      .get("/parent/profile")
      .then((res) => {
        if (res.data !== "No data found") {
          setProfile(res.data);
          setMotherName(res.data.mother_name);
          setFatherName(res.data.father_name);
          setGuardianName(res.data.guardian_name);
          setPhone(res.data.phone);
          setAddress(res.data.address);
          console.log(res.data);
        } else console.log("No data found");
      })
      .catch((err) => console.log(err));
  }, []);

  if (authenticated && profile)
    return (
      <div className="profile-container">
        <div className="profile-top">
          <span>Parent Profile</span>
        </div>
        <div className="profile-bottom">
          <div className="buttom-left">
            <div className="left-body">
              <form onSubmit={submit} id="parentUpdate">
                <div className="inputField-cover">
                  <label>Guardian NIC : </label>
                  <input type="text" placeholder="Guardian NIC" disabled={true} value={profile.guardian_nic}/>
                </div>

                <div className="inputField-cover">
                  <label>Email : </label>
                  <input type="text" placeholder="Email" disabled={true} value={profile.email}/>
                </div>

                <div className="inputField-cover">
                  <label>Area : </label>
                  <input className="area" type="text" placeholder="Area" disabled={true} value={profile.area_name}/>
                </div>

                <div className="inputField-cover">
                  <label>Mother Name :</label>
                  <input onChange={handleMotherName} value={motherName} type="text" id="mother-name" name="mother-name" required={true} />
                </div>

                <div className="inputField-cover">
                  <label>Father Name :</label>
                  <input onChange={handleFatherName} value={fatherName} type="text" id="father-name" name="father-name" required={true} />
                </div>

                <div className="inputField-cover">
                  <label>Guardian Name :</label>
                  <input onChange={handleGuardianName} value={guardianName} type="text" id="father-name" name="guardian-name" required={true} />
                </div>

                <div className="inputField-cover">
                  <label>Phone number :</label>
                  <input onChange={handlePhone} value={phone} type="text" id="phone" name="phone" required={true} />
                </div>

                <div className="inputField-cover">
                  <label>Address :</label>
                  <input onChange={handleAddress} value={address} type="text" id="address" name="address" required={true} />
                </div>

                <div className="inputField-cover">
                  <label>Current Password :</label>
                  <input value={oldPass} onChange={handleOldPassword} type="text" placeholder="Current Password" id="current-password" name="current-password" />
                </div>

                <div className="inputField-cover">
                  <label>New Password :</label>
                  <input value={newPass} onChange={handleNewPassword} type="password" placeholder="New Password" id="new-password" name="new-password" />
                </div>

                <div className="inputField-cover">
                  <label>Confirm Password :</label>
                  <input value={confirmPass} onChange={handleConfirmPassword} type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password"  />
                </div>

                <div className="profile-update-btn">
                  <input type="submit" value={"Update"} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}
