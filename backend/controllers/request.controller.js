import Request from "../models/request.model.js"; 
import Employee from "../models/user.model.js"; 
import Course from "../models/course.model.js"; 

// Controller to add a new request
export const addRequest = async (req, res) => {
  try {
    const { empId, courseId } = req.body;

    if (!empId || !courseId) {
      return res.status(400).json({ message: "empId and courseId are required" });
    }

    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }

    const existingRequest = await Request.findOne({ empId: employee.empId, courseId: course._id });
    if (existingRequest) {
      return res.status(400).json({ message: "Request for this employee and course already exists" });
    }


    const newRequest = new Request({
      empId: employee.empId,
      employeeName: employee.employeeName,
      courseId: course._id,
      courseTitle: course.courseTitle,
    });

    await newRequest.save();

    res.status(200).json({ message: "Request created successfully", data: newRequest });
  } catch (error) {
    console.error("Error adding request:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllRequest = async (req,res)=>{
  try{


    const request = await Request.find()
    
    res.status(200).json(request);

  }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });

  }
}

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully", data: deletedRequest });
  } catch (error) {
    console.error("Error deleting request:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
