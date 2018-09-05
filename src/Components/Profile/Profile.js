import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import { withContext } from '../../ContextAPI/Context_HOC'
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import axios from 'axios'
import Card from '../Card/Card'
import './Profile.css'

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    input: {
        margin: 'none',
    },
    textarea: {
        border: 'solid',
        borderRadius: 9,
        padding: 8,
        borderColor: '#3f51b5',
        borderWidth: 2,
        minWidth: '70%'
    },
    // bio: {
    //     color: '#A8B4B3',
    //     backgroundColor: '#A8B4B3',
    // },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class Profile extends Component {
    state = {
        auth0_id: '',
        active: '',
        attachment: '',
        bio: '',
        current_zipcode: '',
        education_background: '',
        email: '',
        first_name: '',
        last_name: '',
        industry_code: '',
        looking_for: '',
        current_job: '',
        picture: '',
        preferred_location: '',
        work_history: '',
        snackMessage: '',
        isrecruiter: false,
        snack: false,
        editing: false
    }

    componentDidMount() {
        axios.get('/api/session/user').then(res => {
            const { auth0_id, active, attachment, bio, current_zipcode, isrecruiter, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history } = res.data
            console.log('------------ res', res)
            this.setState({
                auth0_id, active, attachment, bio, current_zipcode, isrecruiter, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history
            })
        })
    }

    handleChange = (field, val) => {
        console.log('------------ val', val)
        this.setState({
            [field]: val
        })
    }

    // Responsible for closing MaterialUI elements
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snack: false });
    };

    // Cloudinary front end function
    handleFileUpload = (file) => {
        axios.get('/api/upload').then(res => {
            console.log('------------ cloudinary server res', res)
            console.log('------------ file', file)
            let formData = new FormData()
            formData.append('signature', res.data.signature)
            formData.append('api_key', "473154255243884")
            formData.append('timestamp', res.data.timestamp)
            formData.append('file', file[0])
            console.log('------------ formData', formData)
            axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData).then(res => {
                console.log('------------ cloudinary upload res', res)
                this.setState({
                    picture: res.data.secure_url
                })
            }).catch(error => console.log('------------ error uploading file to cloudinary', error))
        })
    }

    submitEdit = () => {
        const { auth0_id, active, attachment, bio, current_zipcode, isrecruiter, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history } = this.state

        // Testing user inputs for white space or returns. Valid characters are needed before a profile update is submitted.
        if( (/\S/.test(auth0_id)) && (/\S/.test(bio)) && (/\S/.test(current_zipcode)) && (/\S/.test(education_background)) && (/\S/.test(industry_code)) && (/\S/.test(looking_for)) && (/\S/.test(current_job)) && (/\S/.test(picture)) && (/\S/.test(preferred_location)) && (/\S/.test(work_history)) ) {

            axios.post('/api/user', { auth0_id, active, attachment, bio, current_zipcode, isrecruiter, education_background, email, first_name, last_name, industry_code, looking_for, current_job, picture, preferred_location, work_history }).then(res => {
                console.log('edit response', res) 
                this.props.context.methods.checkForLogin()
                this.setState({
                    editing: false,
                    snackMessage: 'Profile updated',
                    snack: true
                })
            }).catch(error => console.log('------------ submitEdit Error', error))
        } else {
            this.setState({
                snackMessage: 'Please fill in all profile information',
                snack: true
            })
        }
    }
    
    // For the <Dropzone />
    onDrop = (files) => {
        this.handleFileUpload(files)
        this.setState({
            files
        });
    }

    render() {
        console.log('------------ this.state', this.state)
        const { classes, context } = this.props
        const { isrecruiter } = this.state
        return (
            
            context.login ?
                !this.state.first_name ?
                <div>
                    <CircularProgress className={classes.progress} size={50} color='primary' />
                </div>
                :
                <div>
                    <div>
                        {this.state.editing ?
                            <div className={classes.container}>
                                <img src={this.state.picture} alt="Profile" width='300' />
                                <div>
                                    <FormControl className={classes.FormControl}>
                                        <InputLabel htmlFor='profile-picture'>Profile Picture URL</InputLabel>
                                        <Input 
                                            id='profile-picture'
                                            defaultValue={this.state.picture} 
                                            className={classes.input} 
                                            onChange={(e) => this.handleChange('picture', e.target.value)} />
                                        <section>
                                            <div className="dropzone">
                                                <Dropzone 
                                                    onDrop={this.onDrop}
                                                    style={ {
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        border: 'solid',
                                                        borderRadius: 9,
                                                        padding: 8,
                                                        borderColor: '#3f51b5',
                                                        borderWidth: 2,
                                                        minWidth: '70%',
                                                        cursor: 'pointer',
                                                        color: 'gray'
                                                    } }>
                                                    {this.state.files ? this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) : <p>Try dropping some files here, or click to select files to upload.</p>}
                                                </Dropzone>
                                            </div>
                                        </section>
                                    </ FormControl>
                                </div>
                                <div className='profileBio'>
                                    <TextField className={classes.textarea}
                                        helperText={isrecruiter ? 'Company' : 'Bio'}
                                        multiline={true}
                                        rows={8}
                                        rowsMax={12} 
                                        value={this.state.bio}
                                        onChange={(e) => this.handleChange('bio', e.target.value)} 
                                        />
                                </div>
                                <div>
                                    <FormControl className={classes.FormControl}>
                                        <InputLabel htmlFor='zipcode'>Zipcode</InputLabel>
                                        <Input 
                                            id='zipcode'
                                            defaultValue={this.state.current_zipcode}
                                            className={classes.input}
                                            type='number'
                                            onChange={(e) => this.handleChange('current_zipcode', e.target.value)} />
                                    </ FormControl>
                                </div>
                                <div className='textarea-container'>
                                    <TextField
                                        helperText={isrecruiter ? 'Company Description:' : 'Work History:'}
                                        multiline={true}
                                        rows={8}
                                        rowsMax={12}
                                        value={this.state.work_history}
                                        onChange={(e) => this.handleChange('work_history', e.target.value)}
                                        className={classes.textarea} />
                                </div>
                                <div className='textarea-container'>
                                    <TextField
                                        helperText={isrecruiter ? 'Qualifications:' : 'Education Background:'}
                                        multiline={true}
                                        rows={8}
                                        rowsMad={12}
                                        value={this.state.education_background}
                                        onChange={(e) => this.handleChange('education_background', e.target.value)}
                                        className={classes.textarea} />
                                </div>
                                <div className='textarea-container'>
                                    <TextField
                                        helperText='Looking for'
                                        multiline={true}
                                        rows={5}
                                        rowsMad={12}
                                        value={this.state.looking_for}
                                        onChange={(e) => this.handleChange('looking_for', e.target.value)}
                                        className={classes.textarea} />
                                </div>
                                <div>
                                    <FormControl className={classes.FormControl}>
                                        <InputLabel htmlFor='job-title'>{isrecruiter ? 'Positions Open:' : 'Job Interests:'}</InputLabel>
                                        <Input
                                        defaultValue={this.state.current_job}
                                        id='job-title'
                                        className={classes.input}
                                        onChange={(e) => this.handleChange('current_job', e.target.value)} />
                                    </ FormControl>
                                </div>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor='preferred-location-select'>{isrecruiter ? 'State:' : 'Preferred Location:'}</ InputLabel>
                                        <Select
                                            native
                                            value={this.state.preferred_location}
                                            onChange={(e) => this.handleChange('preferred_location', e.target.value)}
                                            inputProps={{
                                                name: isrecruiter ? 'State:' : 'Preferred Location:',
                                                id: 'preferred-location-select'
                                            }} >
                                            <option value=""/>
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
                                        </ Select>
                                    </ FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor='industry-select'>Industry</ InputLabel>
                                        <Select
                                            native
                                            value={this.state.industry_code}
                                            onChange={(e) => this.handleChange('industry_code', e.target.value)}
                                            inputProps={{
                                                name: 'Industry Code',
                                                id: 'industry-select'
                                            }} >
                                            <option value="" />                           
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
                                        </ Select>
                                    </ FormControl>
                                </div> 
                            </div>
                        :
                            <Card id={this.state.auth0_id} width={'80%'} />
                        }    
                    </div>
                    <div>
                        <Button 
                            onClick={() => this.setState({ editing: !this.state.editing })} 
                            variant='contained' 
                            className={classes.button}>
                                {this.state.editing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                        {this.state.editing && 
                            <Button 
                                variant='contained' 
                                color='primary' 
                                onClick={this.submitEdit}>
                                    Submit Changes
                            </Button>
                        }
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={this.state.snack}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            variant='success'
                            message={<span id="message-id">{this.state.snackMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </div>
                </div>
            :
            <div className="NoUser"> No user logged in! </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(Profile));