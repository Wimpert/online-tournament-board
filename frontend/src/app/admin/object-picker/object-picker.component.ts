import { Component, Input, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-object-picker',
  templateUrl: './object-picker.component.html',
  styleUrls: ['./object-picker.component.scss']
})
export class ObjectPickerComponent<T>  {


  private _options: T[];


  @Input()
  set options(options: T[]) {
    this._options =  options;
    if (this._pickedOptionId) {
      this.pickedOption = this._options.find((option: any) => option.id === this._pickedOptionId);
    }

  }

  pickedOption: T;
  private _pickedOptionId:  number;

  @Input()
  set pickedOptionId(id: number) {
    if (this._options) {
      this.pickedOption = this._options.find((option: any) => option.id === id);
    }
    this._pickedOptionId = id;
  }

  @Input()
  fieldName: string;

  @Output()
  optionPicked: EventEmitter<T> = new EventEmitter<T>();

  filteredOptions: T[] = [];

  constructor(private element: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onkeydown(event: KeyboardEvent) {
    if (event && event.key === 'Escape') {
      this.filteredOptions = [];
      const input = this.element.nativeElement.querySelector('.value-container');
      input.value = this.pickedOption && this.pickedOption[this.fieldName] ? this.pickedOption[this.fieldName] :  '';
      input.dispatchEvent(new Event('input'));
    }
  }

  inputValueChanged(event) {
    const value = (event && event.target && event.target.value) ? event.target.value : undefined;
    if (value) {
      this.filteredOptions = [...this._options.filter(option => option[this.fieldName] ? option[this.fieldName].toLowerCase().includes(value.toLowerCase()) : false)];
    }
  }

  optionPickedHandler(option: T) {
    this.filteredOptions = [];
    this.optionPicked.emit(option);
  }

}
