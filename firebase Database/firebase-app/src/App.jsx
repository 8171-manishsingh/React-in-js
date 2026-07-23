import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAge, setEditAge] = useState('');
  const [loading, setLoading] = useState(false);

  // Reference to the users collection
  const usersCollectionRef = collection(db, 'users');

  // CREATE - Add a new user
  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await addDoc(usersCollectionRef, {
        name: name,
        email: email,
        age: Number(age),
      });
      setName('');
      setEmail('');
      setAge('');
      getUsers();
    } catch (error) {
      console.error('Error adding user: ', error);
      alert('Error adding user. Check console for details.');
    }
    setLoading(false);
  };

  // READ - Get all users
  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
    setLoading(false);
  };

  // UPDATE - Update a user
  const updateUser = async (id) => {
    if (!editName || !editEmail || !editAge) {
      alert('Please fill all edit fields');
      return;
    }
    setLoading(true);
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, {
        name: editName,
        email: editEmail,
        age: Number(editAge),
      });
      setEditingId(null);
      setEditName('');
      setEditEmail('');
      setEditAge('');
      getUsers();
    } catch (error) {
      console.error('Error updating user: ', error);
      alert('Error updating user. Check console for details.');
    }
    setLoading(false);
  };

  // DELETE - Delete a user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const userDoc = doc(db, 'users', id);
      await deleteDoc(userDoc);
      getUsers();
    } catch (error) {
      console.error('Error deleting user: ', error);
      alert('Error deleting user. Check console for details.');
    }
    setLoading(false);
  };

  // Load users on component mount
  useEffect(() => {
    getUsers();
  }, []);

  // Set edit form values when editing
  const startEditing = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditAge(user.age);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🔥 Firebase Database App</h1>
      <p className="app-subtitle">React + Firestore CRUD Operations</p>

      {/* Add User Form */}
      <div className="card">
        <h2>Add New User</h2>
        <form onSubmit={addUser} className="user-form">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="card">
        <h2>Users List</h2>
        {loading && <p className="loading-text">Loading...</p>}
        {users.length === 0 && !loading && (
          <p className="empty-text">No users found. Add one above!</p>
        )}
        <div className="users-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              {editingId === user.id ? (
                /* Edit Mode */
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input-field small"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="input-field small"
                    placeholder="Email"
                  />
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="input-field small"
                    placeholder="Age"
                  />
                  <div className="btn-group">
                    <button
                      onClick={() => updateUser(user.id)}
                      className="btn btn-success small-btn"
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-secondary small-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Display Mode */
                <div className="user-info">
                  <div className="user-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                  </div>
                  <div className="btn-group">
                    <button
                      onClick={() => startEditing(user)}
                      className="btn btn-warning small-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-danger small-btn"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

