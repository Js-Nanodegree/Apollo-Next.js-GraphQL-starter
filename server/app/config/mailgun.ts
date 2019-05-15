/*
 * Configures MailGun and exports it.
 * The MailGun config key and domain should be set in the .env
 */
import { MAILGUN_CONFIG } from '../config/secrets';
export default require('mailgun-js')(MAILGUN_CONFIG);
