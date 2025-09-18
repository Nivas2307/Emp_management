// src/pages/ViewEmployee.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import api from "../api/api";
import "../style/employee.css";
import PageHeader from "../components/PageHeader";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setEmp(res.data?.data ?? res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  // Animate after emp loads
  useEffect(() => {
    if (!emp) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { scale: 0.9, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
            delay: 0.2,
          }
        );
      }

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.querySelectorAll(".emp-line"),
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [emp]);

  if (!emp) return <div className="loading">Loading...</div>;

  const uploadsBase = (
    import.meta.env.VITE_API || "http://localhost:5000/api"
  ).replace("/api", "");

  return (
    <div className="view-container" ref={containerRef}>
      <PageHeader title="View Employee" back={() => navigate(-1)} />

      <div className="view-card">
        {/* Photo */}
        <div className="emp-photo" ref={photoRef}>
          {emp.photo ? (
            <img src={`${uploadsBase}/${emp.photo}`} alt={emp.name} />
          ) : (
            <div className="photo-placeholder">No Photo</div>
          )}
        </div>

        {/* Details */}
        <div className="emp-details" ref={infoRef}>
          <div className="emp-line">
            <strong>ID:</strong> <span>{emp.id || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Name:</strong> <span>{emp.name || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Email:</strong> <span>{emp.email || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Department:</strong> <span>{emp.department || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Designation:</strong> <span>{emp.designation || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Project:</strong> <span>{emp.project || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Work Type:</strong> <span>{emp.work_type || "-"}</span>
          </div>
          <div className="emp-line">
            <strong>Status:</strong> <span>{emp.status || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
