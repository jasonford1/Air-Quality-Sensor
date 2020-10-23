# particle
Receive and save particle data

Particle sends a webhook. The server receives it and processes the data. The server then saves the data to a database for long term storage and future visualization.

---This version is pre-release and contains no functional code in pursuit of the above goal. This version is intended to be used as a test to confirm the production environment is configured correctly and working.

---Production is working correctly if you see 'HELLO PARTICLE!' when you load localhost:5000 (or whatever you set as your port in your process.env.PORT variable.)
