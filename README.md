![issues](https://img.shields.io/github/issues/nestjs-notification-channels/twilio)
[![npm version](https://badge.fury.io/js/@nestjs-notification-channels%2Ftwilio.svg)](https://badge.fury.io/js/@nestjs-notification-channels%2Ftwilio)
![license](https://img.shields.io/github/license/nestjs-notification-channels/twilio)
[![Open Source Helpers](https://www.codetriage.com/nestjs-notification-channels/twilio/badges/users.svg)](https://www.codetriage.com/nestjs-notification-channels/twilio)

# Twilio notification channel for NestJS

This package makes it easy to send [Twilio notifications](https://documentation.twilio.com/docs) with NestJS.

This package is a sub-module of [NestJS notification](https://github.com/sinuoslabs/nestjs-notification).

## Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Available Message methods](#available-message-methods)
- [Changelog](#changelog)
- [Testing](#testing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Installation

::: code

```bash npm
$ npm i @nestjs-notification-channels/twilio
```

```bash yarn
$ yarn add @nestjs-notification-channels/twilio
```

:::

### Configuration

Add your Twilio Account SID, Auth Token, and Sender (optional) to your `.env`:

```dotenv
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_SENDER=
```

## Usage

Module declaration

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  NestjsNotificationModule,
  NestjsNotificationModuleOptions,
} from '@sinuos/nestjs-notification';

@Module({
  imports: [
    NestjsNotificationModule.register(<NestjsNotificationModuleOptions>{}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

You can also declare the account sid, auth token and sender by declaring them like this.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  NestjsNotificationModule,
  NestjsNotificationModuleOptions,
} from '@sinuos/nestjs-notification';
import { TwilioChannelModule } from '@nestjs-notification-channels/twilio';

@Module({
  imports: [
    NestjsNotificationModule.register(<NestjsNotificationModuleOptions>{}),
    TwilioChannelModule.register({
      twilioAccountSid: 'xxx',
      twilioAuthToken: 'xxx',
      twilioSender: 'xxx', // SENDER OR +212xxxxxx,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Now you can use the channel in your `sendToChannels()` method inside the notification:

```typescript
import { NestJsNotification } from '@sinuos/nestjs-notification';
import {
  TwilioChannel,
  TwilioChannelMessage,
  ITwilioChannel,
} from '@nestjs-notification-channels/twilio';

export class OrderedNotification implements NestJsNotification {
  public sendToChannels() {
    return [TwilioChannel];
  }

  toTwilio() {
    return new TwilioChannelMessage()
      .setToFrom('+212xxxxxxxx')
      .setMessage('Your order XXXXX is placed');
  }
}
```

### Available Message methods

#### TwilioMessage

- `accountSid('')` - Optional if account sid is defined in your env.
- `authToken('')` - Optional if auth token is defined in your env.
- `sender('')` - Optional if sender is defined in your env.
- `message('')` - SMS content.
- `toPhoneNumber('')` - Your recipient.

## Changelog

Please see [CHANGELOG][changelog] for more information what has changed recently.

## Testing

::: code

```bash npm
$ npm run test
```

```bash yarn
$ yarn test
```

:::

## Security

If you discover any security related issues, please email gregoriohc@gmail.com instead of using the issue tracker.

## Contributing

Please see [CONTRIBUTING][contributing] for details.

## License

The MIT License (MIT). Please see [License File][license] for more information.

[license]: https://github.com/nestjs-notification-channels/twilio/blob/main/LICENSE
[changelog]: https://github.com/nestjs-notification-channels/twilio/blob/main/CHANGELOG
[contributing]: https://github.com/nestjs-notification-channels/twilio/blob/main/CONTRIBUTING
