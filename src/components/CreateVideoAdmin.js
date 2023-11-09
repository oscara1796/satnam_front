import React, {useState, useContext, useEffect} from 'react';
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


import CreateCategory from './CreateCategory';

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


  const CategoryList = ({setShowModal, getCategories, setGetCategories, field, form, ...props}) => {
    const [categories, setCategories] = useState([]);
    
   
    
    useEffect( () => {
      async function getCategories() {
        // Define the URL of your Django API endpoint
        const url = `${process.env.REACT_APP_BASE_URL}/api/category_list/`
        const token = getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
  
        // Fetch categories from the API
          try {
            let response = await axios.get(url, {
              headers: headers,
            });
            setCategories(response.data)
            console.log(response.data);
          } catch (error) {
            console.error('Error obtaining categories:');
            console.log(error);
          }
          setGetCategories(false)
      }
  
      getCategories();
    }, [getCategories]);


    const openModal = () => {
      setShowModal(true);
    };
  
  
    return (
          <div className="col-md-6 mb-3 d-flex justify-content-start  align-items-center">
            <label htmlFor="categories" className="form-label me-3">
              Categorias:
            </label>
            <Field
                as="select"
                name="categories"
                className="form-control me-3"
               
                
                required
              >
                
                {categories.map((category) => (
                  <option key={category.id} value={category.title}>
                      {category.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="categories"
                component="div"
                className="text-danger"
              />

              <button type="button"  className="btn btn-primary mt-2" onClick={openModal}>
                Añade categoria
              </button>

              
          </div>
    );
  };

const CreateVideoAdmin = ({isLoggedIn, logIn}) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [state, setState] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [getCategories, setGetCategories] = useState(false);

  
  
  const initialValues = {
    title: '',
    image: '',
    description: EditorState.createEmpty(),
    url: '',
    free: '',
    categories: '',
  };

  const handleSubmit = async (values) => {
    console.log("values ",values);
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
      setSubmitted(true);
    } catch (error) {
      console.error('Error creating subscription:');
      console.log(error);
      console.log("navigate to cancel");
    }
    
    // setSubmitted(true);
    // setSubscriptionFormSubmitted(true);
  };

 
  if (!isLoggedIn ) {
    return <Navigate to='/log-in' />;
  }

  if (isSubmitted) {
    console.log("navigate to videos ");
    return <Navigate to='/videos' />;
  }

  const closeModal = () => {
    setShowModal(false);
  };



 
  

  return (
    <Container className="mt-2  sub_form create_video_form">
            
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

                  <div className="mb-3 create-video-checkbox">
                    <label htmlFor="free" className="form-label">
                      <Field
                          type="checkbox"
                          name="free"
                          required
                      /> Gratis
                    </label>
                   
                    <ErrorMessage name="free" component="div" className="text-danger" />
                  </div>

                 <CategoryList  
                    setShowModal={setShowModal} 
                    getCategories={getCategories} 
                    setGetCategories={setGetCategories}
                 />

                  
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Crea video
                  </button>
                </Form>
              )}
            </Formik>

            {showModal && (
                <CreateCategory onClose={closeModal} setGetCategories={setGetCategories} />
            )}
    </Container>
  );
};




export default CreateVideoAdmin;
