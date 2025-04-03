import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, TableColumnType } from "antd";
import type { InputRef } from "antd";
import Highlighter from "react-highlight-words";
import "./UsersTable.scss";

interface DataType {
  address: string;
  age: number;
  createdAt: string;
  email: string;
  gender: string;
  isVerify: boolean;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}

interface ApiResponse {
  statusCode: number;
  data: {
    result: DataType[];
  };
}

type DataIndex = keyof DataType;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const UsersTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjdlN2Q3MGJjM2FlYmMxZWE0MWFjNTZmIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NDM2NDM4ODUsImV4cCI6MTgzMDA0Mzg4NX0.J4IBtELNltTPI-cvjmQBUzTkUVAnqYZEc1x4mWZOM2g";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const getData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    const url = "http://localhost:8000/api/v1/users/all";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const json: ApiResponse = await response.json();
      if (json.statusCode === 200) {
        setData(json.data.result);
      }
    } catch (err) {
      const message =
          err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (
      selectedKeys: string[],
      confirm: () => void,
      dataIndex: DataIndex
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
      dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
                       setSelectedKeys,
                       selectedKeys,
                       confirm,
                       clearFilters,
                       close,
                     }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
              ref={searchInput}
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
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
            >
              Filter
            </Button>
            <Button type="link" size="small" onClick={close}>
              close
            </Button>
          </Space>
        </div>
    ),
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    filterDropdownProps: {
      onOpenChange: (open) => {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
    render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ""}
            />
        ) : (
            text
        ),
  });

  const columns: TableColumnType<DataType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "MALE", value: "MALE" },
        { text: "FEMALE", value: "FEMALE" },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      filters: [
        { text: "Under 30", value: "under30" },
        { text: "30-50", value: "30-50" },
        { text: "Over 50", value: "over50" },
      ],
      onFilter: (value, record) => {
        if (value === "under30") return record.age < 30;
        if (value === "30-50") return record.age >= 30 && record.age <= 50;
        return record.age > 50;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "ADMIN", value: "ADMIN" },
        { text: "USER", value: "USER" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Verify",
      dataIndex: "isVerify",
      key: "isVerify",
      filters: [
        { text: "Verified", value: true },
        { text: "Not Verified", value: false },
      ],
      onFilter: (value, record) => record.isVerify === value,
      render: (text: boolean) => (text ? "Yes" : "No"),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
      sorter: (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => formatDate(text),
      sorter: (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
  ];

  return (
      <div className="table-wrapper container">
        {error && (
            <div className="error-message" style={{ color: "red", marginBottom: 16 }}>
              {error}
            </div>
        )}
        <Table<DataType>
            className="users-table"
            columns={columns}
            dataSource={data}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            loading={loading}
        />
      </div>
  );
};

export default UsersTable;