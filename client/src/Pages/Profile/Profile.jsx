import React from "react";
import "./Profile.css";
import Sidebar from "../../components/Sidebar";
const Profile = () => {
  return (
    <Sidebar>
      <div className="house">
        <div>
          <div className="navbar-top">
            <div className="title">
              <h1>Profile</h1>
            </div>
            <ul>
              <li>
                <a href="#message">
                  <span className="icon-count">29</span>
                  <i className="fa fa-envelope fa-2x" />
                </a>
              </li>
              <li>
                <a href="#notification">
                  <span className="icon-count">59</span>
                  <i className="fa fa-bell fa-2x" />
                </a>
              </li>
              <li>
                <a href="#sign-out">
                  <i className="fa fa-sign-out-alt fa-2x" />
                </a>
              </li>
            </ul>
          </div>
          <div className="main">
            <h2>IDENTITY</h2>
            <div className="card">
              <div className="card-body">
                <i className="fa fa-pen fa-xs edit" />
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td>ImDezCode</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>imdezcode@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>Bali, Indonesia</td>
                    </tr>
                    <tr>
                      <td>Hobbies</td>
                      <td>:</td>
                      <td>Diving, Reading Book</td>
                    </tr>
                    <tr>
                      <td>Job</td>
                      <td>:</td>
                      <td>Web Developer</td>
                    </tr>
                    <tr>
                      <td>Skill</td>
                      <td>:</td>
                      <td>PHP, HTML, CSS, Java</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h2>SOCIAL MEDIA</h2>
            <div className="card">
              <div className="card-body">
                <i className="fa fa-pen fa-xs edit" />
                <div className="social-media">
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-facebook fa-stack-1x fa-inverse" />
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-instagram fa-stack-1x fa-inverse" />
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-invision fa-stack-1x fa-inverse" />
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-github fa-stack-1x fa-inverse" />
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-whatsapp fa-stack-1x fa-inverse" />
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-snapchat fa-stack-1x fa-inverse" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Profile;
