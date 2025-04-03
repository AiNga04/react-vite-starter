import React, { useState } from "react";
import UsersTable from "../components/Users/UsersTable";
import "./UsersPage.scss";
import { Button, Modal, Input, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const UserPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/v1/auth/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          age: age,
          gender: gender,
          address: address,
          role: role,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="users-page">
      <div className="header container">
        <h1 className="title">List User</h1>
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          onClick={showModal}
          className="add-user-btn"
        >
          Add new user
        </Button>

        <Modal
          title="Add New User"
          centered
          open={isModalOpen}
          onCancel={handleCancel}
          className="responsive-modal"
          footer={null}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Age:</label>
              <Input value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <label>Gender:</label>
              <Select
                defaultValue="MALE"
                style={{ width: "100%" }}
                onChange={(value) => setGender(value)}
                options={[
                  { value: "MALE", label: "MALE" },
                  { value: "FEMALE", label: "FEMALE" },
                  { value: "OTHER", label: "OTHER" },
                ]}
              />
            </div>
            <div>
              <label>Role:</label>
              <Select
                defaultValue="USER"
                style={{ width: "100%" }}
                onChange={(value) => setRole(value)}
                options={[
                  { value: "USER", label: "USER" },
                  { value: "ADMIN", label: "ADMIN" },
                ]}
              />
            </div>
            <div>
              <label>Address:</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="btn-submit mt-2">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      </div>
      <UsersTable />
    </div>
  );
};

export default UserPage;
