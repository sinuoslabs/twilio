import { ModuleMetadata, Provider, Type } from '@nestjs/common';

/**
 * @interface TwilioChannelModuleOptionsFactory
 * @property createTwilioChannelOptions()
 */
export interface TwilioChannelModuleOptionsFactory {
  createTwilioChannelOptions():
    | Promise<TwilioChannelModuleOptions>
    | TwilioChannelModuleOptions;
}

/**
 * @interface TwilioChannelModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 * @property useExisting
 * @property useClass
 * @property useFactory
 * @property inject
 * @property extraProviders
 */
export interface TwilioChannelModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TwilioChannelModuleOptionsFactory>;
  useClass?: Type<TwilioChannelModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TwilioChannelModuleOptions> | TwilioChannelModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

/**
 * @interface TwilioChannelModuleOptions
 * @property {string} twilioAccountSid
 * @property {string} twilioAuthToken
 */
export interface TwilioChannelModuleOptions {
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  twilioSender?: string;
}
