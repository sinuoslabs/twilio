import { TwilioChannelModuleOptions } from '../interfaces';
import { TwilioChannelException } from '../exceptions';

/**
 * Service name message
 * @class TwilioChannelMessage
 */
export class TwilioChannelMessage {
  /**
   * @property
   * @private
   */
  private accountSid: string;

  /**
   * @property
   * @private
   */
  private authToken: string;

  /**
   * @property
   * @private
   */
  private sender: string;

  /**
   * @property
   * @private
   */
  private message: string;

  /**
   * @property
   * @private
   */
  private toPhoneNumber: string;

  /**
   * @constructor
   * @param {TwilioChannelModuleOptions} options
   */
  constructor(options?: TwilioChannelModuleOptions) {
    this.accountSid = options?.twilioAccountSid;
    this.authToken = options?.twilioAuthToken;
    this.sender = options?.twilioSender;
  }

  /**
   * @method
   */
  get getAccountSid() {
    return this.accountSid;
  }

  /**
   * @method
   * @param sid
   */
  setAccountSid(sid: string) {
    this.accountSid = sid;

    return this;
  }

  /**
   * @method
   */
  get getAccountToken() {
    return this.authToken;
  }

  /**
   * @method
   * @param token
   */
  setAccountToken(token: string) {
    this.authToken = token;

    return this;
  }

  /**
   * @method
   */
  get getSender() {
    return this.sender;
  }

  /**
   * @method
   * @param sender
   */
  setSender(sender: string) {
    this.sender = sender;

    return this;
  }

  /**
   * @method
   */
  get getToPhoneNumber() {
    return this.toPhoneNumber;
  }

  /**
   * @method
   * @param toPhoneNumber
   */
  setToPhoneNumber(toPhoneNumber: string) {
    if (!toPhoneNumber.startsWith('+')) {
      throw new TwilioChannelException('Your phone number must start with +.');
    }

    this.toPhoneNumber = toPhoneNumber;

    return this;
  }

  /**
   * @method
   */
  get getMessage() {
    return this.message;
  }

  /**
   * @method
   * @param message
   */
  setMessage(message: string) {
    this.message = message;

    return this;
  }
}
