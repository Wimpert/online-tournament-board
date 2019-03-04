import { Component, Input, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-object-picker',
  templateUrl: './object-picker.component.html',
  styleUrls: ['./object-picker.component.scss']
})
export class ObjectPickerComponent<T>  {


  @Input()
  options: T[];

  pickedOption: T;

  @Input()
  set pickedOptionId(id: number) {
    if (this.options) {
      this.pickedOption = this.options.find((option) => option.id === id);
      console.log(this.options, id, this.pickedOption);
    }
  }

  @Input()
  fieldName: string;

  @Output()
  optionPicked: EventEmitter<T> = new EventEmitter<T>();

  filteredOptions: T[] = [];

  constructor(private element: ElementRef) {}

  @HostListener('keydown')
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
      this.filteredOptions = [...this.options.filter(option => option[this.fieldName] ? option[this.fieldName].includes(value) : false)];
    }
  }

  optionPickedHandler(option: T) {
    this.filteredOptions = [];
    this.optionPicked.emit(option);
  }

}
