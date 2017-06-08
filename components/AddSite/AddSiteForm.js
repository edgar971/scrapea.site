import React, { PropTypes } from 'react';
import {Textfield, Grid, Cell,Checkbox, Button} from 'react-mdl';
import layout_css from '../Layout/Layout.css';
import s from './AddSiteForm.css';

const AddSiteForm = ({site, onSubmit, onChange, saving, errors}) => {
  return (
    <section className={`section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp ${s.form}`}>

      <form className={`${layout_css.content}`} method="post" action="javascript:void(0)" onSubmit={onSubmit}>


        <Grid noSpacing>
          <Cell col={2} />
          <Cell col={8}>
            <Grid noSpacing>
              <Cell col={10}>
                <Textfield
                  label="URL to Scrape"
                  value={site.url}
                  name="url"
                  floatingLabel
                  onChange={onChange}
                  disabled={saving}

                  error="Incorrect URL!"
                  pattern="https?://.+"
                  className={`${s.url_text}`}/>

                <Textfield
                  label="URL to Scrape"
                  name="hidden_input"
                  onChange={onChange}
                  className={`${s.hidden_input}`}/>

              </Cell>
              <Cell col={1} align="middle" offset={1}>
                <Checkbox
                  onChange={onChange}
                  checked={site.entire_site}
                  name="entire_site"
                  disabled={saving}
                  label="Recursive"
                  ripple />
              </Cell>
              <Cell col={12}>
                <Button raised colored disabled={saving || site.url.length <= 0}>{saving ? 'Scraping Site...' : 'Scrape Site'}</Button>
              </Cell>

            </Grid>

          </Cell>
          <Cell col={2} />

        </Grid>

      </form>

    </section>

  );
};

export default AddSiteForm;
