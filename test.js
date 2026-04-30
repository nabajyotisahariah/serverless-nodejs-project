// Simple test for user controller CRUD operations
const controller = require('./src/controllers/user.controller');

// Mock request/response objects
const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.data = data;
    return res;
  };
  return res;
};

async function runTests() {
  try {
    // Test listUsers
    console.log('Testing listUsers:');
    const res1 = mockRes();
    await controller.listUsers(mockReq(), res1);
    console.log('Users:', res1.data);

    // Test createUser
    console.log('\nTesting createUser:');
    const res2 = mockRes();
    await controller.createUser(mockReq({ name: 'Alice' }), res2);
    console.log('Created user:', res2.data);

    // Test getUser
    console.log('\nTesting getUser:');
    const res3 = mockRes();
    await controller.getUser(mockReq({}, { id: '3' }), res3);
    console.log('Got user:', res3.data);

    // Test updateUser
    console.log('\nTesting updateUser:');
    const res4 = mockRes();
    await controller.updateUser(mockReq({ name: 'Alice Updated' }, { id: '3' }), res4);
    console.log('Updated user:', res4.data);

    // Test deleteUser
    console.log('\nTesting deleteUser:');
    const res5 = mockRes();
    await controller.deleteUser(mockReq({}, { id: '3' }), res5);
    console.log('Deleted user:', res5.data);

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests();