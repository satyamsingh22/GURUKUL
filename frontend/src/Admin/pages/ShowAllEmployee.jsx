/* eslint-disable react/prop-types */
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useAllEmployee } from "../components/settings/useAllEmployee";
import Spinner from "../../Common/Ui/Spinner";
import { useDeleteEmployee } from "../components/settings/useDeleteEmployee";
import BackButton from "../../Common/Ui/BackButton";
import AddButton from "../ui/AddButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmDelete from "../ui/ConfirmDelete";
import { CiEdit } from "react-icons/ci";
import Dropdown from "../ui/DropDown";

export default function ShowAllEmployee({ title }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { isLoading: loadingAllEmployee, allEmployee } = useAllEmployee();
  const { removeEmployee, isLoading: deletingEmployee } = useDeleteEmployee();
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Compute filtered employees based on input value
  const filteredEmployees = allEmployee?.filter(
    (employee) =>
      (employee.employeeName.toLowerCase().includes(name.toLowerCase()) ||
        employee.empId.toLowerCase().includes(name.toLowerCase())) &&
      (selectedDepartment === "" ||
        employee.department.toLowerCase() === selectedDepartment.toLowerCase())
  );

  const handleChange = (e) => {
    setName(e.target.value);
  };

  if (loadingAllEmployee) return <Spinner />;

  return (
    <>
      <BackButton />
      <div className="min-h-screen w-full bg-white p-4 pb-8">
        <div className="flex items-center justify-between w-full text-3xl font-bold mb-6 pr-22 ">
          <span>{title}</span>
          <div className="mr-20 mb-3">
            <AddButton
              title="Employee"
              onClick={() => navigate("/admin/employeeSignUp")}
            />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-2/3 rounded ">
            <input
              type="text"
              placeholder="Enter user info"
              value={name} // Bind the value to the state
              onChange={handleChange} // Update the state on change
              className="shadow my-1 appearance-none border rounded w-full
                 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-slate-500"
            />
          </div>
          <div className="w-1/3">
            <Dropdown
              selectedOption={selectedDepartment}
              setSelectedOption={setSelectedDepartment}
            />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-5 py-3 w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-5 py-3 w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-5 py-3 w-1/6 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-5 py-3 w-1/7 border-b-2 border-gray-200 bg-gray-100 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.empId}>
                  <td className="px-5 py-3 w-1/7 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.empId}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.employeeName}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.department}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.designation}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.password}
                    </p>
                  </td>
                  <td className="px-5 py-3 w-1/6 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.joiningDate}
                    </p>
                  </td>
                  <td className="flex px-5 py-3 w-1/7 border-b border-gray-200 bg-white text-sm text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/updateEmployee/${employee.empId}`)
                      }
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mr-2 hover:bg-blue-700 hover:scale-110"
                    >
                      <span className="text-xl">
                        <CiEdit />
                      </span>
                      <span className="font-semibold text-md">Edit</span>
                    </button>
                    <button
                      onClick={() => setConfirmDelete(true)}
                      disabled={deletingEmployee}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 hover:scale-110"
                    >
                      <span className="text-xl">
                        <RiDeleteBin6Fill />
                      </span>
                      <span className="font-semibold text-md">Remove</span>
                    </button>
                    {confirmDelete && (
                      <ConfirmDelete
                        what="Employee"
                        who={employee.employeeName}
                        handelClick={() => {
                          removeEmployee({ empId: employee.empId });
                        }}
                        close={setConfirmDelete}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
