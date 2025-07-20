import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ManageVideoLearning.css';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

export default function ManageVideoLearning() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editCourseId, setEditCourseId] = useState(null);

  const scrollRef = useRef(null);
  const courseScrollRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: '', description: '', youtubeLink: '',
    uicode: '', backendcode: '', thumbnail: null,
    videos: null, course_id: '', teacher_id: ''
  });

  const [courseForm, setCourseForm] = useState({
    title: '', description: '', price: '', offer: '', duration: '', thumbnail: null
  });

  useEffect(() => {
    fetchVideos(); 
    fetchCourses(); 
    fetchTeachers();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/managevideo`);
      setVideos(res.data.map(v => ({ ...v, showVideo: !!v.videos })));
    } catch (err) {
      console.error('❌ Fetch videos error:', err?.message);
      alert('Failed to load videos. Check network or CORS settings.');
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error('❌ Fetch courses error:', err?.message);
      alert('Failed to load courses. Check backend.');
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/teachers`);
      setTeachers(res.data);
    } catch (err) {
      console.error('❌ Fetch teachers error:', err?.message);
      alert('Failed to load teachers.');
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value.trimStart() }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v || ''));

    try {
      setLoading(true);
      const url = `${BASE_URL}/api/managevideo${editId ? `/${editId}` : ''}`;
      const method = editId ? 'put' : 'post';
      await axios[method](url, data);
      resetForm(); 
      fetchVideos();
    } catch (err) {
      console.error('❌ Submit error:', err?.message);
      alert('Upload failed. Check console for more.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = v => {
    setEditId(v.id);
    setForm({
      title: v.title, description: v.description, youtubeLink: v.youtubelink || '',
      uicode: v.uicode, backendcode: v.backendcode, thumbnail: null,
      videos: null, course_id: v.course_id, teacher_id: v.teacher_id
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/managevideo/${id}`);
      fetchVideos();
    } catch (err) {
      console.error('❌ Delete error:', err?.message);
    }
  };

  const resetForm = () => {
    setForm({
      title: '', description: '', youtubeLink: '',
      uicode: '', backendcode: '', thumbnail: null,
      videos: null, course_id: '', teacher_id: ''
    });
    setEditId(null);
  };

  const scroll = (dir, ref) => {
    ref.current?.scrollTo({
      left: ref.current.scrollLeft + (dir === 'left' ? -ref.current.offsetWidth : ref.current.offsetWidth),
      behavior: 'smooth'
    });
  };

  const handleCourseChange = e => {
    const { name, value, files } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: files ? files[0] : value.trimStart() }));
  };

  const handleCourseSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(courseForm).forEach(([k, v]) => data.append(k, v || ''));

    try {
      const url = `${BASE_URL}/api/courses/${editCourseId ? `update/${editCourseId}` : 'add'}`;
      const method = editCourseId ? 'put' : 'post';
      await axios[method](url, data);
      resetCourseForm(); 
      fetchCourses();
    } catch (err) {
      console.error('❌ Submit course error:', err?.message);
      alert('Course submit failed');
    }
  };

  const handleCourseEdit = course => {
    setEditCourseId(course.id);
    setCourseForm({
      title: course.title, description: course.description,
      price: course.price, offer: course.offer,
      duration: course.duration, thumbnail: null
    });
  };

  const resetCourseForm = () => {
    setCourseForm({ title: '', description: '', price: '', offer: '', duration: '', thumbnail: null });
    setEditCourseId(null);
  };

  const handleCourseDelete = async id => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/courses/delete/${id}`);
      fetchCourses();
    } catch (err) {
      console.error('❌ Delete course error:', err?.message);
    }
  };

  return (
    <div className="container-fluid px-3 px-md-5 py-4">
      <AdminNavbar />
      <br/><br/><br/>
      <h2 className="text-center mb-4">Manage Course Videos</h2>
      {/* --- Video Form --- */}
      <form ref={formRef} onSubmit={handleSubmit} className="form-wrapper styled-form mb-5" encType="multipart/form-data">
        <div className="form-grid">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="youtubeLink" placeholder="YouTube Link" value={form.youtubeLink} onChange={handleChange} />
          <select name="course_id" value={form.course_id} onChange={handleChange} required>
            <option value="">Choose Course</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <select name="teacher_id" value={form.teacher_id} onChange={handleChange} required>
            <option value="">Choose Teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} />
          <input type="file" name="videos" accept="video/*" onChange={handleChange} />
        </div>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <textarea name="uicode" placeholder="UI Code" value={form.uicode} onChange={handleChange} required />
        <textarea name="backendcode" placeholder="Backend Code" value={form.backendcode} onChange={handleChange} required />
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">
            {loading ? 'Uploading...' : (editId ? 'Update' : 'Add')} Video
          </button>
        </div>
      </form>

      {/* --- Video Scroll Section --- */}
      <div className="video-scroll-wrapper">
        <button className="scroll-button" onClick={() => scroll('left', scrollRef)}>&#10094;</button>
        <div className="video-scroll-container" ref={scrollRef}>
          {videos.map(v => (
            <div className="video-card" key={v.id}>
              {v.videos ? (
                <video width="100%" height="180" controls className="video-actual">
                  <source src={`${BASE_URL}/uploads/${v.videos}`} type="video/mp4" />
                </video>
              ) : (
                <img src={`${BASE_URL}/uploads/${v.thumbnail}`} alt={v.title} className="video-thumbnail" />
              )}
              <div className="video-card-body">
                <h5>{v.title}</h5>
                <p>{v.description.slice(0, 80)}...</p>
                {v.youtubelink && (
                  <a href={v.youtubelink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm my-1">
                    ▶ YouTube
                  </a>
                )}
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(v)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(v.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={() => scroll('right', scrollRef)}>&#10095;</button>
      </div>

      {/* --- Course Form --- */}
      <h2 className="text-center my-5">Manage Courses</h2>
      <form onSubmit={handleCourseSubmit} className="form-wrapper styled-form mb-4" encType="multipart/form-data">
        <div className="form-grid">
          <input name="title" placeholder="Course Title" value={courseForm.title} onChange={handleCourseChange} required />
          <input name="price" type="number" placeholder="Price" value={courseForm.price} onChange={handleCourseChange} required />
          <input name="offer" type="number" placeholder="Offer (%)" value={courseForm.offer} onChange={handleCourseChange} />
          <input name="duration" placeholder="Duration" value={courseForm.duration} onChange={handleCourseChange} />
          <input type="file" name="thumbnail" accept="image/*" onChange={handleCourseChange} />
        </div>
        <textarea name="description" placeholder="Description" value={courseForm.description} onChange={handleCourseChange} required />
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success">{editCourseId ? 'Update' : 'Add'} Course</button>
          {editCourseId && <button type="button" className="btn btn-secondary ml-2" onClick={resetCourseForm}>Cancel Edit</button>}
        </div>
      </form>

      {/* --- Course Scroll --- */}
      <div className="video-scroll-wrapper">
        <button className="scroll-button" onClick={() => scroll('left', courseScrollRef)}>&#10094;</button>
        <div className="video-scroll-container" ref={courseScrollRef}>
          {courses.map(c => (
            <div className="video-card" key={c.id}>
              {c.thumbnail && <img src={`${BASE_URL}/uploads/${c.thumbnail}`} alt={c.title} className="video-thumbnail" />}
              <div className="video-card-body">
                <h5>{c.title}</h5>
                <p>{c.description.slice(0, 80)}...</p>
                <p><strong>₹{c.price}</strong> | Offer: {c.offer}% | {c.duration}</p>
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleCourseEdit(c)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleCourseDelete(c.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={() => scroll('right', courseScrollRef)}>&#10095;</button>
      </div>
    </div>
  );
}
