import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";

export default function UserList() {
  const [userData, setUserData] = useState(userRows);
  const user = useSelector((state) => state.user.currentUser);
  const getUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await publicRequest.get(`/users`, config).then((res) => {
      setUserData(res.data);
    });
    
  };
  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, [userData]);

  const handleDelete = async (id) => {
    try {
      await publicRequest.put(`/user/:${id}`);
      setUserData(userData.filter((item) => item._id !== id));
    } catch (error) {
      alert("Error Occured in deleting user");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.pic} alt="" />
            {params.row.pic}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.email}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.status}</div>;
      },
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={userData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
