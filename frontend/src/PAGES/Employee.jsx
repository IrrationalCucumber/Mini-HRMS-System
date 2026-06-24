import { Input, Stack, Option, Select, Snackbar, IconButton } from "@mui/joy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CalendarMonth,
  Call,
  Email,
  Group,
  Person,
  WorkHistory,
  Work,
  Close,
} from "@mui/icons-material";
import TitleText from "../COMPONENT/Text";
import ButtonComp from "../COMPONENT/Button";

const Employee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    Position: "",
    Department: "",
    Date_Hired: "",
    EmploymentStatus: "",
  });
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/employee/employee/${id}`,
        );
        setEmployee(res.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployee();
  }, [id]);
  //set editable inputs
  const [editable, setEditable] = useState(true);
  const [alert, setAlert] = useState(false);
  const onSaveChange = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/employee/update/${id}`,
        employee,
      );
      setEditable(true);
      setAlert(true);
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };
  return (
    <>
      <TitleText
        level={"h2"}
        fontWeight={"bold"}
        mb={2}
        content={"Employee Details"}
      />
      {/* Edit/Save Buttons */}
      <Stack direction="row" spacing={2} mb={3}>
        <ButtonComp
          variant="outlined"
          onClick={() => setEditable(!editable)}
          content={editable ? "Edit" : "Cancel"}
        />
        <ButtonComp
          variant="solid"
          disabled={editable}
          color="success"
          sx={{ ml: 2 }}
          onClick={onSaveChange}
          content="Save"
        />
      </Stack>
      {/* Alert Snackbar */}
      <Snackbar
        open={alert}
        autoHideDuration={3000}
        color="success"
        variant="soft"
        size="lg"
        endDecorator={
          <IconButton onClick={() => setAlert(false)}>
            <Close />
          </IconButton>
        }
      >
        Employee data updated successfully!
      </Snackbar>
      <Stack direction="column" spacing={2}>
        <Input
          startDecorator={<Person />}
          value={employee.full_name}
          readOnly={editable}
          onChange={(e) =>
            setEmployee({ ...employee, full_name: e.target.value })
          }
        />
        <Input
          startDecorator={<Email />}
          value={employee.email}
          readOnly={editable}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />
        <Input
          startDecorator={<Call />}
          value={employee.contact_number}
          readOnly={editable}
          onChange={(e) =>
            setEmployee({ ...employee, contact_number: e.target.value })
          }
        />
        <Input
          startDecorator={<Work />}
          value={employee.Position}
          readOnly={editable}
          onChange={(e) =>
            setEmployee({ ...employee, Position: e.target.value })
          }
        />
        <Select
          startDecorator={<Group />}
          value={employee.Department}
          disabled={editable}
          readOnly={editable}
          onChange={(event, newValue) =>
            setEmployee({
              ...employee,
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
          startDecorator={<CalendarMonth />}
          type="date"
          value={employee.Date_Hired}
          readOnly={editable}
          onChange={(e) =>
            setEmployee({ ...employee, Date_Hired: e.target.value })
          }
        />
        <Select
          startDecorator={<WorkHistory />}
          value={employee.EmploymentStatus}
          readOnly={editable}
          disabled={editable}
          onChange={(event, newValue) =>
            setEmployee({
              ...employee,
              EmploymentStatus: newValue,
            })
          }
        >
          <Option value="active">Active</Option>
          <Option value="resigned">Resigned</Option>
          <Option value="on leave">On Leave</Option>
        </Select>
      </Stack>
    </>
  );
};
export default Employee;
