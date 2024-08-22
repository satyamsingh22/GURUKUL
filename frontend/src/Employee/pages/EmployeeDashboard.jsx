/* eslint-disable no-unused-vars */
// src/pages/Dashboard.jsx

import OnGoingCourseCard from "../component/dashboard/OnGoingCourseCard";
import CourseThumbnail from "../component/courses/CourseThumbnail";
import DashboardCard from "../component/dashboard/DashboardCard";
import Spinner from "../../Common/Ui/Spinner";

import { useEmployeeInfo } from "../component/employee_info/useEmployeeInfo";
import { useState } from "react";
import { useEmployeeById } from "../../Admin/components/employee/useEmployeeById";

export default function EmployeeDashboard() {
  // const [token] = useState(localStorage.getItem("token"));
  // const { isLoading, employe_info } = useEmployeeById("MHPL0481");
  const { isLoading, employee: employe_info } = useEmployeeById("MHPL0481");
  if (isLoading) return <Spinner />;

  return (
    <div className="p-4 w-full bg-white min-h-screen">
      <div className="flex flex-row">
        <h1 className="text-4xl w-1/2 font-bold mb-4">Dashboard</h1>
        <p className="text-xl  mb-4 pt-2 font-medium">
          {" "}
          {`Employee ID : ${employe_info.empId}`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <DashboardCard
          title="Courses Completed"
          courses={[
            "Advanced Python Programming (40 hours)",
            "Machine Learning Basics (30 hours)",
            "Data Science with R (25 hours)",
          ]}
        />
        <DashboardCard
          title="Courses Enrolled"
          courses={[
            "Deep Learning with TensorFlow (20 hours)",
            "Natural Language Processing (25 hours)",
            "Big Data Analytics (30 hours)",
          ]}
        />
        <DashboardCard
          title="Courses Not Started"
          courses={[
            "Introduction to AI (15 hours)",
            "Blockchain Technology (20 hours)",
            "Cybersecurity Essentials (25 hours)",
          ]}
        />
        <DashboardCard
          title="Certificates Earned"
          courses={[
            "Certified Data Scientist",
            "Certified Machine Learning Specialist",
            "Certified Python Developer",
          ]}
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Ongoing Courses</h2>
      <div className="flex flex-col lg:grid-cols-3 gap-4 mb-8">
        <OnGoingCourseCard title="Full Stack Web Development" progress={75} />
        <OnGoingCourseCard
          title="Data Visualization with Python"
          progress={50}
        />
        <OnGoingCourseCard
          title="Introduction to Cloud Computing"
          progress={25}
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">More Courses</h2>
      <div className="flex flex-wrap pt-4 pb-20">
        <CourseThumbnail progress={0} />
        <CourseThumbnail progress={0} />
        <CourseThumbnail progress={0} />
      </div>
    </div>
  );
}
