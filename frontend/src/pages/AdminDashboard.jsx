import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Alert, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    FaChartBar,
    FaUsers,
    FaBook,
    FaTrash,
    FaCrown,
    FaDownload,
} from 'react-icons/fa';
import adminService from '../services/adminService';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(authService.getCurrentUser());
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const statsData = await adminService.getSystemStatistics();
                const usersData = await adminService.getAllUsers();
                setStats(statsData);
                setUsers(usersData);
            } catch (err) {
                setError(err.message || 'Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, navigate]);

    const handlePromoteUser = async (userId) => {
        try {
            await adminService.promoteUserToCurator(userId);
            setError('');
            // Refresh users list
            const usersData = await adminService.getAllUsers();
            setUsers(usersData);
        } catch (err) {
            setError(err.message || 'Failed to promote user');
        }
    };

    const handleDemoteUser = async (userId) => {
        try {
            await adminService.demoteUser(userId);
            setError('');
            const usersData = await adminService.getAllUsers();
            setUsers(usersData);
        } catch (err) {
            setError(err.message || 'Failed to demote user');
        }
    };

    const handleDeleteUser = async () => {
        try {
            await adminService.deleteUser(selectedUser.userId);
            setShowDeleteModal(false);
            setSelectedUser(null);
            setError('');
            const usersData = await adminService.getAllUsers();
            setUsers(usersData);
        } catch (err) {
            setError(err.message || 'Failed to delete user');
        }
    };

    const handleGenerateReport = async () => {
        try {
            const reportData = await adminService.generateActivityReport();
            const dataStr = JSON.stringify(reportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `report-${new Date().toISOString().slice(0, 10)}.json`;
            link.click();
        } catch (err) {
            setError(err.message || 'Failed to generate report');
        }
    };

    if (loading) return <LoadingSpinner message="Loading admin dashboard..." />;

    return (
        <div className="admin-dashboard-page">
            <Container fluid className="py-5">
                <h1 className="page-title mb-5">
                    <FaChartBar /> Admin Dashboard
                </h1>

                <ErrorAlert message={error} onClose={() => setError('')} />

                {/* Statistics Cards */}
                <Row className="mb-5">
                    <Col md={6} lg={3} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body className="text-center p-4">
                                <FaUsers className="stat-icon text-primary" />
                                <h3 className="stat-value mt-3">{stats.totalUsers || 0}</h3>
                                <p className="stat-label">Total Users</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body className="text-center p-4">
                                <FaBook className="stat-icon text-info" />
                                <h3 className="stat-value mt-3">{stats.totalPapers || 0}</h3>
                                <p className="stat-label">Total Papers</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body className="text-center p-4">
                                <Badge bg="success" className="stat-badge">
                                    {stats.researchers || 0}
                                </Badge>
                                <p className="stat-label mt-3">Researchers</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body className="text-center p-4">
                                <Badge bg="warning" className="stat-badge">
                                    {stats.curators || 0}
                                </Badge>
                                <p className="stat-label mt-3">Curators</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Actions */}
                <Row className="mb-5">
                    <Col>
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={handleGenerateReport}
                        >
                            <FaDownload /> Generate Report
                        </Button>
                    </Col>
                </Row>

                {/* Users Table */}
                <Card className="admin-card">
                    <Card.Header className="bg-light p-3">
                        <h5 className="mb-0">Manage Users</h5>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Domain</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.userId}>
                                            <td>
                                                <strong>{u.username}</strong>
                                            </td>
                                            <td>{u.email}</td>
                                            <td>
                                                <Badge
                                                    bg={
                                                        u.userRole === 'ADMIN'
                                                            ? 'danger'
                                                            : u.userRole === 'CONTENT_CURATOR'
                                                            ? 'warning'
                                                            : 'info'
                                                    }
                                                >
                                                    {u.userRole}
                                                </Badge>
                                            </td>
                                            <td>{u.researchDomain || '-'}</td>
                                            <td>
                                                {u.userRole !== 'ADMIN' && (
                                                    <>
                                                        {u.userRole === 'RESEARCHER' ? (
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() =>
                                                                    handlePromoteUser(u.userId)
                                                                }
                                                            >
                                                                <FaCrown /> Promote
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() =>
                                                                    handleDemoteUser(u.userId)
                                                                }
                                                            >
                                                                Demote
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedUser(u);
                                                                setShowDeleteModal(true);
                                                            }}
                                                        >
                                                            <FaTrash /> Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete user <strong>{selectedUser?.username}</strong>?
                        This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteUser}>
                            Delete User
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default AdminDashboard;