const bcrypt = require('bcryptjs');
const storedHash = '$2a$10$iZ9WGpuxQsjJJo7RY.XOeOgMlnPMDU3K/1lSn737d7SUbd.yt05AG';  // Replace with the actual hash from the new user in MongoDB
const enteredPassword = 'Prince@2023';  // Password used during registration

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
  console.log('Password match result:', result);  // Should log 'true' if it works
});
