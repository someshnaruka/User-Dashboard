User Profile Management Dashboard using MERN Stack
A dynamic web application designed to facilitate efficient management of user profiles, including profile information, skills, experiences, education, and certifications. The project is built using the MERN stack (MongoDB, Express.js, React, and Node.js), incorporating various modern technologies to enhance user experience and functionality.
test-user email- vishnu@oruphones.com
test-user password-123
On start Application checks for user token in localstorage, if found then directly loads the profile dashboard else redirects to login page.
On login  with test user credentials or Registering a new user by clicking Sign up on login page the Profile dashboard loads up.
All the input fields have a required property set on them hence are compulsory to be filled.
On the dashboard section a user can Edit Delete or Add new skills,certification,experience and education sections.
Profile section such as profile image,Name ,Phone no and About section can also be updated.
On clicking Connection button user is directed to connection page where he can add or remove connections by button click.
On button click connection cards are reaaranged accordingly after updating the array data in monogodb.
Frontend is deployed on vercel with .env variables.
Backend is deployed on Render.
