import admin, { auth } from "firebase-admin";

const serviceAccount = {
  "type": "service_account",
  "project_id": "final-nextjs",
  "private_key_id": "0cb2559177793825597025892610871492303bae",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNbIoJkA8kwa24\n8nNpaprOO6ehIPGX7i7hBM9sgbVKMn6V5JW+6om5FW47mqVdNNXuZoW/r/0hpLO4\n1iKBbl+nCz7ZN0PIXuEFILIzJua+iKcyDnaePLI/2GXEBH7Kc0vxE3z74glm3we1\nV7CzH3cOqDVbNi/KSJob6UxPdBKwFJxJGqF3x4J4vOCQ4LJYxD9rZItOmht8yJ5I\nYrWnnLQcKvQpbXwqpy11qmlQ5GS2djxjSUKFoqL0xDI1s5bdYco9Uxui4YUI8DHz\nH48R7wtgN3nKlqx0GinlL7NWWC7BST/hQCIx3/6PLEuVDD5OVQLckFhMNIcaBX+E\nPvoK7fpLAgMBAAECggEAQhVPNSO3J85Gnm7QRhh1yNtwO2b47Szzg9rrD8FWVJre\nsqzy2hifDTi53ykmjzSSqIkIg2c5aaCcCEkrK37HPHeRQQ/FYRoQnIRIMIXDeZHC\nSq4eeFdVVWcJOnx9QJ16hWY9VzeqfALIh9C3dSPFTriD4iCiWSvusw8jRNcwqkzt\nTLFFLCLOqtosqqxt7+5zAYO/U7Kh0m55Sr6lfLK5Kweej2QE6Ss+KfZcICg1er4p\nQm9NWExBmWeFYi+Ody8Dd/m+v6QuRW25+XMOoc8AFM+5ubp6VKqxRHVfQz5gi/ne\ncZ7rRzn1krIK5Tk5PW6tcwe3HofUxF5CkZVzkH4a7QKBgQDDlEE8c3fETqyo4QeS\npthd0T6ORGZBnkDi8z5AsgCRTFdSG28Nk3jCqJM4j33ZqQY2vDadJpMUVgxwhXde\nFsxQ2AP2R+gFnbkNYB36C5wguqwUCy+h0F93AuqxyQfOhExkLbjw5Iq/BRm9Xeao\noiEoSI018eagmWTJZHmHaEgzRwKBgQC5HVKX1eloBYQ7V2C1BgldtpCQ82Xdx/Cq\n+afRTP/UVYLKc8rK0gPNJ3p+SmHaMGEnju8aU0xINK8H7Iq2gZRtkBVaq2x57xrP\nD/+hJbExXK4Do85IM9xsAo2aZMbyKy/KKbaGg65QH5yycZRSAB3pL1C9Pc18d7ui\nTxpmorea3QKBgDFlODS0VQNXe3QLoYYAbZUES/BShiD8fxbSqF5elpYb2dH668lZ\n/Z3sRYJ7eyWF8vPQBVsbavov4WRp0QQKbf/dDuMcthT1CM+//tIwLHZ3rw5A5P7R\nScsdCXltdHNMJp8GjTcKAaDNAPs6xA7DI+ywpjmBpuXY2AOlRKxWQiXxAoGBAIKG\n1Y0wjWMGuMWrCAq81e/ZYjiDF6n5aI72eMmRdLbBEPc2DKFU0s9e7fWM91CFWowt\nMhWq9JfZZi29MdYcqo9S0GvdgiC8Y3frvQFg9X9r7Vutri+lOeCDMFvUgZ+SqiDv\npr9UrJ3cnH4Krl3frTeWYGT/5hvExW5ePqxuQe6VAoGATXRyRYRDR6OsuLmQ/TCK\nmYE0nHqcTZ67TmLsgTeSJVdwaZSXWuH1UKEoEQZzyCWptbFOvOukWhuVQ7shKiHW\n0qASqWGc1zDi+Fn92ebUd8TJJ5L5Skordq9GFxl+ahZQcwW2A0jGV1KMUaui3ae+\nkQwqShZ+QGIUZdb5baMqpg4=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-9m14s@final-nextjs.iam.gserviceaccount.com",
  "client_id": "117090705171608081821",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9m14s%40final-nextjs.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const validateRequest = async (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
