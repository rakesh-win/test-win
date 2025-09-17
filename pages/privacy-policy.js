import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Sidebar from '../components/TermsOfService/Sidebar';
// import Footer from '../components/_App/Footer';

const PrivacyPolicy = () => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Privacy Policy" 
            />   

             <div className="features-area ptbpage">
                <div className="container">
                    <div className="section-title" style={{"max-width": "1200px"}}>
                        <h2 style={{"max-width": "1200px"}}>Privacy Policy</h2>
                       
                    </div>
                </div>
            </div>

            <div className="privacy-policy-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="privacy-policy-content">
                                <p><i>This Privacy Policy was last updated on March 1, 2023.</i></p>
                               
                                <p>
                                    This privacy policy applies to www.winupskill.com and other platforms owned and operated by win, a TMMS Solution Pvt. Ltd brand (to be referred to as “win” from here on).
                                </p>
                                <p>
                                    win is committed to protecting your privacy. We understand the importance of providing you with information concerning how we collect, use and protect information provided by you and/or collected by win. This Privacy Policy may be updated from time to time for any reason; each version will apply to information collected while it was in place. We will notify you of any material changes to our Privacy Policy by posting the new Privacy Policy on our Site. You are advised to consult this Privacy Policy regularly for any changes.
                                </p>
                                <p>
                                    By using our Site and Service you are consenting to our processing of your information as set forth in this Privacy Policy now and as amended by us. The use of information collected through our systems shall be limited to the purpose of providing the service for which the Customer has engaged win.
                                </p>
                                <h3>Collection and Use of Personal Information</h3>
                                <p>“Personal Information” is Information that can be used to uniquely identify or contact a single person or business entity. Examples of personal information include a personal name or company name, telephone number, and email address. We collect Personal Information when you elect to provide such information to us, such as when you register for or use any service, request additional information from us about our products and services, or submit an email to us. We also collect Personal Information in conjunction with providing our services, including support. We use Personal Information to provide you with the information, products or services that you have requested and, if applicable, charging you for the products or services you have ordered. We may also disclose Personal Information with our affiliates as well as other companies with which we have relationships in order to provide you with the information, products or services which you have requested. We may use Personal Information to provide important notices regarding our products and services. We may use Personal Information for internal purposes such as helping use develop, deliver and improve our services, content, and advertising. If you decide at any time that you no longer wish to receive such information or communications from us, please follow the unsubscribe instructions provided in any of the communications. We will never sell your Personal Information to third parties.</p>
                                <h3>Service Providers</h3>
                                <p>We engage certain trusted third parties to perform functions and provide services to us, including, without limitation, hosting and maintenance, customer relationship, database storage and management, and direct marketing campaigns. We will not share your personally identifiable information with these third parties, and only pursuant to binding contractual obligations requiring such third parties to maintain the privacy and security of your data.</p>
                                <h3>Compliance with Laws and Law Enforcement</h3>
                                <p>win cooperates with government and law enforcement officials or private parties to enforce and comply with the law. We may disclose any information about you to government or law enforcement officials or private parties as we, in our sole discretion, believe necessary or appropriate to respond to claims, legal process (including subpoenas), to protect the property and rights of win or a third party, the safety of the public or any person, to prevent or stop any illegal, unethical, or legally actionable activity, or to comply with the law.</p>
                                <h3>Business Transfers</h3>
                                <p>win may sell, transfer or otherwise share some or all of its assets, including your personally identifiable information, in connection with a merger, acquisition, reorganization or sale of assets or in the event of bankruptcy. You will have the opportunity to opt out of any such transfer if the new entity’s planned processing of your information differs materially from that set forth in this Privacy Policy.</p>
                                <h3>Changing or Deleting Information</h3>
                                <p>If you are a registered user of the Service, you may access and update or correct the information you provided to us by e-mailing us at info@winupskill.com.</p>
                                <h3>Security</h3>
                                <p>win is very concerned about safeguarding the confidentiality of your personally identifiable information. We employ administrative, physical and electronic measures designed to protect your information from unauthorized access. We will make any legally-required disclosures of any breach of the security, confidentiality, or integrity of your unencrypted electronically stored personal data to you via email or conspicuous posting in the Service in the most expedient time possible and without unreasonable delay, consistent with (i) the legitimate needs of law enforcement or (ii) any measures necessary to determine the scope of the breach and restore the reasonable integrity of the data system.</p>
                                
                            </div>
                        </div>

                        <p><br /><br /><br /></p>
 
                        
                    </div>
                </div>
            </div>
          
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default PrivacyPolicy;