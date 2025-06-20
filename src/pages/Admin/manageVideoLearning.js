import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ManageVideoLearning.css';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

export default function ManageVideoLearning() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    youtubeLink: '',
    uicode: '',
    backendcode: '',
    thumbnail: null,
    videos: null,
    course_id: '',
    teacher_id: ''
  });

  const [editId, setEditId] = useState(null);
  const scrollRef = useRef(null);
  const courseScrollRef = useRef(null);
  const formRef = useRef(null);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: '',
    offer: '',
    duration: '',
    thumbnail: null
  });
  const [editCourseId, setEditCourseId] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/managevideo`);
      const initialized = res.data.map(video => ({ ...video, showVideo: false }));
      setVideos(initialized);
      setTimeout(() => {
        setVideos(prev => prev.map(video => ({ ...video, showVideo: !!video.videos })));
      }, 2000);
    } catch (err) {
      console.error('❌ Fetch videos error:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error('❌ Fetch courses error:', err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/teachers`);
      setTeachers(res.data);
    } catch (err) {
      console.error('❌ Fetch teachers error:', err);
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail' || name === 'videos') {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val || ''));

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/managevideo/${editId}`, data);
      } else {
        await axios.post(`${BASE_URL}/api/managevideo`, data);
      }
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error('❌ Submit error:', err);
    }
  };

  const handleEdit = video => {
    setEditId(video.id);
    setForm({
      title: video.title || '',
      description: video.description || '',
      youtubeLink: video.youtubelink || '',
      uicode: video.uicode || '',
      backendcode: video.backendcode || '',
      thumbnail: null,
      videos: null,
      course_id: video.course_id || '',
      teacher_id: video.teacher_id || ''
    });
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this video?')) {
      try {
        await axios.delete(`${BASE_URL}/api/managevideo/${id}`);
        fetchVideos();
      } catch (err) {
        console.error('❌ Delete error:', err);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      youtubeLink: '',
      uicode: '',
      backendcode: '',
      thumbnail: null,
      videos: null,
      course_id: '',
      teacher_id: ''
    });
    setEditId(null);
  };

  const scroll = (direction, ref) => {
    const el = ref.current;
    if (el) {
      const shift = direction === 'left' ? -el.clientWidth : el.clientWidth;
      el.scrollTo({ left: el.scrollLeft + shift, behavior: 'smooth' });
    }
  };

  const handleCourseChange = e => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      setCourseForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setCourseForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      price: '',
      offer: '',
      duration: '',
      thumbnail: null
    });
    setEditCourseId(null);
  };

  const handleCourseEdit = course => {
    setEditCourseId(course.id);
    setCourseForm({
      title: course.title || '',
      description: course.description || '',
      price: course.price || '',
      offer: course.offer || '',
      duration: course.duration || '',
      thumbnail: null
    });
  };

  const handleCourseDelete = async id => {
    if (window.confirm('Delete this course?')) {
      try {
        await axios.delete(`${BASE_URL}/api/courses/delete/${id}`);
        fetchCourses();
      } catch (err) {
        console.error('❌ Delete course error:', err);
      }
    }
  };

  const handleCourseSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(courseForm).forEach(([key, val]) => data.append(key, val || ''));

    try {
      if (editCourseId) {
        await axios.put(`${BASE_URL}/api/courses/update/${editCourseId}`, data);
      } else {
        await axios.post(`${BASE_URL}/api/courses/add`, data);
      }
      resetCourseForm();
      fetchCourses();
    } catch (err) {
      console.error('❌ Submit course error:', err);
    }
  };

  return (
    <div className="container-fluid px-3 px-md-5 py-4">
      <AdminNavbar />
      <br/>
      <br/>
      <br/>
      <h2 className="text-center mb-4">Manage Course Videos</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="form-wrapper styled-form mb-5" encType="multipart/form-data">
        <div className="form-grid">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="youtubeLink" placeholder="YouTube Link (optional)" value={form.youtubeLink} onChange={handleChange} />
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
          <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'} Video</button>
        </div>
      </form>

      <div className="video-scroll-wrapper">
        <button className="scroll-button" onClick={() => scroll('left', scrollRef)}>&#10094;</button>
        <div className="video-scroll-container" ref={scrollRef}>
          {videos.map(v => (
            <div className="video-card" key={v.id}>
              <div className="thumbnail-wrapper">
                {!v.showVideo && v.thumbnail && (
                  <img src={`${BASE_URL}/uploads/${v.thumbnail}`} alt={v.title} className="video-thumbnail" />
                )}
                {v.showVideo && v.videos && (
                  <video width="100%" height="180" autoPlay muted controls className="video-actual">
                    <source src={`${BASE_URL}/uploads/${v.videos}`} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="video-card-body">
                <h5>{v.title}</h5>
                <p>{v.description.slice(0, 80)}...</p>
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(v)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(v.id)}>Delete</button>
                </div>
                {!v.videos && v.youtubelink && (
                  <div className="mt-2">
                    <a href={v.youtubelink} target="_blank" rel="noopener noreferrer" className="btn btn-learn">▶ Play YouTube</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={() => scroll('right', scrollRef)}>&#10095;</button>
      </div>

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
          {editCourseId && <button className="btn btn-secondary ml-2" onClick={resetCourseForm}>Cancel Edit</button>}
        </div>
      </form>

      <div className="video-scroll-wrapper">
        <button className="scroll-button" onClick={() => scroll('left', courseScrollRef)}>&#10094;</button>
        <div className="video-scroll-container" ref={courseScrollRef}>
          {courses.map(c => (
            <div className="video-card" key={c.id}>
              {c.thumbnail && (
                <img src={`${BASE_URL}/uploads/${c.thumbnail}`} alt={c.title} className="video-thumbnail" />
              )}
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
