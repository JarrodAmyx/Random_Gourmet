import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulated user data (replace with actual data from backend)
  private users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];

  // Simulate authentication against user data
  authenticate(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    return !!user; // Returns true if user is found, otherwise false
  }
}