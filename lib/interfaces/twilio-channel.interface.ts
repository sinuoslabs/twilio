import { NestJsNotification } from '@sinuos/nestjs-notification';

/**
 * Twilio channel model
 * @interface ITwilioChannel
 * @extends NestJsNotification
 */
export interface ITwilioChannel extends NestJsNotification {
  /**
   * Get representation of the notification.
   * @property
   * @returns {any}
   */
  toTwilio?(): any;
}
