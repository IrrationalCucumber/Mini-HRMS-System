import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Sheet, Stack, Button } from "@mui/joy";
import TitleText from "../COMPONENT/Text";
import ButtonComp from "../COMPONENT/Button";

const Payslip = () => {
  // Read the employee ID from the route parameter
  const { id } = useParams();
  const navigate = useNavigate();

  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch payroll details
  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/payroll/employee/${id}`,
        );
        setPayroll(res.data);
      } catch (error) {
        console.error("Error fetching payslip data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, [id]);

  // Format numbers as Philippine Peso currency
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "") {
      return "₱ 0.00";
    }
    return `₱ ${Number(amount).toFixed(2)}`;
  };

  // Trigger browser print dialog for the payslip page
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Loading payslip...
        </div>
      </>
    );
  }

  // Show a fallback if payroll data cannot be retrieved
  if (!payroll || !payroll.employee) {
    return (
      <>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <TitleText level="h2" content="Payslip not available" />
          <ButtonComp
            onClick={() => navigate("/payroll")}
            content="Back to Payroll"
          />
        </div>
      </>
    );
  }

  const payrolldate = payroll.payrolldate
    ? new Date(payroll.payrolldate).toISOString().split("T")[0]
    : "N/A";

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          marginTop: "2rem",
          padding: "0 1rem",
        }}
      >
        <TitleText level="h1" content="Payslip" />
        <ButtonComp
          color="success"
          onClick={handlePrint}
          content="Print Payslip"
        />
        <Sheet
          color="primary"
          variant="soft"
          sx={{ width: "100%", maxWidth: 900, padding: "1.5rem" }}
        >
          <Stack spacing={2}>
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Employee Name:</strong> {payroll.employee.full_name}
              </div>
              <div>
                <strong>Employee ID:</strong> {payroll.employee.employeeID}
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Payroll Date:</strong> {payrolldate}
              </div>
              <div>
                <strong>Payroll Record ID:</strong> {payroll.payrollID}
              </div>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ccc",
                      padding: "0.75rem",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      borderBottom: "1px solid #ccc",
                      padding: "0.75rem",
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.75rem" }}>Basic Salary</td>
                  <td style={{ padding: "0.75rem", textAlign: "right" }}>
                    {formatCurrency(payroll.basic_salary)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem" }}>Allowance</td>
                  <td style={{ padding: "0.75rem", textAlign: "right" }}>
                    {formatCurrency(payroll.allowance)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem" }}>Deductions</td>
                  <td style={{ padding: "0.75rem", textAlign: "right" }}>
                    {formatCurrency(payroll.deductions)}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontWeight: "bold",
                      borderTop: "1px solid #ccc",
                    }}
                  >
                    Net Salary
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontWeight: "bold",
                      borderTop: "1px solid #ccc",
                    }}
                  >
                    {formatCurrency(payroll.net_salary)}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Navigation button back to payroll summary */}
            <ButtonComp
              onClick={() => navigate("/payroll")}
              content="Back to Payroll"
            />
          </Stack>
        </Sheet>
      </div>
    </>
  );
};

export default Payslip;
