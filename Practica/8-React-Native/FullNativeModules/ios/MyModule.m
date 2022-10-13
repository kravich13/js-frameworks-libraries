//
//  MyModule.m
//  FullNativeModules
//
//  Created by Vladislav Onatskyi on 9/26/22.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MyModule, NSObject)

RCT_EXTERN_METHOD(asyncMultiply:
                 (int)a
                 b:(int)b
                  resolve: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(multiply:
                  (int)a
                  b:(int)b
                  callback:(RCTResponseSenderBlock)callback
                  )

RCT_EXTERN_METHOD(multiplyReturn:
                  (int)a
                  b:(int)b
                  )

+ (BOOL)multiplyReturn{
  return YES;
}

RCT_EXTERN_METHOD(sampleMethod:
                  (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )


@end
