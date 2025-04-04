import React from "react";
import { Button, Modal, Descriptions, Tag } from "antd";
import "./UserViewModal.scss";

interface UserData {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  role: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface UserViewModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  userData: UserData | null;
}

const UserViewModal: React.FC<UserViewModalProps> = ({
  isModalOpen,
  onClose,
  userData,
}) => {
  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "MALE":
        return "#60a5fa"; // Softer blue
      case "FEMALE":
        return "#f472b6"; // Softer pink
      default:
        return "#9ca3af"; // Neutral gray
    }
  };

  const getRoleColor = (role: string) => {
    return role === "ADMIN" ? "#f87171" : "#34d399"; // Softer red and green
  };

  return (
    <Modal
      title={<span className="modal-title">User Profile Details</span>}
      centered
      open={isModalOpen}
      onCancel={onClose}
      className="user-view-modal"
      footer={null}
      width={720}
    >
      {userData ? (
        <div className="user-details-container">
          <Descriptions
            column={1}
            className="user-descriptions"
            labelStyle={{ width: 160 }}
          >
            <Descriptions.Item label="Full Name">
              <span className="description-value">{userData.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <span className="description-value">{userData.email}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              <span className="description-value">{userData.age}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              <Tag
                color={getGenderColor(userData.gender)}
                className="custom-tag"
              >
                {userData.gender}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={getRoleColor(userData.role)} className="custom-tag">
                {userData.role}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              <span className="description-value">{userData.address}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              <span className="description-value">
                {new Date(userData.createdAt).toLocaleString()}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              <span className="description-value">
                {new Date(userData.updatedAt).toLocaleString()}
              </span>
            </Descriptions.Item>
          </Descriptions>

          <div className="view-actions">
            <Button onClick={onClose} className="close-btn">
              Close
            </Button>
          </div>
        </div>
      ) : (
        <div className="no-data">No user data available</div>
      )}
    </Modal>
  );
};

export default UserViewModal;
