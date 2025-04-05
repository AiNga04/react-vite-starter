import { useImperativeHandle, forwardRef, useState } from "react";
import { Button, Space, Table, TableColumnType, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./UsersTable.scss";

export interface IUser {
  address: string;
  age: number;
  createdAt?: string;
  email: string;
  gender: string;
  isVerify: boolean;
  name: string;
  role: string;
  type: string;
  updatedAt?: string;
  _id: string;
}

interface UsersTableProps {
  users: IUser[];
  loading: boolean;
  onViewUser: (user: IUser) => void;
  onEditUser: (user: IUser) => void;
  onDeleteUser: (user: IUser) => void;
}

const UsersTable = forwardRef((props: UsersTableProps, ref) => {
  const { users, loading, onViewUser, onEditUser, onDeleteUser } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useImperativeHandle(ref, () => ({
    resetPagination: () => setCurrentPage(1),
  }));

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof IUser
  ): ColumnsType<IUser>[number] => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters!)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        value={searchText}
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const columns: TableColumnType<IUser>[] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "5%",
      render: (_: unknown, __: IUser, index: number) =>
        (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "30%",
      sorter: (a, b) => a.address.localeCompare(b.address),
      ...getColumnSearchProps("address"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      filters: [
        { text: "Admin", value: "ADMIN" },
        { text: "User", value: "USER" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="geekblue"
            variant="solid"
            onClick={() => onViewUser(record)}
          >
            View
          </Button>
          <Button
            color="cyan"
            variant="solid"
            onClick={() => onEditUser(record)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => onDeleteUser(record)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: "20%",
    },
  ];

  return (
    <Table<IUser>
      className="users-table"
      columns={columns}
      dataSource={users}
      rowKey="_id"
      loading={loading}
      pagination={{
        current: currentPage,
        onChange: (page) => setCurrentPage(page),
      }}
      scroll={{ x: "max-content" }}
    />
  );
});

export default UsersTable;
