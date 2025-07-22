
import '@testing-library/jest-dom';


// Automatically clean up after each test
import { cleanup } from '@testing-library/react';
afterEach(cleanup);

// Optional: Mock fetch if your components use it
// Uncomment the following if your app uses fetch
// import 'whatwg-fetch'; // OR use jest-fetch-mock

// Optional: Add global mocks if needed
// global.fetch = jest.fn();

// Optional: Setup fake timers if needed for animations, debounce etc.
// jest.useFakeTimers();
