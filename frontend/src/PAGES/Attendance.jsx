import {
  Typography,
  Button,
  Stack,
  Modal,
  ModalDialog,
  ModalClose,
  Input,
  Sheet,
  Table,
} from "@mui/joy";
import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("today");
  //fetch all attendance
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/attendance/all`,
        ); // get all attendance record
        const resEmps = await axios.get(
          `${process.env.REACT_APP_API_URL}/employee/all`,
        );
        setEmployees(resEmps.data);
        setAttendance(res.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);
  console.log(employees);
  //set present date
  const today = new Date().toISOString().split("T")[0];
  //yesteday date
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split("T")[0];
  //filter attendace record
  const filteredAttendance = attendance.filter((record) => {
    if (filter === "today") {
      return record.date === today;
    }
    if (filter === "yesterday") {
      return record.date === yesterday;
    }

    return true;
  });
  //add attendance record
  const handleGenerateTodayAttendance = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; //get present date
      // send present date and id of employee
      await axios.post(
        `${process.env.REACT_APP_API_URL}/attendance/generate-attendance`,
        {
          date: today,
          employees: employees.map((e) => e.employeeID),
        },
      );
      //refetch records
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/attendance/all`,
      );
      //store record on var
      setAttendance(res.data);
    } catch (err) {
      console.error("Error generating attendance:", err);
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
        <Typography level="h1" fontSize="xl2" mb={2}>
          Attendance
        </Typography>

        <Stack direction="row" spacing={2} mb={2}>
          <Button onClick={() => setFilter("today")}>Today</Button>
          <Button onClick={() => setFilter("yesterday")}>Yesterday</Button>
          <Button onClick={() => setFilter("all")}>All</Button>
        </Stack>
        <Button color="success" onClick={handleGenerateTodayAttendance}>
          Generate Today's Attendance
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
                <th style={{ width: "5%" }}>Employee</th>
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "15%" }}>Date</th>
                <th style={{ width: "10%" }}>Time In</th>
                <th style={{ width: "10%" }}>Time Out</th>
                <th style={{ width: "15%" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.attendanceID}>
                  <td>{record.attendanceID}</td>
                  <td>{record.attendanceEmpID}</td>
                  <td>{record.employee.full_name}</td>
                  <td>{record.date}</td>
                  <td>
                    {!record.time_in ? (
                      <button>TIME IN</button>
                    ) : (
                      `${record.time_in}`
                    )}
                  </td>
                  <td>
                    {!record.time_out ? (
                      <button>TIME OUT</button>
                    ) : (
                      `${record.time_out}`
                    )}
                  </td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
    </>
  );
};

export default Attendance;
