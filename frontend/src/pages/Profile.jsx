import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSave } from 'react-icons/fa';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { DOMAINS } from '../utils/constants';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(authService.getCurrentUser());
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        researchDomain: '',
        bio: '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const userProfile = await authService.getProfile(user.userId);
                setProfileData({
                    firstName: userProfile.firstName || '',
                    lastName: userProfile.lastName || '',
                    email: userProfile.email || '',
                    researchDomain: userProfile.researchDomain || '',
                    bio: userProfile.bio || '',
                });
            } catch (err) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            await authService.updateProfile(user.userId, profileData);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setSaving(true);

        try {
            await authService.changePassword(
                user.userId,
                passwordData.oldPassword,
                passwordData.newPassword
            );
            setSuccess('Password changed successfully!');
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to change password');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="profile-page">
            <Container className="py-5">
                <h1 className="page-title mb-5">
                    <FaUser /> My Profile
                </h1>

                {error && <ErrorAlert message={error} onClose={() => setError('')} />}
                {success && <Alert variant="success">{success}</Alert>}

                <Row>
                    <Col lg={8}>
                        <Tabs defaultActiveKey="general" className="profile-tabs mb-4">
                            {/* General Tab */}
                            <Tab eventKey="general" title="General Information">
                                <Card className="profile-card">
                                    <Card.Body className="p-4">
                                        <Form onSubmit={handleUpdateProfile}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="firstName"
                                                            value={profileData.firstName}
                                                            onChange={handleProfileChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="lastName"
                                                            value={profileData.lastName}
                                                            onChange={handleProfileChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={profileData.email}
                                                    disabled
                                                />
                                                <small className="text-muted">
                                                    Email cannot be changed
                                                </small>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Research Domain</Form.Label>
                                                <Form.Select
                                                    name="researchDomain"
                                                    value={profileData.researchDomain}
                                                    onChange={handleProfileChange}
                                                >
                                                    <option value="">Select a domain</option>
                                                    {DOMAINS.map((domain) => (
                                                        <option key={domain} value={domain}>
                                                            {domain}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-4">
                                                <Form.Label>Bio</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="4"
                                                    name="bio"
                                                    value={profileData.bio}
                                                    onChange={handleProfileChange}
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </Form.Group>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={saving}
                                                className="profile-button"
                                            >
                                                <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab>

                            {/* Security Tab */}
                            <Tab eventKey="security" title="Security">
                                <Card className="profile-card">
                                    <Card.Body className="p-4">
                                        <h5 className="mb-4">Change Password</h5>
                                        <Form onSubmit={handleChangePassword}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Current Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="oldPassword"
                                                    value={passwordData.oldPassword}
                                                    onChange={handlePasswordChange}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="newPassword"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    required
                                                />
                                                <small className="text-muted">
                                                    Minimum 6 characters
                                                </small>
                                            </Form.Group>

                                            <Form.Group className="mb-4">
                                                <Form.Label>Confirm New Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    required
                                                />
                                            </Form.Group>

                                            <Button
                                                variant="warning"
                                                type="submit"
                                                disabled={saving}
                                                className="profile-button"
                                            >
                                                <FaLock /> {saving ? 'Changing...' : 'Change Password'}
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab>

                            {/* Account Tab */}
                            <Tab eventKey="account" title="Account">
                                <Card className="profile-card">
                                    <Card.Body className="p-4">
                                        <div className="account-info mb-4">
                                            <h5>Account Information</h5>
                                            <div className="info-item mb-3">
                                                <label>Username</label>
                                                <p>{user?.sub}</p>
                                            </div>
                                            <div className="info-item mb-3">
                                                <label>Role</label>
                                                <p>{user?.role || 'Researcher'}</p>
                                            </div>
                                            <div className="info-item">
                                                <label>Member Since</label>
                                                <p>
                                                    {new Date(profileData.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="danger-zone mt-4">
                                            <h5 className="text-danger">Danger Zone</h5>
                                            <p className="text-muted">
                                                Be careful with the following actions
                                            </p>
                                            <Button variant="outline-danger">
                                                Delete Account
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Tab>
                        </Tabs>
                    </Col>

                    {/* Sidebar */}
                    <Col lg={4}>
                        <Card className="profile-card">
                            <Card.Body className="text-center p-4">
                                <div className="profile-avatar mb-3">
                                    <FaUser className="avatar-icon" />
                                </div>
                                <h5>{profileData.firstName} {profileData.lastName}</h5>
                                <p className="text-muted">@{user?.sub}</p>
                                <p className="text-muted small">{profileData.email}</p>
                                {profileData.researchDomain && (
                                    <p className="domain-badge">
                                        {profileData.researchDomain}
                                    </p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;