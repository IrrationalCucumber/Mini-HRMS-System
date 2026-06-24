import {
  Button,
  Stack,
  Sheet,
  Table,
  Modal,
  ModalDialog,
  ModalClose,
  Select,
  Option,
} from "@mui/joy";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../COMPONENT/Navbar";
import TitleText from "../COMPONENT/Text";

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
  //present time
  // HH:MM:SS
  const getCurrentTime = () => {
    return new Date().toTimeString().split(" ")[0];
  };
  //time in change
  const handleTimeIn = async (id) => {
    try {
      const time = getCurrentTime();
      const cutoff = "8:00:00";
      var Status = "";
      //convert to numbers
      const toSeconds = (t) => {
        const [h, m, s] = t.split(":").map(Number);
        return h * 3600 + m * 60 + s;
      };
      //detirmine status
      if (toSeconds(time) >= toSeconds(cutoff)) {
        Status = "Late";
      } else {
        Status = "Present";
      }
      //send to backend
      await axios.put(
        `${process.env.REACT_APP_API_URL}/attendance/update/${id}`,
        {
          time_in: time,
          status: Status,
        },
      );

      //refetch records
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/attendance/all`,
      );
      //store record on var
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //time-out
  const handleTimeOut = async (id) => {
    try {
      const time = getCurrentTime();
      //send to backend
      await axios.put(
        `${process.env.REACT_APP_API_URL}/attendance/update/${id}`,
        {
          time_out: time,
        },
      );
      //refetch records
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/attendance/all`,
      );
      //store record on var
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //modal update for status
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState();
  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/attendance/update/${id}`,
        {
          status: status,
        },
      );
      //refetch records
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/attendance/all`,
      );
      //store record on var
      setAttendance(res.data);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <TitleText level={"h1"} fontSize="x12" mb={2} content="Attendance" />
        <Stack direction="row" spacing={2} mb={1}>
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
                      <button
                        onClick={() => {
                          handleTimeIn(record.attendanceID);
                        }}
                      >
                        TIME IN
                      </button>
                    ) : (
                      `${record.time_in}`
                    )}
                  </td>
                  <td>
                    {!record.time_out ? (
                      <button
                        onClick={() => {
                          handleTimeOut(record.attendanceID);
                        }}
                      >
                        TIME OUT
                      </button>
                    ) : (
                      `${record.time_out}`
                    )}
                  </td>
                  <td>
                    <Button variant="plain" onClick={(e) => setOpenModal(true)}>
                      {record.status}
                    </Button>
                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                      <ModalDialog color="primary" size="md" variant="soft">
                        <ModalClose />
                        <TitleText content="Update Status" />
                        <Select
                          placeholder="Select status"
                          value={status}
                          onChange={(event, newValue) => setStatus(newValue)}
                        >
                          <Option value="Present">Present</Option>
                          <Option value="Absent">Absent</Option>
                          <Option value="Late">Late</Option>
                          <Option value="On Leave">On Leave</Option>
                        </Select>
                        <Button
                          onClick={() => {
                            handleUpdateStatus(record.attendanceID);
                          }}
                        >
                          Update
                        </Button>
                      </ModalDialog>
                    </Modal>
                  </td>
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
