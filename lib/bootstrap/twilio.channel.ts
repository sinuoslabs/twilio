import { Inject, Injectable, Optional } from '@nestjs/common';
import { INestjsNotificationChannel } from '@sinuos/nestjs-notification';
import { Twilio } from 'twilio';
import { TWILIO_CHANNEL_OPTIONS } from '../constants';
import { ITwilioChannel, TwilioChannelModuleOptions } from '../interfaces';
import { TwilioChannelException } from '../exceptions';

@Injectable()
export class TwilioChannel implements INestjsNotificationChannel {
  /**
   * @property
   * @private
   */
  private readonly accountSid = process.env.TWILIO_ACCOUNT_SID;

  /**
   * @property
   * @private
   */
  private readonly authToken = process.env.TWILIO_AUTH_TOKEN;

  /**
   * @property
   * @private
   */
  private readonly sender = process.env.TWILIO_SENDER;

  /**
   * Twilio channel constructor.
   * @constructor
   * @param {TwilioChannelModuleOptions} options
   */
  constructor(
    @Optional()
    @Inject(TWILIO_CHANNEL_OPTIONS)
    options: TwilioChannelModuleOptions,
  ) {
    if (options?.twilioAccountSid) {
      this.accountSid = options.twilioAccountSid;
    }

    if (options?.twilioAuthToken) {
      this.authToken = options.twilioAuthToken;
    }

    if (options?.twilioSender) {
      this.sender = options.twilioSender;
    }
  }

  /**
   * Send notify action
   * @public
   * @param {ITwilioChannel} notification
   * @return Promise<AxiosResponse<any>>
   */
  public async send(notification: ITwilioChannel): Promise<any> {
    // Validator notification requirements.
    this.validator(notification);

    // get message content.
    const message = TwilioChannel.getData(notification);

    // twilio username.
    const username = this.accountSid ?? message.getAccountSid;

    // twilio password
    const password = this.authToken ?? message.getAccountToken;

    // sender
    const sender = this.sender || message.getSender;

    /** @const twilioClient - Init twilio client */
    const twilioClient = new Twilio(username, password);

    // return twilio message instance
    try {
      return await twilioClient.messages.create({
        body: message.getMessage,
        to: message.getToPhoneNumber,
        from: sender,
      });
    } catch (e) {
      throw new TwilioChannelException(e.message);
    }
  }

  /**
   * Get data.
   * @method
   * @param {ITwilioChannel} notification
   * @private
   */
  private static getData(notification: ITwilioChannel) {
    return TwilioChannel.getChannelData(notification);
  }

  /**
   * Validator.
   * @method
   * @param {ITwilioChannel} notification
   * @private
   */
  private validator(notification: ITwilioChannel) {
    const message = TwilioChannel.getData(notification);

    /** Account sid is empty */
    if (!this.accountSid && !message.getAccountSid) {
      throw new TwilioChannelException('Account sid is required');
    }

    /** Auth token is empty */
    if (!this.authToken && !message.getAccountToken) {
      throw new TwilioChannelException('Account token is required');
    }

    /** Sender is empty */
    if (!this.sender && !message.getSender) {
      throw new TwilioChannelException('Sender is required');
    }

    /** Phone number is empty */
    if (!message.getToPhoneNumber) {
      throw new TwilioChannelException('To phone number is required');
    }

    /**  Message is empty */
    if (!message.getMessage) {
      throw new TwilioChannelException('Message is required');
    }
  }

  /**
   * Get the data for the notification.
   * @method
   * @param notification
   */
  private static getChannelData(notification: ITwilioChannel) {
    if (typeof notification.toTwilio === 'function') {
      return notification.toTwilio();
    }

    throw new TwilioChannelException(
      'Notification is missing toTwilio method.',
    );
  }
}
