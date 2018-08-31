import React from 'react';
// import { render } from 'react-dom';
import MotionStack from 'react-motion-stack';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { withContext } from '../../ContextAPI/Context_HOC'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import 'react-motion-stack/build/motion-stack.css';
import PropTypes from 'prop-types';
import UserCard from '../Card/Card';
import './MatchFinder.css';
import axios from 'axios'

const styles = theme => ({
  formControl: {
      margin: theme.spacing.unit,
      minWidth: 200,
  },
});


class App extends React.Component {
  constructor(){
    super()
      this.state = {
        industry: '',
        cards: []
      }

      this.deck = React.createRef();
  }

  componentDidMount(){
    console.log('----------CONTEXT', this.props.context)
    axios.get(`/api/users/filter?industry=${this.props.context.user.industry_code}&recruiter=${!this.props.context.user.isrecruiter}`).then(res => {
      console.log('------------ COMPONENT DID MOUNT GET ID', res)
      this.setState({
        cards: res.data
      })
    })
    // To get lat/long from zipcode:
    // axios.get('https://api.promaptools.com/service/us/zip-lat-lng/get/?zip={[85234]}&key=7oe8dysanxdrgv1c').then(res => console.log('------------ Map API res', res))
  }

  onBeforeSwipe = (swipe, direction, state) => {
    console.log('direction', direction);
    console.log('state', state);

    swipe();
  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }
 
  onSwipeEnd = ({ data }) => {
    console.log('data', data);
  };
 

  // renderButtons(props) {
  //   return (
  //     <div className="btn-group">
  //       <button children="👎" onClick={props.reject} />
  //       <button children="👍" onClick={props.accept} />
  //     </div>
  //   );
  // }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.context.user !== prevProps.context.user) {
      axios.get(`/api/users/filter?industry=${this.props.context.user.industry_code}&recruiter=${!this.props.context.user.isrecruiter}`).then(res => {
        console.log('------------ COMPONENT UPDATE GET ID', res)
        this.setState({
          cards: res.data
        })
      })
    }
  }








  render() {
    // const data = this.state.arr.map( (e,i) => {
    //   return <div key={i} style={{background:"yellow",height:'80vh',width:'80vw'}}>{e}</div>
    // })
      const { classes, context } = this.props
      let userCards = this.state.cards.map(user => <UserCard id={user.auth0_id} draggable={false} />)
      console.log('------------ this.state.cards.map(e => e.auth0_id)', this.state.cards.map(e => e.auth0_id)[1])
      console.log('------------ userCards', userCards)
      const data = Array.from({ length: this.state.cards.length }, (_, i) => ({
        id: new Date().getTime() + i,
        element: (
          userCards[i]
        )
      }));
    console.log("data",data);
    console.log(this.deck)
    return (
      context.login ?
        <div className="demo-wrapper">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='industry-select'>Industry</ InputLabel>
            <Select
                native
                value={this.state.industry_code}
                onChange={(e) => this.handleChange('industry', e.target.value)}
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
          <MotionStack
            data={data}
            onSwipeEnd={this.onSwipeEnd}
            onBeforeSwipe={this.onBeforeSwipe}
            render={props => props.element}
            renderButtons={this.renderButtons}
            infinite={false}
          />
        </div>
      :
      <div>No user logged in.</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(App));

