import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Modal, Button, Form } from 'react-bootstrap'
import { UserContext } from '../context'
import { getUser, getAccessToken } from '../services/AuthService'
import { showErrorNotification } from '../services/notificationService'
import './SubscriptionPlansAdmin.css'
import { Formik } from 'formik'
import { JsonEditor } from 'json-edit-react'

const SubscriptionPlansAdmin = ({ isLoggedIn }) => {
  const [plans, setPlans] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [fetchPlansBool, setFetchPlanBool] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, setState } = useContext(UserContext)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    currentPlan?.image || ''
  )

  useEffect(() => {
    setLoading(true)
    fetchPlans()
  }, [fetchPlansBool])

  useEffect(() => {
    // Update the image preview when the current plan changes
    if (currentPlan?.image) {
      setImagePreviewUrl(currentPlan.image)
      setImageFile(null) // Reset file input when switching plans
    }
  }, [currentPlan])

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result)
        setFieldValue('image', file) // Update Formik's state
      }
      reader.readAsDataURL(file)
    }
  }

  const openModal = (plan = null) => {
    setCurrentPlan(plan) // If plan is null, it's a new plan
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setCurrentPlan(null) // Ensure currentPlan is reset
    setImageFile(null) // Reset image file
    setImagePreviewUrl('') // Reset image preview
  }

  const fetchPlans = async () => {
    try {
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/subscription_plan/`,
        { headers, timeout: 5000 }
      )
      setPlans(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData()
    Object.keys(values).forEach((key) => {
      if (key === 'features' || key === 'metadata') {
        formData.append(key, JSON.stringify(values[key]))
      } else if (key === 'image' && values[key]) {
        formData.append('image', values[key]) // Append file to FormData
      } else {
        formData.append(key, values[key].toString())
      }
    })
    console.log(formData)

    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/subscription_plan/${currentPlan ? `${currentPlan.id}/` : ''}`
      const method = currentPlan ? 'put' : 'post'
      console.log(formData)
      await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      toast.success('Plan updated successfully')
      closeModal()
      resetForm()
      setFetchPlanBool(!fetchPlansBool)
    } catch (error) {
      showErrorNotification(error)
    } finally {
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string()
      .required('Description is required')
      .max(
        127,
        'The plan description. Maximum length is 127 single-byte alphanumeric characters.'
      ),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be non-negative'),
    frequency_type: Yup.string()
      .oneOf(['month', 'year'], 'Invalid frequency type')
      .required('Frequency type is required'),
    features: Yup.array()
      .of(
        Yup.object()
          .shape({
            name: Yup.string().required('Name is required'),
          })
          .test(
            'only-name-key',
            'Object must only contain the name key',
            (value) =>
              Object.keys(value).length === 1 &&
              Object.prototype.hasOwnProperty.call(value, 'name')
          )
      )
      .required('Features are required')
      .min(1, 'At least one feature is required'),
    metadata: Yup.object()
      .test(
        'is-valid-json-object',
        'Metadata must be a valid JSON object',
        (value) => {
          try {
            // Stringify and parse to ensure it is a valid JSON object
            JSON.parse(JSON.stringify(value))
            return true
          } catch (e) {
            return false
          }
        }
      )
      .required('Metadata is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test(
        'fileSize',
        'File too large',
        (value) => !value || (value && value.size <= 1024 * 1024 * 5) // 5 MB limit
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) =>
          !value ||
          (value &&
            ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
      ),
  })

  const deletePlan = async (planId) => {
    if (window.confirm('Estas seguro que quiere eliminar este plan ? ')) {
      try {
        const token = getAccessToken()
        const headers = { Authorization: `Bearer ${token}` }
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/subscription_plan/${planId}/`,
          { headers, timeout: 5000 }
        )
        // Re-fetch plans to update the list
        setFetchPlanBool(!fetchPlansBool)
        toast.success('Se elimino el plan correctamente')
      } catch (error) {
        showErrorNotification(error)
      }
    }
  }

  if (!isLoggedIn || (user && !user.is_staff)) {
    return <Navigate to='/log-in' />
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className='plan_container_subscriptions'>
      <Button onClick={() => openModal()}>Add New Plan</Button>
      <div className='saved_subs'>
        {plans.map((plan) => (
          <div key={plan.id} className='plan-card'>
            <h4>{plan.name}</h4>
            <p> Precio: ${plan.price}</p>
            <p>{plan.frequency_type === 'month' ? 'Mensual' : 'Anual'}</p>
            <img src={plan.image}></img>
            <div>
              <h5>Descripción: </h5>
              <p>
                {plan.description.length > 45
                  ? `${plan.description.substring(0, 45)}...`
                  : plan.description}
              </p>
            </div>
            <Button onClick={() => openModal(plan)}>Edit</Button>
            <Button
              onClick={() => deletePlan(plan.id)}
              className='subs_delete_button'
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={closeModal} centered scrollable={true}>
        <Formik
          key={currentPlan ? `edit-${currentPlan.id}` : 'create-new'}
          initialValues={{
            name: currentPlan?.name || '',
            description: currentPlan?.description || '',
            price: currentPlan?.price || '',
            frequency_type: currentPlan?.frequency_type || '',
            features: currentPlan?.features || [
              { name: 'Contenido de yoga actualizado' },
              { name: 'Videos ilimitados' },
              {
                name: 'Acceso a 1 clase  presencial al mes *Si radicas en Guadalajara, Jalisco, México',
              },
              { name: 'Cancela cuando quieras' },
            ],
            metadata: currentPlan?.metadata || {
              buttonText: 'Subscribete al plan',
            },
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt='Preview'
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
                <Form.Control
                  type='file'
                  name='image'
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  onBlur={handleBlur} // Ensure Formik tracks the blur event
                  isInvalid={touched.image && !!errors.image} // Add this line
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  name='price'
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Frequency Type</Form.Label>
                <Form.Control
                  as='select'
                  name='frequency_type'
                  value={values.frequency_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.frequency_type && !!errors.frequency_type}
                >
                  <option value=''>Select Frequency</option>
                  <option value='month'>Month</option>
                  <option value='year'>Year</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  {errors.frequency_type}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Features (JSON)</Form.Label>

                <JsonEditor
                  name='features'
                  data={values.features}
                  rootName={'features'}
                  onUpdate={(newJson) => {
                    console.log('Updated Features Data:', newJson.newData)
                    setFieldValue('features', newJson.newData)
                  }}
                />
                {touched.features && errors.features && (
                  <div className='invalid-feedback d-block'>
                    {errors.features}
                  </div>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Metadata (JSON)</Form.Label>
                <JsonEditor
                  name='metadata'
                  data={values.metadata}
                  rootName={'metadata'}
                  onUpdate={(newJson) => {
                    console.log('Updated Metadata Data:', newJson.newData)
                    setFieldValue('metadata', newJson.newData)
                  }}
                />
                {touched.metadata && errors.metadata && (
                  <div className='invalid-feedback d-block'>
                    {errors.metadata}
                  </div>
                )}
              </Form.Group>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='button-save'
              >
                Save Plan
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default SubscriptionPlansAdmin
