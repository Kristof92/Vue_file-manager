// Create User
export async function createUser(data) {
    const response = await fetch(`/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json()
}

// Login User
export async function logInUser(data) {
    const response = await fetch(`/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json()
}

// Get port used
export async function getActualDomain() {
    const response = await fetch('/domain', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    return await response.json()
}

// Get logged in profile (refresh)
export async function getUser(data) {
    const response = await fetch(`/users/me`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json()
}

// Upload File
export async function uploadPic(data) {
    const formData = new FormData()
    formData.append('picture', data.picture)
    formData.append('userId', data.userId)
    const response = await fetch(`/file/upload`, {
        method: 'POST',
        body: formData
    })
    return await response.json()
}

// Delete File
export async function deletePic(data) {
    const response = await fetch(`/file/delete`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json()
}

