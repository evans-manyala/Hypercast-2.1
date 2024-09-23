const bcrypt = require('bcryptjs');

const testPassword = async () => {
  const enteredPassword = 'NiHome';  // Your input password
  const storedHashedPassword = '$2a$10$j3fxVW89l54WsqxQF4T.a.wIyy7y1dSRTjR3TqyP/7ES8kIzpb9eG';  // Hashed password from DB

  const match = await bcrypt.compare(enteredPassword, storedHashedPassword);
  console.log('Password match result:', match);  // Log comparison result
};

testPassword();
