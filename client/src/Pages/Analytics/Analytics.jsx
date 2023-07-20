import React, { useState, useEffect } from "react";
import "./Analytics.css";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
const Analytics = () => {
  const [arr, setArr] = useState([]);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8090/api/user/analytics/${auth?.user?._id}`
        );
        if (res && res.status === 200) {
          setArr(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAnalytics();
  }, []);
  return (
    <Sidebar>
      <section className="content">
        <nav>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode" />
          <a href="#" className="notification">
            <i className="bx bxs-bell" />
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="" />
          </a>
        </nav>
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download" />
              <span className="text">Download PDF</span>
            </a>
          </div>
          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check" />
              <span className="text">
                <h3>{arr?.totalCourses}</h3>
                <p>Total Courses</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group" />
              <span className="text">
                <h3>{arr?.totalEnroll}</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle" />
              <span className="text">
                <h3>💲{arr?.totalProfit}</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Courses</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>TotalVideos</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {arr?.Analytic?.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={`http://localhost:8090/uploads/${obj.img}`}
                          />
                          <p>{obj.title}</p>
                        </td>
                        <td>{obj.totalVideos}</td>
                        <td>
                          <span className="status completed">
                            {obj.totalProfitFromThis}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: 2,
                  boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                }}
                width={640}
                height={480}
                src="https://charts.mongodb.com/charts-project-0-wngfm/embed/charts?id=64a70439-de9a-4a53-8713-063a5fcd9683&maxDataAge=3600&theme=light&autoRefresh=true"
              />
            </div>
          </div>
        </main>
      </section>
    </Sidebar>
  );
};

export default Analytics;
