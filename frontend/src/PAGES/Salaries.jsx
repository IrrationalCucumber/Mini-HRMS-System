import { Settings } from "@mui/icons-material";
import {
  Button,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  Sheet,
  Table,
  Typography,
  ModalDialog,
  ModalClose,
  Modal,
  Input,
  ModalOverflow,
  Select,
  Option,
  Stack,
} from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";

const Salaries = () => {
  // Store combined employee + salary data
  const [employees, setEmployees] = useState([]);

  // Fetch employees and salaries
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all salary records
        const salaryRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/salaries/all`,
        );
        // Get all employees
        const employeeRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/employee/all`,
        );

        const salaryMap = {};

        salaryRes.data.forEach((salary) => {
          salaryMap[salary.sm_empID] = salary;
        });

        // Merge employee data with salary data
        const mergedEmployees = employeeRes.data.map((emp) => ({
          ...emp,

          // Add salary fields directly to employee object
          smID: salaryMap[emp.employeeID]?.smID ?? null,
          basic_salary: salaryMap[emp.employeeID]?.basic_salary ?? null,
          allowance: salaryMap[emp.employeeID]?.allowance ?? null,
          deduction: salaryMap[emp.employeeID]?.allowance ?? null,
          net_salary: salaryMap[emp.employeeID]?.net_salary ?? null,

          // Keep the entire salary object if needed later
          //   salary: salaryMap[emp.employeeID] ?? null,
        }));

        setEmployees(mergedEmployees);

        console.log(mergedEmployees);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  //add/edit salary details
  const [openModal, setOpenModal] = useState(false);
  const [selectEmp, setSelectEmp] = useState(null);
  const [salary, setSalary] = useState({
    basic_salary: 0,
    deduction: 0,
    allowance: 0,
    sm_empID: "",
  });

  const handleAddSalary = async (id) => {
    try {
      const netSalary =
        Number(salary.basic_salary) +
        Number(salary.allowance) -
        Number(salary.deduction);
      setSalary({ ...salary, sm_empID: id });
      const payload = {
        ...salary,
        net_salary: netSalary,
      };

      console.log(payload); // now correct

      await axios.post(
        `${process.env.REACT_APP_API_URL}/salaries/add`,
        payload,
      );

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  //edit salary detail
  const handleEditSalary = async (id, empID) => {
    const netSalary =
      Number(salary.basic_salary) +
      Number(salary.allowance) -
      Number(salary.deduction);
    setSalary({ ...salary, sm_empID: id });
    const payload = {
      ...salary,
      sm_empID: empID,
      net_salary: netSalary,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/salaries/update/${id}`,
        payload,
      );
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  //filter
  const [filter, setFilter] = useState("");
  const filterList = employees.filter((employee) => {
    const name = employee.full_name
      .toLowerCase()
      .includes(filter.toLocaleLowerCase());

    return name;
  });
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
          Salary Management
        </Typography>
        <Stack direction="row" spacing={2} mb={1}>
          <Input
            type="text"
            placeholder="Search employee"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {/* <Slider
            marks
            orientation="horizontal"
            size="lg"
            valueLabelDisplay="on"
            variant="solid"
          /> */}
        </Stack>
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
                <th style={{ width: "15%" }}>Department</th>
                <th style={{ width: "10%" }}>Basic Salary</th>
                <th style={{ width: "10%" }}>Allowance</th>
                <th style={{ width: "10%" }}>Deductions</th>
                <th style={{ width: "15%" }}>Net Salary</th>
                <th style={{ width: "5%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterList.map((emp) => (
                <tr key={emp.employeeID}>
                  <td>{emp.employeeID}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.Department}</td>
                  <td>
                    {emp.basic_salary ? `₱ ${emp.basic_salary}` : "Not Set"}
                  </td>
                  <td>{emp.allowance ? emp.allowance : "Not Set"}</td>
                  <td>{emp.deduction ? emp.deduction : "Not Set"}</td>
                  <td>{emp.net_salary ? `₱${emp.net_salary}` : "0.00"}</td>
                  <td>
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
                      <Menu>
                        <MenuItem
                          onClick={() => {
                            setOpenModal(true);
                            setSelectEmp(emp);
                          }}
                        >
                          {!emp.smID ? "Add" : "Edit"}
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* ADD/EDIT MODAL */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <ModalOverflow>
                <ModalDialog color="primary" variant="soft">
                  <ModalClose />
                  <Typography>
                    {selectEmp?.smID ? "Edit Salary" : "Add Salary"}
                  </Typography>
                  <Typography
                    level="title-md"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography level="title-md">
                      ID#:{selectEmp?.employeeID} {selectEmp?.full_name}
                    </Typography>
                    {/* display only when edit */}
                    {!selectEmp?.smID ? (
                      ""
                    ) : (
                      <>
                        <Typography level="title-sm">
                          Basic Salary: {selectEmp?.basic_salary}
                        </Typography>
                        <Typography level="title-sm">
                          Allowance: {selectEmp?.allowance}
                        </Typography>
                        <Typography level="title-sm">
                          Deduction: {selectEmp?.deduction}
                        </Typography>
                        <Typography level="title-sm">
                          Net Salary: {selectEmp?.net_salary}
                        </Typography>
                      </>
                    )}
                  </Typography>
                  <Input
                    placeholder="Basic Salary"
                    type="number"
                    value={salary.basic_salary}
                    onChange={(e) =>
                      setSalary({
                        ...salary,
                        basic_salary: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Allowance"
                    type="number"
                    value={salary.allowance}
                    onChange={(e) =>
                      setSalary({
                        ...salary,
                        allowance: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Deduction"
                    type="number"
                    value={salary.deduction}
                    onChange={(e) =>
                      setSalary({
                        ...salary,
                        deduction: e.target.value,
                      })
                    }
                  />
                  New Net Salary:{" "}
                  {Number(salary.basic_salary) +
                    Number(salary.allowance) -
                    Number(salary.deduction)}
                  <Button
                    onClick={() =>
                      selectEmp?.smID
                        ? handleEditSalary(selectEmp.smID, selectEmp.employeeID)
                        : handleAddSalary(selectEmp.employeeID)
                    }
                  >
                    {selectEmp?.smID ? "Edit" : "Add"}
                  </Button>
                </ModalDialog>
              </ModalOverflow>
            </Modal>
          </Table>
        </Sheet>
      </div>
    </>
  );
};
export default Salaries;
