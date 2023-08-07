import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const failureAlert = () => {
  toast.warning("Failed to change project.", {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

const successAlert = () => {
  toast.success("Project updated successfully", {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

function ProjectEdit({ user, project, setProject, onProjectChange }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      project_id: project.length > 0 ? project[0].id.toString() : "",
      picture: onProjectChange.picture,
      body: onProjectChange.body,
      pattern_name: onProjectChange.pattern_name,
    },
    onSubmit: (values) => {
      setIsLoading(true);

      fetch(`api/projects/${onProjectChange.id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((project) => {
              onProjectChange(project);
              navigate(`/projects/${onProjectChange.id}`);
            });
          }
        })
        .then((response) => {
          console.log("Server response:", response);
          const message = response.message; // Extract the message value for success/failure indication
          console.log("Response message:", message);
          if (message === "Project changed successfully.") {
            setIsLoading(false);
            successAlert();
            formik.resetForm();
            onProjectChange();
          } else {
            console.log("Failed to change project");
            failureAlert();
          }
        })
        .catch((errors) => {
          console.log("Errors", errors);
          failureAlert();
        });
    },
  });

  //return (
  //     <div className="container mx-auto form-container">
  //       <form
  //         onSubmit={formik.handleSubmit}
  //         id="meetup-add-form"
  //         method="PATCH"
  //         className="form"
  //       >
  //         <div>
  //           <label className="form-label">Select Pet</label>
  //           <select
  //             id="pet_id"
  //             name="pet_id"
  //             className="form-control"
  //             onChange={formik.handleChange}
  //             value={formik.values.pet_id}
  //           >
  //             {pets.map((pet) => (
  //               <option key={pet.id} value={pet.id}>
  //                 {pet.name}
  //               </option>
  //             ))}
  //           </select>
  //           <p className="error"> {formik.errors.pet_id}</p>
  //         </div>
  //         <div>
  //           <label className="form-label">Title</label>
  //           <input
  //             name="title"
  //             id="title"
  //             placeholder="Give your meetup a cool name"
  //             className="form-control"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.title}
  //           />
  //           <p className="error"> {formik.errors.venue}</p>
  //         </div>
  //         <div>
  //           <label className="form-label">Details</label>
  //           <textarea
  //             name="details"
  //             id="details"
  //             placeholder=""
  //             className="form-control"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.details}
  //           />
  //           <p className="error"> {formik.errors.venue}</p>
  //         </div>
  //         <div>
  //           <label className="form-label">Venue Name</label>
  //           <input
  //             name="venue"
  //             id="venue"
  //             placeholder="Enter Your Venue Name. E.g: Dog Park"
  //             className="form-control"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.venue}
  //           />
  //           <p className="error"> {formik.errors.venue}</p>
  //         </div>
  //         <div>
  //           <label className="form-label">Street Address</label>
  //           <input
  //             name="street_address"
  //             id="street_address"
  //             className="form-control"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.street_address}
  //           />
  //           <p className="error"> {formik.errors.street_address}</p>
  //         </div>
  //         <div className="grid grid-cols-2 gap-2">
  //           <div className="col-span-1">
  //             <label className="form-label">City</label>
  //             <input
  //               name="city"
  //               id="city"
  //               className="form-control"
  //               type="text"
  //               onChange={formik.handleChange}
  //               value={formik.values.city}
  //             />
  //             <p className="error"> {formik.errors.city}</p>
  //           </div>
  //           <div className="col-span-1">
  //             <label className="form-label">State</label>
  //             <input
  //               name="state"
  //               id="state"
  //               className="form-control"
  //               type="text"
  //               onChange={formik.handleChange}
  //               value={formik.values.state}
  //             />
  //             <p className="error"> {formik.errors.state}</p>
  //           </div>
  //         </div>
  //         <div>
  //           <label className="form-label">Country</label>
  //           <select
  //             id="country"
  //             name="country"
  //             className="form-control"
  //             onChange={formik.handleChange}
  //             value={formik.values.country}
  //           >
  //             {countries.map((country) => (
  //               <option key={country.code} value={country.code}>
  //                 {country.label}
  //               </option>
  //             ))}
  //           </select>
  //           <p className="error"> {formik.errors.country}</p>
  //         </div>
  //         <div className="grid grid-cols-2 gap-2">
  //           <div className="col-span-1">
  //             <label className="form-label">Date</label>
  //             <div>
  //               <DatePicker
  //                 className="form-control"
  //                 name="date"
  //                 selected={startDate}
  //                 onChange={(date) => formik.setFieldValue("date", date)}
  //                 minDate={new Date()}
  //               />
  //             </div>
  //             <p className="error"> {formik.errors.date}</p>
  //           </div>
  //           <div className="col-span-1">
  //             <label className="form-label">Time</label>
  //             <div>
  //               <TimePicker
  //                 name="time"
  //                 onChange={(time) => formik.setFieldValue("time", time)}
  //                 value={formik.values.time}
  //                 className="form-time"
  //                 clearIcon={null}
  //               />
  //             </div>
  //             <p className="error"> {formik.errors.time}</p>
  //           </div>
  //         </div>
  //         <div>
  //           <label className="form-label">Image</label>
  //           <input
  //             name="image"
  //             id="image"
  //             className="form-control"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.image}
  //           />
  //           <p className="error"> {formik.errors.image}</p>
  //         </div>

  //         <div>
  //           <button type="onClick" className="px-btn px-btn-theme mt-4">
  //             {isLoading ? "Loading..." : "Change Project"}
  //           </button>
  //         </div>
  //         {/* <div>{errorMessage && <div className="error">{errorMessage}</div>}</div> */}
  //       </form>
  //       <ToastContainer />
  //     </div>
  // );
}

export default ProjectEdit;