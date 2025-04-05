import React, { useState, useEffect, useRef } from "react";
import UsersTable, {IUser} from "../components/Users/UsersTable";
import UserCreateModal from "../components/Users/Modal/UserCreateModal";
import UserViewModal from "../components/Users/Modal/UserViewModal";
import UserUpdateModal from "../components/Users/Modal/UserUpdateModal";
import UserDeleteModal from "../components/Users/Modal/UserDeleteModal";
import "./UsersPage.scss";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const UserPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<null | IUser>(null);
  const [loading, setLoading] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjdlN2Q3MGJjM2FlYmMxZWE0MWFjNTZmIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NDM2NDg3NzMsImV4cCI6MTgzMDA0ODc3M30.JzAYoNydApDphcWOllAEYeTYy1aTXhMSl9Anulv8mh4";

  const tableRef = useRef<{ resetPagination: () => void }>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateSuccess = () => {
    fetchUsers();
    setIsCreateModalOpen(false);
    if (tableRef.current) {
      tableRef.current.resetPagination();
    }
  };

  const handleUpdateSuccess = () => {
    fetchUsers();
    setIsUpdateModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    fetchUsers();
    setIsDeleteModalOpen(false);
  };

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteUser = (user: IUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="users-page container">
      <div className="header container">
        <h1 className="title">List User</h1>
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
          className="add-user-btn"
        >
          Add new user
        </Button>
      </div>

      {/* Users Table */}
      <UsersTable
        ref={tableRef}
        users={users}
        loading={loading}
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {/* Create User Modal */}
      <UserCreateModal
        token={token}
        isModalOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Update User Modal */}
      <UserUpdateModal
        token={token}
        isModalOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        userData={selectedUser}
      />

      {/* Delete User Modal */}
      <UserDeleteModal
        token={token}
        isModalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
        userData={selectedUser}
      />

      {/* View User Modal */}
      <UserViewModal
        isModalOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        userData={selectedUser}
      />
    </div>
  );
};

export default UserPage;
