import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">حزب المبرمجين <i className="fa fa-code"></i></h1>
            <p className="lead bg-light harmattan-font">
              وَ تابع جديد البرمجه "Portfolio" انشئ بروفايلك كـ مبرمج
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">التسجيل</Link>
              <Link to="/login" className="btn">تسجيل الدخول</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Landing
