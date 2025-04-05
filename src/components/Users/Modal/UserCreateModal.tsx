import React, { useState } from "react";
import { Modal, Input, Select, Button, Form, InputNumber } from "antd";
import { toast } from "react-toastify";
import "./UserCreateModal.scss";

const { Option } = Select;

interface UserCreateModalProps {
  token: string;
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  confirmPassword: string;
  role: string;
  address?: string;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({
  token,
  isModalOpen,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const url = "http://localhost:8000/api/v1/users";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      toast.success(data.message || "User created successfully!");
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to create user");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateConfirmPassword = ({
    getFieldValue,
  }: {
    getFieldValue: (field: string) => string;
  }) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <Modal
      title={<span className="modal-title">Create New User</span>}
      centered
      open={isModalOpen}
      onCancel={onClose}
      className="user-create-modal"
      footer={null}
      width={720}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        className="create-form"
      >
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-grid">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter user's name!" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="Full Name" className="custom-input" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email!" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="user@example.com" className="custom-input" />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[
                { required: true, message: "Please enter age!" },
                {
                  type: "number",
                  min: 1,
                  max: 120,
                  message: "Age must be between 1-120",
                },
              ]}
            >
              <InputNumber
                placeholder="18"
                className="custom-input"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender!" }]}
              initialValue="MALE"
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
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="••••••••" className="custom-input" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm password!" },
                validateConfirmPassword,
              ]}
              hasFeedback
            >
              <Input.Password placeholder="••••••••" className="custom-input" />
            </Form.Item>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Additional Details</h3>
          <div className="form-grid">
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select role!" }]}
              initialValue="USER"
            >
              <Select className="custom-select">
                <Option value="USER">User</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Address" name="address" className="full-width">
              <Input.TextArea
                rows={3}
                placeholder="Street, City, Country..."
                className="custom-textarea"
              />
            </Form.Item>
          </div>
        </div>

        <div className="form-actions">
          <Button type="default" onClick={onClose} className="cancel-btn">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserCreateModal;
