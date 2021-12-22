import {
  DynamicModule,
  Global,
  Module,
  Provider,
  ValueProvider,
} from '@nestjs/common';
import { TwilioChannel } from './bootstrap';
import {
  TwilioChannelModuleAsyncOptions,
  TwilioChannelModuleOptions,
  TwilioChannelModuleOptionsFactory,
} from './interfaces';
import { TWILIO_CHANNEL_OPTIONS } from './constants';

@Global()
@Module({})
export class TwilioChannelModule {
  /**
   * Register module
   * @static
   * @param {TwilioChannelModuleOptions} options
   * @return DynamicModule
   */
  static register(options: TwilioChannelModuleOptions): DynamicModule {
    const channelProvider: ValueProvider = {
      provide: TWILIO_CHANNEL_OPTIONS,
      useValue: options,
    };

    return {
      module: TwilioChannelModule,
      providers: [TwilioChannel, channelProvider],
      exports: [TwilioChannel, channelProvider],
    };
  }

  /**
   * Register async
   * @static
   * @param {TwilioChannelModuleAsyncOptions} options
   * @return DynamicModule
   */
  static registerAsync(
    options: TwilioChannelModuleAsyncOptions,
  ): DynamicModule {
    const channelProvider: ValueProvider = {
      provide: TWILIO_CHANNEL_OPTIONS,
      useValue: options,
    };

    return {
      module: TwilioChannelModule,
      imports: options.imports || [],
      providers: [
        TwilioChannel,
        channelProvider,
        ...this.createAsyncProviders(options),
      ],
      exports: [TwilioChannel, channelProvider],
    };
  }

  /**
   * Create async providers
   * @private
   * @param {TwilioChannelModuleAsyncOptions} options
   * @return Provider[]
   */
  private static createAsyncProviders(
    options: TwilioChannelModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncConfigProvider(options)];
    } else if (!options.useClass) {
      return [
        {
          provide: TWILIO_CHANNEL_OPTIONS,
          useValue: {},
          inject: options.inject || [],
        },
      ];
    }

    return [
      this.createAsyncConfigProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  /**
   * Create async config provider
   * @private
   * @param {TwilioChannelModuleAsyncOptions} options
   * @return Provider<any>
   */
  private static createAsyncConfigProvider(
    options: TwilioChannelModuleAsyncOptions,
  ): Provider<any> {
    if (options.useFactory) {
      return {
        provide: TWILIO_CHANNEL_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;

    if (!inject) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    return {
      provide: TWILIO_CHANNEL_OPTIONS,
      async useFactory(
        optionsFactory: TwilioChannelModuleOptionsFactory,
      ): Promise<TwilioChannelModuleOptions> {
        return optionsFactory.createTwilioChannelOptions();
      },
      inject: [inject],
    };
  }
}
