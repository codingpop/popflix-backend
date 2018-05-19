import sgMail from '@sendgrid/mail';

import config from '../config';

sgMail.setApiKey(config.sendGridApiKey);

export const sendOne = (message) => {
  const payload = { ...message };
  payload.from = !payload.from && 'tundewrites@gmail.com';

  sgMail.send(payload);
};

export const ji = '';
