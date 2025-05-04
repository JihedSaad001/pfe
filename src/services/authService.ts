// This is a mock authentication service for frontend preview
// In a real application, this would make actual API requests to your backend

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  role: "guest" | "staff" | "admin"
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  address?: string
}

interface AuthResponse {
  user: User
  token: string
  message: string
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    role: "guest",
  },
  {
    id: "2",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Admin Ave, Admintown, USA",
    role: "admin",
  },
]

// Mock token for simulation
const MOCK_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6Imd1ZXN0IiwiaWF0IjoxNjE2MTYyMjIwLCJleHAiOjE2MTYyNDg2MjB9.3M_-s6_QxNqUhNgDfnLTI-hC3bWzAqVDLWxV4PDtXM4"

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find user by email
  const user = mockUsers.find((u) => u.email === credentials.email)

  // Simulate authentication
  if (!user || credentials.password !== "password123") {
    throw new Error("Invalid email or password")
  }

  // Store in localStorage for persistence
  localStorage.setItem("token", MOCK_TOKEN)
  localStorage.setItem("user", JSON.stringify(user))

  return {
    user,
    token: MOCK_TOKEN,
    message: "Login successful",
  }
}

export async function register(userData: RegisterData): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if email already exists
  if (mockUsers.some((u) => u.email === userData.email)) {
    throw new Error("User with this email already exists")
  }

  // Create new user
  const newUser: User = {
    id: String(mockUsers.length + 1),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    role: "guest",
  }

  // Store in localStorage for persistence
  localStorage.setItem("token", MOCK_TOKEN)
  localStorage.setItem("user", JSON.stringify(newUser))

  return {
    user: newUser,
    token: MOCK_TOKEN,
    message: "Registration successful",
  }
}

export function logout(): void {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "/"
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token")
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === "admin"
}
