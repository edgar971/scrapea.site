import React from 'react';
import Layout from '../Layout/Layout';
import s from './AddSite.css';
import AddSiteForm from './AddSiteForm';
import {connect} from 'react-redux';
import * as siteActions from '../../src/actions/siteActions';
import {bindActionCreators} from 'redux';
import {Snackbar} from 'react-mdl';

class AddSite extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      site: Object.assign({}, this.props.site),
      site_in_process: this.props.site_in_process,
      errors: {},
      saving: false,
      isToastActive: false
    };

    this.updateSiteState = this.updateSiteState.bind(this);
    this.addSite = this.addSite.bind(this);


  }

  /**
   *
   * @param e
   */
  updateSiteState(e) {

    const field = e.target.name;

    let site = this.state.site;

    switch (e.target.type) {

      case 'checkbox':
        site[field] = e.target.checked;
        break;

      default:
        site[field] = e.target.value;

    }

    return this.setState({site: site});

  }

  addSite(e) {

    this.setState({saving: true});
    let {hidden_input} = this.state.site;
    e.preventDefault();

    if(!!hidden_input) {
      this.setState({saving: false});
      return;
    }

    // Add the site
    this.props.actions.addSite(this.state.site).then((data) => {


      this.setState({site_in_process: this.props.site_in_process});

      // Check for the status
      let statusCheck = setInterval(() => {

        this.props.actions.checkSiteProcess(this.state.site_in_process.id).then((done) => {

          // Clear the interval once it's done.
          if(done) {

            let site = {
              url: '',
              entire_site: false
            };

            clearInterval(statusCheck);

            // Update the state and load the sites from the API.
            this.setState({saving: false});
            this.setState({site: site});
            this.props.actions.loadSites();


          }



        });


      }, 1000);


    }).catch((error) => {

      this.setState({saving: false});

    })

  }

  render() {
    return (
      <section className={`${s.container}`}>
        <AddSiteForm
          onChange={this.updateSiteState}
          onSubmit={this.addSite}
          site={this.state.site}
          error={this.state.errors}
          saving={this.state.saving}

        />
      </section>
    );
  }

}

function mapStateToProps(state, ownProps) {

  let site = {
    url: '',
    entire_site: false
  };


  return {
    site: site,
    site_in_process: state.site_in_process
  }

}

function mapDispatchToProps(dispatch) {


  return {
    actions: bindActionCreators(siteActions, dispatch)
  }

}


export default connect(mapStateToProps,mapDispatchToProps)(AddSite);
