import { Alert, Button, Modal, ModalBody, TextInput }from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import axios from 'axios' ; 
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
  } from '../redux/user/userSlice';
  
export default function DashProfile() {
  const [currentUser, setCurrentUser] = useState({
    _id: '661998f73d22be91a79bf761', // Manually set the desired _id
    
  });
    const [formData, setFormData] = useState({});
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updateUserError, setUpdateUserError] = useState(null);
    const dispatch = useDispatch();
   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
      
        if (Object.keys(formData).length === 0) {
          setUpdateUserError('No changes made');
          return;
        }
      
        try {
          dispatch(updateStart());
          const response = await axios.put(`http://usr-back:3001/api/user/update/${currentUser._id}`, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = response.data;
      
          if (response.status === 200) {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User's profile updated successfully");
          } else {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
          }
        } catch (error) {
          dispatch(updateFailure(error.message));
          setUpdateUserError(error.message);
        }
      };
      const handleDeleteUser = async () => {
        try {
          const response = await axios.delete(`http://usr-back:3001/api/user/delete/${currentUser._id}`);
          const data = response.data;
      
          if (response.status === 200) {
            // Dispatch success action if deletion was successful
            dispatch(deleteUserSuccess(data));
          } else {
            // Dispatch failure action if deletion failed
            dispatch(deleteUserFailure(data.message || 'Failed to delete user'));
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          // Dispatch failure action if request failed
          dispatch(deleteUserFailure('Failed to delete user. Please try again.'));
        }
      };
      const handleSignout = async () => {
        try {
          const response = await axios.post('http://usr-back:3001/api/user/signout');
      
          if (response.status === 200) {
            dispatch(signoutSuccess());
          } else {
            console.log(response.data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form  className='flex flex-col gap-4'onSubmit={handleSubmit}>
           
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          onChange={handleChange}
          
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          
        > Update 
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span  className='cursor-pointer' onClick={handleSignout}> 
          Sign Out
        </span>
      </div>
      
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
    <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
