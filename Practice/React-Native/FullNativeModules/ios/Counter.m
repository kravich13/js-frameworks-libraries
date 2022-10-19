//
//  Counter.m
//  FullNativeModules
//
//  Created by Vladislav Onatskyi on 10/4/22.
//

#import <Foundation/Foundation.h>

  
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"


@interface RCT_EXTERN_MODULE(Counter, RCTEventEmitter)

RCT_EXTERN_METHOD(increment: (RCTResponseSenderBlock)callback)


@end
