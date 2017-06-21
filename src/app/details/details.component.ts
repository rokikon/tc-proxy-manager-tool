import { Component } from '@angular/core';
import { BodyPattern, Cookie, Mapping } from '../core/mapping.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  mapping;
  editing = true;
  tabIndex = 0;
  detailsForm: FormGroup;
  options = ['ANY', 'GET', 'POST', 'PUT', 'DELETE'];
  patternOptions = [
    {
      type: 'equalTo',
      text: 'Equal To'
    },
    {
      type: 'contains',
      text: 'Contains'
    },
    {
      type: 'matches',
      text: 'Matches'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group(new Mapping(fb));
    this.mapping = {
      request: {}
    };
  }
  get bodyPatterns(): FormArray {
    return this.detailsForm.get('request.bodyPatterns') as FormArray;
  }
  get cookies() {
    return this.detailsForm.get('request.cookies');
  }
  addBodyPattern(): void {
    this.bodyPatterns.push(this.fb.group(new BodyPattern()));
  }
  removePattern(index) {
    this.bodyPatterns.removeAt(index);
  }
  showMapping(event) {
    if (event.index === 4) {
      this.editing = false;
      this.mapping = this.cleanMapping(this.detailsForm.value);
      this.mapping.request.bodyPatterns = BodyPattern.mapToRequest(this.bodyPatterns.value);
      this.mapping.request.cookies = Cookie.mapToRequest(this.cookies.value);
    }
    if (!this.bodyPatterns.value.length) {
      delete this.mapping.request.bodyPatterns;
    }
    if (!this.cookies.value.name) {
      delete this.mapping.request.cookies;
    }
    delete this.mapping.fb;
    delete this.mapping.request.fb;
  }
  cleanMapping(mapping) {
    Object.keys(mapping).forEach(key => {
      if ((Array.isArray(mapping[key]) && !mapping[key].length) || mapping[key] === '' || !Object.keys(mapping[key]).length) {
        delete mapping[key];
      } else if (typeof mapping[key] === 'object') {
        this.cleanMapping(mapping[key]);
      }
    });
    return mapping;
  }
  startEditing() {
    this.editing = true;
    this.tabIndex = 0;
    this.mapping.request.bodyPatterns = BodyPattern.mapToView(this.bodyPatterns.value);
    this.mapping.request.cookies = Cookie.mapToView(this.cookies.value);
  }
}
