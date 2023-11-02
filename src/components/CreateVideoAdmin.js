import React, {useState, useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
 Container
} from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'; 
import { UserContext } from '../context';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const UrlInput = ({ field, form, ...props }) => {
    return (
      <input
        type="url"
        {...field}
        {...props}
        onChange={(e) => {
          field.onChange(e);
        }}
      />
    );
  };

const CreateVideoAdmin = ({isLoggedIn, logIn}) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubSuccess, setSubSuccess] = useState(false);
  const [state, setState] = useContext(UserContext);

  
  
  const initialValues = {
    title: '',
    image: '',
    description: EditorState.createEmpty(),
    url: '',
    free: '',
    categories: '',
  };

  const handleSubmit = async (values) => {
    const contentState = values.description.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', values.image);
    formData.append('description', content);
    formData.append('url', values.url);
    formData.append('free', values.free);
    console.log(formData);
    const url = `${process.env.REACT_APP_BASE_URL}/api/video_detail/`
    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };


    try {
      console.log(formData);
      let response = await axios.post(url, formData, {
        headers: headers,
      });
      console.log(response.data);
      console.log("navigate to success");
    } catch (error) {
      console.error('Error creating subscription:');
      console.log(error);
      console.log("navigate to cancel");
    }
    setSubmitted(true);
    // setSubmitted(true);
    // setSubscriptionFormSubmitted(true);
  };

 
  if (!isLoggedIn  ) {
    return <Navigate to='/log-in' />;
  }

  if (isSubmitted) {
    
  }



 
  

  return (
    <Container className="mt-2  sub_form">
            
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};
                
                return errors;
              }}
            >
              {({ isSubmitting, setFieldValue, handleChange }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Titulo video:
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      required
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="image" className="form-label">
                        Image:
                      </label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("image",file);
                          
                        }}
                        required
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <Field
                        
                        name="description"
                        render={({ field, form }) => (
                            <Editor
                              editorState={field.value}
                              onEditorStateChange={(editorState) =>
                                form.setFieldValue(field.name, editorState)
                              }
                              className="custom-editor" 
                              wrapperClassName="wrapper-class"
                              editorClassName="editor-class"
                              toolbarClassName="toolbar-class"
                            />
                          )}
                        required

                        />
                        
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  <div className="mb-3">
                    <label htmlFor="url" className="form-label">
                      Video url:
                    </label>
                    <Field
                        type="url"
                        name="url"
                        required
                        component={UrlInput} // Use the custom URL input component
                        className="form-control"
                    />
                    <ErrorMessage name="url" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="free" className="form-label">
                      <Field
                          type="checkbox"
                          name="free"
                          required
                      /> Gratis
                    </label>
                   
                    <ErrorMessage name="free" component="div" className="text-danger" />
                  </div>

                 

                  <div className="col-md-3 mb-3">
                    <label htmlFor="categories" className="form-label">
                      Categorias:
                    </label>
                    <Field
                        as="select"
                        name="categories"
                        className="form-control"
                        
                        required
                      >
                        <option key="hola" value="hola">
                            "hola"
                          </option>
                        {/* {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))} */}
                      </Field>
                      <ErrorMessage
                        name="categories"
                        component="div"
                        className="text-danger"
                      />
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Crea video
                  </button>
                </Form>
              )}
            </Formik>
    </Container>
  );
};

export default CreateVideoAdmin;
