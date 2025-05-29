class Stream {
  constructor(initial) {
    this.subscribers = [];

    if (typeof initial === 'object' && initial.json && initial.key) {
      this._json = initial.json;
      this._key = initial.key;
      this.value = initial.json[initial.key];
    } else {
      this.value = initial;
    }
  }

  subscribe(fn) {
    this.subscribers.push(fn);
    fn(this.value);
  }

  set(val) {
    this.value = val;

    // Automatically reflect to bound JSON object
    if (this._json && this._key) {
      this._json[this._key] = val;
    }

    this.subscribers.forEach(fn => fn(val));
  }

  get() {
    return this.value;
  }
}



/* const title = new Stream('Hello World');
title.subscribe(val => console.log(val)); // ✅ still works
title.set('Updated');


const json = { name: 'Jeff', email: 'jeff@example.com' };
const name = new Stream({ json, key: 'name' });

console.log(name.get()); // 'Jeff'
name.set('New Name');
console.log(json.name); // 'New Name'
 */