import React from 'react';

function Footer() {
  return (
    <div className="footera-area section-padding wow fadeInDown">
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-footer">
                        <div className="logo-area footer">
                            <a href="#"><img src="/img/compute-ex32.png" alt="" /></a>
                        </div>
                        <div className="space-20"></div>
                        <p>Swimming hundreds of feet beneath the ocean’s surface in many parts of the world are prolific architects called giant larvaceans. </p>
                        <div className="space-10"></div>
                        <p>Copyright &copy; {new Date().getFullYear()}</p>
                    </div>

                </div>
                <div className="col-12 col-sm-6 col-lg-2">
                    <div className="single-footer">
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Token Sale</a></li>
                            <li><a href="#">Roadmap</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-6 col-lg-2">
                    <div className="single-footer">
                        <ul>
                            <li><a href="#">White Paper</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">APP</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-footer">
                        <p>Subscribe to our Newsletter</p>
                        <div className="space-20"></div>
                        <div className="footer-form">
                            <form action="#">
                                <input type="email" placeholder="Email Address" />
                                <a href="" className="gradient-btn subscribe">GO</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Footer;
