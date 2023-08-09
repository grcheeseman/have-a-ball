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
        <form onSubmit={props.handleSubmit}>
          <label className="form-label" htmlFor="pattern_name">
            Pattern Name:
          </label>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.pattern_name}
            id="pattern_name"
            name="pattern_name"
          />
          <label className="form-label" htmlFor="body">
            Project Description:
          </label>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.body}
            id="body"
            name="body"
          />
          <label className="form-label" htmlFor="picture">
            Picture URL:
          </label>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.picture}
            id="picture"
            name="picture"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Save Changes</button>
        </form>
      )}
    </Formik>
  </div>
);

ProjectForm.defaultProps = {
  project: { pattern_name: "", body: "", picture: "" },
};

export default ProjectForm;
