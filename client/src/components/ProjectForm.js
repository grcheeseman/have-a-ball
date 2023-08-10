import React from "react";
import { Formik } from "formik";

const ProjectForm = ({ project, onSubmit }) => (
  <div>
    <h1>Project Information</h1>
    <Formik
      initialValues={{
        pattern_name: project.pattern_name,
        body: project.body,
        picture: project.picture,
      }}
      onSubmit={onSubmit}
    >
      {(props) => (
       <div className='flex justify-center'>
       <form className="w-1/4 m-5" onSubmit={props.handleSubmit}>
          
          <div className='flex flex-col'>
            <label className="form-label mt-5" htmlFor="pattern_name">
            Pattern Name:
          </label>
          <input className="searchTerm rounded border p-2"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.pattern_name}
            id="pattern_name"
            name="pattern_name"
          />
          <label className="form-label mt-5" htmlFor="body">
            Project Description:
          </label>
          <input className="searchTerm rounded border p-2"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.body}
            id="body"
            name="body"
          />
          <label className="form-label mt-5" htmlFor="picture">
            Picture URL:
          </label>
          <input className="searchTerm rounded border p-2"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.picture}
            id="picture"
            name="picture"
          />
         
         {props.errors.name && <div id="feedback">{props.errors.name}</div>}
         </div>
          <button className="mt-5 p-2 rounded text-white bg-slate-500" type="submit">Save Changes</button>
        </form>
        </div>
      )}
    </Formik>
  </div>
);

ProjectForm.defaultProps = {
  project: { pattern_name: "", body: "", picture: "" },
};

export default ProjectForm;
