import React, { useState } from 'react'

// simplified component for resetting password (for testing without router)
function ResetPasswordForm() {
    const [token, setToken] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!token) {
            setMessage('please enter a token')
            return
        }

        if (newPassword !== confirmPassword) {
            setMessage('passwords do not match')
            return
        }

        if (newPassword.length < 6) {
            setMessage('password must be at least 6 characters')
            return
        }

        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('http://localhost:4000/api/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword })
            })

            const data = await response.json()
            setMessage(data.message)
            
            if (response.ok) {
                setNewPassword('')
                setConfirmPassword('')
                setToken('')
            }

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMessage('something went wrong please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <p>enter the token from backend console and new password</p>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>reset token (from console)</label>
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="paste token from backend console"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>new password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength="6"
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>confirm new password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength="6"
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: loading ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'resetting...' : 'reset password'}
                </button>
            </form>

            {message && (
                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
                    border: message.includes('successful') ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
                    borderRadius: '4px',
                    color: message.includes('successful') ? '#155724' : '#721c24'
                }}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default ResetPasswordForm