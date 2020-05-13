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
                        <p>ComputeEx is a decentralized peer to peer solution, where you can trade hassle-free by fetching the best rates from different exchanges in one place. ComputeEx allows you to trade top digital assets on major exchanges,... </p>
                        <div className="space-10"></div>
                        <p>Copyright &copy; {new Date().getFullYear()}</p>
                    </div>

                </div>
                <div className="col-12 col-sm-6 col-lg-2">
                    <div className="single-footer">
                        <ul>
                            <li><a className="scroll" href="#about">About</a></li>
                            <li><a onClick={() => this.props.history.push('/multiexchange')}>Multi Exchange</a></li>
                            <li><a onClick={() => this.props.history.push('/lending')}>Lending & Borrowing</a></li>
                            <li><a  onClick={() => this.props.history.push('/uphold')}>BTC to Es</a></li>
                            <li><a  onClick={() => this.props.history.push('/uphold')}>Uphold</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-6 col-lg-2">
                    <div className="single-footer">
                        <ul>
                            <li><a className="scroll" href="#faq">FAQ</a></li>
                            <li><a href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank">White Paper</a></li>
                            <li><a href="terms_conditions.pdf" target="_blank">Terms & Conditions</a></li>
                            <li><a href="privacy_policy.pdf" target="_blank">Privacy Policy </a></li>
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
