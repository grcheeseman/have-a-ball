import { useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const failureAlert = () => {
  toast.warning("Failed to create project.", {
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

// const successAlert = () => {
//   toast.success("Project created successfully", {
//     position: "bottom-center",
//     autoClose: 4000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: false,
//     progress: undefined,
//     theme: "light",
//   });
// };

function ProjectAddForm ({user, project, setProject, onProjectChange, onKnitterUpdate}){
    const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const successAlert = () => {
    toast.success("Project created successfully", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate(`/dashboard`);
    }, "3000");
  };

  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      picture: "",
      body: "",
      pattern_name: "",
      likes: "",
    },
    onSubmit: (values) => {
      const data = {
        user_id: values.user_id,
        picture: values.picture,
        body: values.body,
        pattern_name: values.pattern_name,
        likes: values.likes,
      };

      console.log(data);
      fetch("/projects", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Server response:", response);
          //   const message = response.message;
          //   console.log("Response message:", message);
          if (response.name) {
            successAlert();
            formik.resetForm();
            onProjectChange();
            onKnitterUpdate();
          } else {
            console.log("Failed to create project.");
            failureAlert();
          }
        })
        .catch((errors) => {
          console.log("Errors", errors);
          failureAlert();
        });
    },
  });
  return (
    <div className="container mx-auto form-container">
      <form
        onSubmit={formik.handleSubmit}
        id="project-add-form"
        method="POST"
        className="form"
      >
        <div>
          <label className="form-label">Profile Picture</label>
          <input
            name="picture"
            id="picture"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.picture}
          ></input>
          <p className="error"> {formik.errors.picture}</p>
        </div>
        <div>
          <label className="form-label">Project Caption</label>
          <input
            name="body"
            id="body"
            className="form-control"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <p className="error"> {formik.errors.body}</p>
        </div>
        <div>
          <label className="form-label">Pattern Name</label>
          <input
            name="pattern_name"
            id="pattern_name"
            className="form-control"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.pattern_name}
          />
          <p className="error"> {formik.errors.pattern_name}</p>
        </div>
        <div>
          <label className="form-label">Likes</label>
          <input
            name="likes"
            id="likes"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.likes}
          />
          <p className="error"> {formik.errors.likes}</p>
        </div>
        
        <div>
          <button type="submit" className="px-btn px-btn-theme mt-4">
            {isLoading ? "Loading..." : "Create Project"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ProjectAddForm;