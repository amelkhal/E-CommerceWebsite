import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, clearSuccess, clearError } from '../redux/slices/userSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const { profile, loading, error, success } = useSelector((state) => state.user);
  const [localProfile, setLocalProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Fetch the user profile when the component mounts
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile.name && profile.email) {
      setLocalProfile((prevProfile) => ({
        ...prevProfile,
        name: profile.name,
        email: profile.email,
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearSuccess());

    if (localProfile.password !== localProfile.confirmPassword) {
      dispatch(clearError('Passwords do not match'));
      return;
    }

    dispatch(
      updateUserProfile({
        name: localProfile.name,
        email: localProfile.email,
        password: localProfile.password,
      })
    );
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Your Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={localProfile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={localProfile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={localProfile.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={localProfile.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
