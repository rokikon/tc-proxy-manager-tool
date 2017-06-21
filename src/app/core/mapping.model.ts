import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export class Mapping {
  public scenarioName: FormControl;
  public requiredScenarioState: FormControl;
  public newScenarioState: FormControl;
  public priority: FormControl;
  public request: FormGroup;
  public response: FormGroup;

  constructor(public fb: FormBuilder) {
    this.scenarioName = new FormControl('');
    this.requiredScenarioState = new FormControl('');
    this.newScenarioState = new FormControl('');
    this.priority = new FormControl(1);
    this.request = this.fb.group(new MappingRequest(fb));
    this.response = this.fb.group(new MappingResponse());
  }
}
export class MappingRequest {

  public urlPath: FormControl;
  public method: FormControl;
  public cookies: FormGroup;
  public bodyPatterns: FormArray;

  constructor(private fb: FormBuilder) {
    this.urlPath = this.fb.control('/proxy');
    this.method = this.fb.control('ANY');
    this.cookies = this.fb.group(new Cookie(), {validator: requiredIfDirty()});
    this.bodyPatterns = this.fb.array([this.fb.group(new BodyPattern())]);
    this.bodyPatterns.removeAt(0);
  }
}

export class MappingResponse {

  public status: FormControl;
  public body: FormControl;
  public fixedDelayMilliseconds: FormControl;
  public proxyBaseUrl: FormControl;
  public transformers: FormControl;

  constructor() {
    this.status = new FormControl('200');
    this.body = new FormControl('');
    this.fixedDelayMilliseconds = new FormControl(0);
    this.proxyBaseUrl = new FormControl('');
    this.transformers = new FormControl(['response-template']);
  }
}

export class Pattern {
  type: FormControl;
  value: FormControl;

  constructor () {
    this.type = new FormControl('');
    this.value = new FormControl('');
  }
}
export class BodyPattern extends Pattern {

  static mapToRequest(patterns) {
    return patterns.map(({type, value}) => ({[type]: value}));
  }
  static mapToView(patterns) {
    return patterns.map(pattern => {
      const type = Object.keys(pattern)[0];
      const value = pattern[type];
      return {type, value};
    });
  }
  constructor() {
    super();
    this.type = new FormControl('contains');
  }
}
export class Cookie extends Pattern {
  name: FormControl;

  static mapToView(cookie) {
    const name = Object.keys(cookie)[0];
    if (!name) {
      return {type: '', value: '', name: ''};
    }
    const type = Object.keys(cookie[name])[0];
    const value = cookie[name][type];
    return {name, type, value};
  }
  static mapToRequest({name, type, value}) {
    return name || type || value ? {[name]: {[type]: value}} : '';
  }
  constructor () {
    super();
    this.name = new FormControl('');
  }
}
export function requiredIfDirty(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (control.dirty) {
      if (!control.value.name || !control.value.value || !control.value.type) {
        return {'required': 'true'};
      }
      return;
    }
  };
}
