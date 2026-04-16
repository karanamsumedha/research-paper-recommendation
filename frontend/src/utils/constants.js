export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const USER_ROLES = {
    RESEARCHER: 'RESEARCHER',
    CONTENT_CURATOR: 'CONTENT_CURATOR',
    ADMIN: 'ADMIN',
};

export const CITATION_FORMATS = {
    APA: 'APA',
    IEEE: 'IEEE',
    CHICAGO: 'Chicago',
    MLA: 'MLA',
};

export const DOMAINS = [
    'Computer Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Software Engineering',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'Blockchain',
    'IoT',
    'Robotics',
    'Other',
];

export const MESSAGES = {
    SUCCESS: 'Operation completed successfully',
    ERROR: 'An error occurred. Please try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NOT_FOUND: 'Resource not found',
    LOADING: 'Loading...',
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};