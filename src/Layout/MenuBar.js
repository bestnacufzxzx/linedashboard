import React, {Component} from 'react';

export default class MenuBar extends Component {

    render(){
        return(
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Group Line </h5>
            {/* <nav className="my-2 my-md-0 mr-md-3">
                <Link to="/" className="p-2 text-dark">ประวัติส่วนตัว</Link>
                <Link to="/skill" className="p-2 text-dark">ความสามารถ</Link>
                <Link to="/education" className="p-2 text-dark">ประวัติการศึกษา</Link>
                <Link to="/activity" className="p-2 text-dark">ประวัติการอบรม</Link>

            </nav>
            <a className="btn btn-outline-primary" href="#">Sign up</a> */}
        </div>
        )
      }
}

