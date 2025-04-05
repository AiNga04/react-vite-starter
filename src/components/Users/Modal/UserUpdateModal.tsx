import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form, InputNumber } from "antd";
import { toast } from "react-toastify";
import "./UserUpdateModal.scss";
import { IUser } from "../UsersTable";

const { Option } = Select;
const { TextArea } = Input;

interface UserUpdateModalProps {
  token: string;
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userData: null | IUser;
}

const UserUpdateModal: React.FC<UserUpdateModalProps> = ({
  token,
  isModalOpen,
  onClose,
  onSuccess,
  userData,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userData, form]);

  const handleSubmit = async (
    values: Record<string, string | number | undefined>
  ) => {
    setIsSubmitting(true);
    try {
      if (!userData || !userData._id) {
        toast.error("Invalid user data: User ID is missing");
        return;
      }

      const changedFields = Object.keys(values).reduce((acc, key) => {
        if (key === "confirmPassword") return acc;
        if (
          key in userData && // Kiểm tra key có tồn tại trong userData
          values[key] !== undefined &&
          values[key] !== null &&
          values[key] !== "" &&
          values[key] !== userData[key as keyof IUser] // Sử dụng keyof IUser
        ) {
          acc[key] = values[key];
        }
        return acc;
      }, {} as Record<string, string | number | undefined>);

      if (Object.keys(changedFields).length === 0) {
        toast.info("No changes to update");
        onClose();
        return;
      }

      const payload = {
        _id: userData._id,
        ...changedFields,
      };

      console.log(payload);

      const url = `http://localhost:8000/api/v1/users`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.statusCode !== 200) {
        throw new Error(data.message || "Failed to update user");
      } else {
        toast.success(data.message || "User updated successfully!");
        onSuccess();
        onClose();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update user");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      className="user-update-modal"
      title={<span className="modal-title">Update User Profile</span>}
      centered
      open={isModalOpen}
      onCancel={onClose}
      footer={null}
      width={720}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="update-form"
      >
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-grid">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="John Doe" className="custom-input" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="john@example.com" className="custom-input" />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[
                { required: true, message: "Please enter age" },
                {
                  type: "number",
                  min: 1,
                  max: 120,
                  message: "Age must be between 1-120",
                },
              ]}
            >
              <InputNumber className="custom-input" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select className="custom-select">
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="OTHER">Other</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Security</h3>
          <div className="form-grid">
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                placeholder="Leave blank to keep current"
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm new password"
                className="custom-input"
              />
            </Form.Item>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Additional Details</h3>
          <div className="form-grid">
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select className="custom-select">
                <Option value="USER">User</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Address" name="address" className="full-width">
              <TextArea
                rows={3}
                placeholder="Enter your address"
                className="custom-textarea"
              />
            </Form.Item>
          </div>
        </div>

        <div className="form-actions">
          <Button onClick={onClose} className="cancel-btn">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserUpdateModal;
