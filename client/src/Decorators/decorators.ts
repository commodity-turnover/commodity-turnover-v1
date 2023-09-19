/*
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
*/

class Boat {
  color: string = "red";

  @logError('Error from Pilot')
  pilot():void {
    throw new Error();
    console.log('swish');
    
  }
}

function logError(errorMessage: string) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const method = desc.value;

    desc.value = function() {
      try {
        method()
      } catch (error) {
          console.log(errorMessage);
      }
    }
  }
}

new Boat().pilot()