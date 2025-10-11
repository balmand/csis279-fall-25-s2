# forget password feature

this is how the forget password thing works

## what it does

users can reset their password if they forget it by getting an email with a
reset link

## how to use it

### backend api endpoints

put these in your app after importing the password routes

```javascript
app.use('/api/password', passwordRoutes);
```

### the endpoints

**POST /api/password/forget**

- send when user clicks forget password
- needs: `{ email: "user@example.com" }`
- returns: success message

**POST /api/password/reset**

- send when user submits new password
- needs: `{ token: "token_from_email", newPassword: "newpass123" }`
- returns: success or error

**GET /api/password/check/:token**

- check if reset token is valid
- put token in url like `/api/password/check/abc123`
- returns: `{ valid: true, email: "user@example.com" }`

### frontend components

**ForgetPasswordForm**

- shows email input form
- user enters email and clicks send
- shows confirmation message

**ResetPasswordForm**

- shows password reset form
- gets token from url parameters
- validates token and lets user set new password

### database stuff

you need to add password column to customers table:

```sql
ALTER TABLE customers ADD COLUMN password VARCHAR(255);
```

### email setup

add these to your .env file:

```
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

for gmail you need an app password not your regular password

## how it works

1. user clicks forget password
2. enters email address
3. backend checks if email exists
4. sends reset email with token
5. user clicks link in email
6. frontend shows password reset form
7. user enters new password
8. backend validates token and updates password
9. user can login with new password

## security notes

- tokens expire in 15 minutes
- tokens are stored in memory so they disappear when server restarts
- same success message whether email exists or not
- passwords are hashed with bcrypt
- tokens can only be used once

## testing

1. start your backend server
2. make sure database has password column
3. use postman or frontend to test endpoints
4. check email gets sent
5. click link and reset password
