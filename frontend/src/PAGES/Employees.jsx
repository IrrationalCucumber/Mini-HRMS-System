/**
 * TODO
 *     
    Edit Employee details
    Add new employee
    Delete new emplyee
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Sheet,
  Table,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
  Snackbar,
  IconButton,
  Modal,
  ModalDialog,
  ModalClose,
  Input,
  Stack,
  Option,
  Select,
} from "@mui/joy";
import { Add, Close, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  //ferch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/employee/all`,
        );
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);
  //delete employee
  const [snackbarOpen, setSnackbarOpen] = useState({
    state: false,
    message: "",
    color: "success",
  });
  const handleDelete = async (employeeID) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/employee/delete/${employeeID}`,
      );
      setSnackbarOpen({
        state: true,
        message: "Employee deleted successfully",
        color: "warning",
      });
      // Remove the deleted from the list
      setEmployees(employees.filter((emp) => emp.employeeID !== employeeID));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  //add new employee
  const [newEmployee, setNewEmployee] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    Position: "",
    Department: "",
    Date_Hired: "",
    EmploymentStatus: "active",
  });

  const addNewEmployee = async (e) => {
    e.preventDefault();
    try {
      //if empty fields
      if (
        !newEmployee.full_name ||
        !newEmployee.email ||
        !newEmployee.contact_number ||
        !newEmployee.Position ||
        !newEmployee.Department ||
        !newEmployee.Date_Hired
      ) {
        setSnackbarOpen({
          state: true,
          message: "Please fill in all required fields",
          color: "error",
        });
        return;
        //if invalid email format
      } else if (!/\S+@\S+\.\S+/.test(newEmployee.email)) {
        setSnackbarOpen({
          state: true,
          message: "Please enter a valid email address",
          color: "error",
        });
        return;
        //if invalid contact number format
      } else if (!/^\d{10}$/.test(newEmployee.contact_number)) {
        setSnackbarOpen({
          state: true,
          message: "Please enter a valid 10-digit contact number",
          color: "error",
        });
        return;
      } else if (!newEmployee.Date_Hired) {
        setSnackbarOpen({
          state: true,
          message: "Please select a date hired",
          color: "error",
        });
        return;
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/employee/add`,
          newEmployee,
        );
        setSnackbarOpen({
          state: true,
          message: "Employee added successfully",
          color: "success",
        });
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error adding new employee:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Typography level="h1" noWrap={false} variant="plain">
          Employee Management
        </Typography>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          size="lg"
        >
          <Add /> Add Employee
        </Button>
        <Sheet color="primary" variant="solid">
          <Table
            borderAxis="y"
            stickyFooter={false}
            stickyHeader
            variant="soft"
            color="primary"
            size="lg"
          >
            <thead>
              <tr>
                <th style={{ width: "5%" }}>ID</th>
                <th style={{ width: "20%" }}>Full Name</th>
                <th style={{ width: "20%" }}>Email</th>
                <th style={{ width: "10%" }}>Contact Number</th>
                <th style={{ width: "10%" }}>Position</th>
                <th style={{ width: "10%" }}>Department</th>
                <th style={{ width: "20%" }}>Date Hired</th>
                <th style={{ width: "10%" }}>Employment Status</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeID}>
                  <td>{employee.employeeID}</td>
                  <td>{employee.full_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.contact_number}</td>
                  <td>{employee.Position}</td>
                  <td>{employee.Department}</td>
                  <td>{employee.Date_Hired}</td>
                  <td>{employee.EmploymentStatus?.toUpperCase()}</td>
                  <td>
                    {/* ACTIONS */}
                    <Dropdown>
                      <MenuButton
                        variant="soft"
                        color="primary"
                        sx={{
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Settings />
                      </MenuButton>
                      <Menu variant="outlined" color="primary">
                        <MenuItem
                          onClick={() =>
                            navigate(`/view/employee/${employee.employeeID}`)
                          }
                        >
                          View
                        </MenuItem>
                        <MenuItem
                          color="danger"
                          onClick={() => handleDelete(employee.employeeID)}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        {/* ALERT NOTIFICATION  */}
        <Snackbar
          open={snackbarOpen.state}
          autoHideDuration={3000}
          color={snackbarOpen.color}
          variant="soft"
          size="lg"
          endDecorator={
            <IconButton
              onClick={() => setSnackbarOpen({ ...snackbarOpen, state: false })}
            >
              <Close />
            </IconButton>
          }
        >
          {snackbarOpen.message}
        </Snackbar>
        {/* ADD NEW EMPLOYEE MODAL */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalDialog color="primary" size="lg" variant="soft">
            <ModalClose />
            <Typography>Add New Employee</Typography>
            <form
              onSubmit={(e) => {
                addNewEmployee(e);
              }}
            >
              <Stack spacing={2}>
                <Input
                  placeholder="Full Name"
                  value={newEmployee.full_name}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      full_name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Contact Number"
                  value={newEmployee.contact_number}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      contact_number: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Position"
                  value={newEmployee.Position}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, Position: e.target.value })
                  }
                />
                <Select
                  placeholder="Department"
                  value={newEmployee.Department}
                  onChange={(event, newValue) =>
                    setNewEmployee({
                      ...newEmployee,
                      Department: newValue,
                    })
                  }
                >
                  <Option value="HR">HR</Option>
                  <Option value="IT">IT</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Maintenance">Maintenance</Option>
                </Select>
                <Input
                  placeholder="Date Hired"
                  type="date"
                  value={newEmployee.Date_Hired}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      Date_Hired: e.target.value,
                    })
                  }
                />
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
};

export default Employees;
