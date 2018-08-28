import React, { Component } from 'react';
import axios from 'axios'

export default class Profile extends Component {
    state = {
        active: '',
        attachment: '',
        bio: '',
        current_zipcode: '',
        education_background: '',
        email: '',
        first_name: '',
        last_name: '',
        industry_code: '',
        job_interest: '',
        job_title: '',
        picture: '',
        preferred_location: '',
        work_history: '',
        user: '',
        editing: false
    }

    componentDidMount() {
        axios.get('/api/session/user').then(res => {
            const { active, attachment, bio, current_zipcode, education_background, email, first_name, last_name, industry_code, job_interest, job_title, picture, preferred_location, work_history } = res.data
            console.log('------------ res', res)
            this.setState({
                active, attachment, bio, current_zipcode, education_background, email, first_name, last_name, industry_code, job_interest, job_title, picture, preferred_location, work_history
            })
        })
    }

    handleChange = (field, val) => {
        this.setState({
            [field]: val
        })
    }

    submitEdit = () => {
        const { active, attachment, bio, current_zipcode, education_background, email, first_name, last_name, industry_code, job_interest, job_title, picture, preferred_location, work_history } = this.state
        axios.post('/api/user', { active, attachment, bio, current_zipcode, education_background, email, first_name, last_name, industry_code, job_interest, job_title, picture, preferred_location, work_history })
    }

    render() {
        console.log('------------ this.state', this.state)
        return (
            !this.state.first_name ?
            <div>
                Loading...
            </div>
            :
            <div>
                <div>
                    <figure><img src={this.state.picture} alt="Profile" width='200'/></figure>
                    <div>{this.state.first_name} {this.state.last_name}</div>
                    <div>{this.state.email}</div>
                    {this.state.editing ?
                        <div>
                            <div><input type="text" value={this.state.picture} onChange={(e) => this.handleChange('picture', e.target.value)}/></div>
                            <div><textarea value={this.state.bio} placeholder='Bio' onChange={(e) => this.handleChange('bio', e.target.value)} cols="30" rows="10"></textarea></div>
                            <div><input type="text" value={this.state.current_zipcode} onChange={(e) => this.handleChange('current_zipcode', e.target.value)} placeholder='Zipcode' maxLength='5' minLength='5'/></div>
                            <div><textarea value={this.state.work_history} placeholder='Work History' onChange={(e) => this.handleChange('work_history', e.target.value)} cols="30" rows="10"></textarea></div>
                            <div><textarea value={this.state.education_background} placeholder='Education Background' onChange={(e) => this.handleChange('education_background', e.target.value)} cols="30" rows="10"></textarea></div>
                            <div><textarea value={this.state.job_interest} placeholder='Job Interests' onChange={(e) => this.handleChange('job_interest', e.target.value)} cols="10" rows="10"></textarea></div>
                            <div><input type="text" value={this.state.job_title} onChange={(e) => this.handleChange('job_title', e.target.value)} placeholder='Job Title' /></div>
                            <div>Preferred location: <select onChange={(e) => this.handleChange('state', e.target.value)}>
                                <option value={this.state.preferred_location}>State</option>
                                <option value='AL'>Alabama</option>
                                <option value='AK'>Alaska</option>
                                <option value='AZ'>Arizona</option>
                                <option value='AR'>Arkansas</option>
                                <option value='CA'>California</option>
                                <option value='CO'>Colorado</option>
                                <option value='CT'>Connecticut</option>
                                <option value='DE'>Delaware</option>
                                <option value='DC'>District Of Columbia</option>
                                <option value='FL'>Florida</option>
                                <option value='GA'>Georgia</option>
                                <option value='HI'>Hawaii</option>
                                <option value='ID'>Idaho</option>
                                <option value='IL'>Illinois</option>
                                <option value='IN'>Indiana</option>
                                <option value='IA'>Iowa</option>
                                <option value='KS'>Kansas</option>
                                <option value='KY'>Kentucky</option>
                                <option value='LA'>Louisiana</option>
                                <option value='ME'>Maine</option>
                                <option value='MD'>Maryland</option>
                                <option value='MA'>Massachusetts</option>
                                <option value='MI'>Michigan</option>
                                <option value='MN'>Minnesota</option>
                                <option value='MS'>Mississippi</option>
                                <option value='MO'>Missouri</option>
                                <option value='MT'>Montana</option>
                                <option value='NE'>Nebraska</option>
                                <option value='NV'>Nevada</option>
                                <option value='NH'>New Hampshire</option>
                                <option value='NJ'>New Jersey</option>
                                <option value='NM'>New Mexico</option>
                                <option value='NY'>New York</option>
                                <option value='NC'>North Carolina</option>
                                <option value='ND'>North Dakota</option>
                                <option value='OH'>Ohio</option>
                                <option value='OK'>Oklahoma</option>
                                <option value='OR'>Oregon</option>
                                <option value='PA'>Pennsylvania</option>
                                <option value='RI'>Rhode Island</option>
                                <option value='SC'>South Carolina</option>
                                <option value='SD'>South Dakota</option>
                                <option value='TN'>Tennessee</option>
                                <option value='TX'>Texas</option>
                                <option value='UT'>Utah</option>
                                <option value='VT'>Vermont</option>
                                <option value='VA'>Virginia</option>
                                <option value='WA'>Washington</option>
                                <option value='WV'>West Virginia</option>
                                <option value='WI'>Wisconsin</option>
                                <option value='WY'>Wyoming</option>
                            </select></div>
                            <div>Industry: <select onChange={(e) => this.handleChange('industry_code', e.target.value)}>  
                                <option value={this.state.industry_code}>Industry</option>                           
                                <option value='Airlines/Aviation'>Airlines/Aviation</option>
                                <option value='Alternative Dispute Resolution'>Alternative Dispute Resolution</option>
                                <option value='Alternative Medicine'>Alternative Medicine</option>
                                <option value='Animation'>Animation</option>
                                <option value='Animation'>Apparel & Fashion</option>
                                <option value='Architecture and Planning'>Architecture & Planning</option>
                                <option value='Arts and Crafts'>Arts and Crafts</option>
                                <option value='Automotive'>Automotive</option>
                                <option value="Aviation and Aerospace">Aviation & Aerospace</option>
                                <option value='Banking'>Banking</option>
                                <option value='Biotechnology'>Biotechnology</option>
                                <option value='Building Materials'>Building Materials</option>
                                <option value='Business Supplies and Equipment'>Business Supplies and Equipment</option>
                                <option value='Capital Markets'>Capital Markets</option>
                                <option value='Chemicals'>Chemicals</option>
                                <option value='Civic and Social Organization'>Civic & Social Organization</option>
                                <option value='Civil Engineering'>Civil Engineering</option>
                                <option value='Commercial Real Estate'>Commercial Real Estate</option>
                                <option value='Computer and Network Security'>Computer & Network Security</option>
                                <option value='Computer Games'>Computer Games</option>
                                <option value='Computer Hardware'>Computer Hardware</option>
                                <option value='Computer Networking'>Computer Networking</option>
                                <option value='Computer Software'>Computer Software</option>
                                <option value='Construction'>Construction</option>
                                <option value='Consumer Electronics'>Consumer Electronics</option>
                                <option value='Consumer Goods'>Consumer Goods</option>
                                <option value='Consumer Services'>Consumer Services</option>
                                <option value='Cosmetics'>Cosmetics</option>
                                <option value='Dairy'>Dairy</option>
                                <option value='Defense and Space'>Defense & Space</option>
                                <option value='Design'>Design</option>
                                <option value='Education Management'>Education Management</option>
                                <option value='E-Learning'>E-Learning</option>
                                <option value='Electrical/Electronic Manufacturing'>Electrical/Electronic Manufacturing</option>
                                <option value='Entertainment'>Entertainment</option>
                                <option value='Environmental Services'>Environmental Services</option>
                                <option value='Events Services'>Events Services</option>
                                <option value='Executive Office'>Executive Office</option>
                                <option value='Facilities Services'>Facilities Services</option>
                                <option value='Farming'>Farming</option>
                                <option value='Financial Services'>Financial Services</option>
                                <option value='Fine Art'>Fine Art</option>
                                <option value='Fishery'>Fishery</option>
                                <option value='Food and Beverages'>Food & Beverages</option>
                                <option value='Food Production'>Food Production</option>
                                <option value='Fund-Raising'>Fund-Raising</option>
                                <option value='Furniture'>Furniture</option>
                                <option value='Gambling and Casinos'>Gambling & Casinos</option>
                                <option value='Glass, Ceramics and Concrete'>Glass, Ceramics & Concrete</option>
                                <option value='Government Administration'>Government Administration</option>
                                <option value='Government Relations'>Government Relations</option>
                                <option value='Graphic Design'>Graphic Design</option>
                                <option value='Health, Wellness and Fitness'>Health, Wellness and Fitness</option>
                                <option value='Higher Education'>Higher Education</option>
                                <option value='Hospital and Health Care'>Hospital & Health Care</option>
                                <option value='Hospitality'>Hospitality</option>
                                <option value='Human Resources'>Human Resources</option>
                                <option value='Import and Export'>Import and Export</option>
                                <option value='Individual and Family Services'>Individual & Family Services</option>
                                <option value='Industrial Automation'>Industrial Automation</option>
                                <option value='Information Services'>Information Services</option>
                                <option value='Information Technology and Services'>Information Technology and Services</option>
                                <option value='Insurance'>Insurance</option>
                                <option value='International Affairs'>International Affairs</option>
                                <option value='International Trade and Development'>International Trade and Development</option>
                                <option value='Internet'>Internet</option>
                                <option value='Investment Banking'>Investment Banking</option>
                                <option value='Investment Management'>Investment Management</option>
                                <option value='Judiciary'>Judiciary</option>
                                <option value='Law Enforcement'>Law Enforcement</option>
                                <option value='Law Practice'>Law Practice</option>
                                <option value='Legal Services'>Legal Services</option>
                                <option value='Legislative Office'>Legislative Office</option>
                                <option value='Leisure, Travel and Tourism'>Leisure, Travel & Tourism</option>
                                <option value='Libraries'>Libraries</option>
                                <option value='Logistics and Supply Chain'>Logistics and Supply Chain</option>
                                <option value='Luxury Goods and Jewelry'>Luxury Goods & Jewelry</option>
                                <option value='Machinery'>Machinery</option>
                                <option value='Management Consulting'>Management Consulting</option>
                                <option value='Maritime'>Maritime</option>
                                <option value='Market Research'>Market Research</option>
                                <option value='Marketing and Advertising'>Marketing and Advertising</option>
                                <option value='Mechanical or Industrial Engineering'>Mechanical or Industrial Engineering</option>
                                <option value='Media Production'>Media Production</option>
                                <option value='Medical Devices'>Medical Devices</option>
                                <option value='Medical Practice'>Medical Practice</option>
                                <option value='Mental Health Care'>Mental Health Care</option>
                                <option value='Military'>Military</option>
                                <option value='Mining and Metals'>Mining & Metals</option>
                                <option value='Motion Pictures and Film'>Motion Pictures and Film</option>
                                <option value='Museums and Institutions'>Museums and Institutions</option>
                                <option value='Music'>Music</option>
                                <option value='Nanotechnology'>Nanotechnology</option>
                                <option value='Newspapers'>Newspapers</option>
                                <option value='Non-Profit Organization Management'>Non-Profit Organization Management</option>
                                <option value='Oil and Energy'>Oil & Energy</option>
                                <option value='Online Media'>Online Media</option>
                                <option value='Outsourcing/Offshoring'>Outsourcing/Offshoring</option>
                                <option value='Package/Freight Delivery'>Package/Freight Delivery</option>
                                <option value='Packaging and Containers'>Packaging and Containers</option>
                                <option value='Paper and Forest Products'>Paper & Forest Products</option>
                                <option value='Performing Arts'>Performing Arts</option>
                                <option value='Pharmaceuticals'>Pharmaceuticals</option>
                                <option value='Philanthropy'>Philanthropy</option>
                                <option value='Photography'>Photography</option>
                                <option value='Plastics'>Plastics</option>
                                <option value='Political Organization'>Political Organization</option>
                                <option value='Primary/Secondary Education'>Primary/Secondary Education</option>
                                <option value='Printing'>Printing</option>
                                <option value='Professional Training & Coaching'>Professional Training & Coaching</option>
                                <option value='Program Development'>Program Development</option>
                                <option value='Public Policy'>Public Policy</option>
                                <option value='Public Relations and Communications'>Public Relations and Communications</option>
                                <option value='Public Safety'>Public Safety</option>
                                <option value='Publishing'>Publishing</option>
                                <option value='Railroad Manufacture'>Railroad Manufacture</option>
                                <option value='Ranching'>Ranching</option>
                                <option value='Real Estate'>Real Estate</option>
                                <option value='Recreational Facilities and Services'>Recreational Facilities and Services</option>
                                <option value='Religious Institutions'>Religious Institutions</option>
                                <option value='Renewables and Environment'>Renewables & Environment</option>
                                <option value='Research'>Research</option>
                                <option value='Restaurants'>Restaurants</option>
                                <option value='Retail'>Retail</option>
                                <option value='Security and Investigations'>Security and Investigations</option>
                                <option value='Semiconductors'>Semiconductors</option>
                                <option value='Shipbuilding'>Shipbuilding</option>
                                <option value='Sporting Goods'>Sporting Goods</option>
                                <option value='Sports'>Sports</option>
                                <option value='Staffing and Recruiting'>Staffing and Recruiting</option>
                                <option value='Supermarket'>Supermarkets</option>
                                <option value='Telecommunications'>Telecommunications</option>
                                <option value='Textiles'>Textiles</option>
                                <option value='Think Tanks'>Think Tanks</option>
                                <option value='Tobacco'>Tobacco</option>
                                <option value='Translation and Localization'>Translation and Localization</option>
                                <option value='Transportation/Trucking/Railroad'>Transportation/Trucking/Railroad</option>
                                <option value='Utilities'>Utilities</option>
                                <option value='Venture Capital and Private Equity'>Venture Capital & Private Equity</option>
                                <option value='Veterinary'>Veterinary</option>
                                <option value='Warehousing'>Warehousing</option>
                                <option value='Wholesale'>Wholesale</option>
                                <option value='Wine and Spirits'>Wine and Spirits</option>
                                <option value='Wireless'>Wireless</option>
                                <option value='Writing and Editing'>Writing and Editing</option>
                            </select></div>
                        </div>
                    :
                        <div>
                            <div>{this.state.bio}</div>
                            <div>{this.state.current_zipcode}</div>
                        </div>
                    }    
                </div>
                <div>
                    <button onClick={() => this.setState({ editing: !this.state.editing })}>{this.state.editing ? 'Cancel' : 'Edit Profile'}</button>
                    {this.state.editing && <button onClick={this.submitEdit}>Submit Changes</button>}
                </div>
            </div>
        );
    }
}