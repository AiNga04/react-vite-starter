import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import "./UserDeleteModal.scss";
import {IUser} from "../UsersTable.tsx";

interface UserDeleteModalProps {
  token: string;
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userData: null | IUser;
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
  token,
  isModalOpen,
  onClose,
  onSuccess,
  userData,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!userData || !userData._id) {
      toast.error("Invalid user data");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${userData._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      toast.success("User deleted successfully!");
      onSuccess();
      onClose();
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message || "Failed to delete user");
        } else {
            toast.error("An unexpected error occurred");
        }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      className="user-delete-modal"
      title={<span className="modal-title">Delete User</span>}
      centered
      open={isModalOpen}
      onCancel={onClose}
      footer={null}
      width={480}
    >
      <div className="modal-content">
        <p className="confirmation-text">
          Are you sure you want to delete{" "}
          <strong className="user-email">
            {userData?.email || "this user"}
          </strong>
          ?
        </p>
      </div>
      <div className="modal-actions">
        <Button className="cancel-btn" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          className="delete-btn"
          onClick={handleDelete}
          loading={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default UserDeleteModal;
