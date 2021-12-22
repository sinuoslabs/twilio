/**
 * @class TwilioChannelException
 * @extends Error
 */
export class TwilioChannelException extends Error {
  /**
   * @constructor
   * @param message
   */
  constructor(message: string) {
    super(message);

    this.name = 'TwilioChannelException';
  }
}
