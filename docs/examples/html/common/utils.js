export function addMixin (target, ...sources) {
  sources.forEach(source => {
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    Object.getOwnPropertySymbols(source).forEach(sym => {
      const descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

const aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor (...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, (new mixin()));
      });
    }
  }
  const copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
        }
      });
  };
  mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

export default {
  addMixin,
  aggregation
};
